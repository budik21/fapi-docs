// scripts/generateDocs.js
import fs from "fs";
import path from "path";
// Import change to resolve CommonJS/ESM conflict in Node.js
import pkg from "graphql";
// Allows to deep inspect of the object
import util from "util";
import { globSync } from 'glob';

// Destructure necessary functions from the imported package.
const {
    buildSchema,
    isEnumType,
    isInputObjectType,
    isObjectType,
    isScalarType,
    isInterfaceType,
    isNonNullType, // POUŽIJEME INTERNÍ PREDICATION CHECKER!
    getNamedType: getNamedTypeGraphQL
} = pkg;

// Define a safe getDescription wrapper if it's not present (common structure in GraphQL tools)
const getDescription = pkg.getDescription || ((type) => type.description);

import { fileURLToPath } from "url";

// ==== Safe path relative to the script ====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. Schema Loading and Preparation ---
// Schema
const schemaFilePath = path.resolve(__dirname, "../schema/schema.graphql");

// Read the actual 'schema.graphql' file content
const schemaSDL = fs.readFileSync(schemaFilePath, "utf8");
const schema = buildSchema(schemaSDL);

// Output directories
const baseOutputDir = path.resolve(__dirname, "../docs/api-reference");
const folders = {
    Enum: "enums",
    Input: "inputs",
    Object: "objects",
    Interface: "interfaces",
    Scalar: "scalars",
};
// Mapping of folder names to type suffix for the title
const typeSuffixMap = {
    [folders.Enum]: 'Enum',
    [folders.Input]: 'Input',
    [folders.Object]: 'Object',
    [folders.Interface]: 'Interface',
    [folders.Scalar]: 'Scalar',
};


// --- !! ATTENTION: Clean Slate Protocol !! ---
// Delete the entire output directory before starting to ensure
// no stale files from previous runs cause conflicts.
//
// console.log(`🧹 Cleaning output directory: ${baseOutputDir}`);
// fs.rmSync(baseOutputDir, { recursive: true, force: true });
// console.log("... Directory cleaned.");

// --- 1. CUSTOM CLEAN: recursively delete all files except protected ones ---
console.log(`🧹 Cleaning output directory (except protected files): ${baseOutputDir}`);

// Files to protect (regex)
const protectedPatterns = [
    /^_category_\.json$/,
    /^api-reference-intro\.md$/,
];

// Check if filename matches any protected pattern
function isProtectedFile(fileName) {
    return protectedPatterns.some((regex) => regex.test(fileName));
}

// Recursive cleaner
function cleanDirectory(directory) {
    const items = fs.readdirSync(directory);

    items.forEach(item => {
        const fullPath = path.join(directory, item);
        const stats = fs.statSync(fullPath);

        // Skip protected files
        if (stats.isFile() && isProtectedFile(item)) {
            console.log(`⏭️ Keeping protected file: ${fullPath}`);
            return;
        }

        if (stats.isDirectory()) {
            // Clean recursively first
            cleanDirectory(fullPath);

            // After cleaning, check if directory is empty
            const remaining = fs.readdirSync(fullPath);
            if (remaining.length === 0) {
                fs.rmdirSync(fullPath);
                console.log(`🗑️ Deleted empty folder: ${fullPath}`);
            } else {
                console.log(`⏭️ Keeping folder (contains protected files): ${fullPath}`);
            }
        } else {
            // Normal file → delete
            fs.unlinkSync(fullPath);
            console.log(`🗑️ Deleted file: ${fullPath}`);
        }
    });
}

// Ensure directory exists
if (!fs.existsSync(baseOutputDir)) {
    fs.mkdirSync(baseOutputDir, { recursive: true });
}

cleanDirectory(baseOutputDir);

console.log("... Cleaning done.");

// --- END CUSTOM CLEAN ---

// --- End of Clean Slate ---


// Create folders if they don't exist
Object.values(folders).forEach((folder) => {
    const dir = path.join(baseOutputDir, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// List of internal/base GraphQL types we usually skip documenting
const internalGraphQLTypes = new Set(['String', 'Int', 'Float', 'Boolean', 'ID', 'Query', 'Mutation', 'schema', 'goExtraField', 'goField']);


// Function to create a Markdown file
function writeMarkdown(idPage, typeName, folder, content) {
    const fileName = (idPage) ? idPage : typeName;
    const filePath = path.join(baseOutputDir, folder, `${fileName}.md`);
    fs.writeFileSync(filePath, content, "utf8");
}

// Function to generate frontmatter (YAML block for documentation systems like Docusaurus)
function generateFrontmatter(idPage, typeName, folder, sidebarPrefix = '') {
    const suffix = typeSuffixMap[folder] || '';

    // Create the full title without space (e.g., 'CardEventObject')
    const fullTitle = `${typeName}${suffix}`;

    // Try to split CamelCase and capitalize for a readable sidebar label
    let baseLabel = typeName
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Apply prefix: "Match Event: > Card Event"
    const finalSidebarLabel = sidebarPrefix ? `${sidebarPrefix} ${baseLabel}` : baseLabel;


    return `---
id: ${idPage}
title: ${fullTitle}
sidebar_label: "${finalSidebarLabel}"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

`;
}

// Function to clean and format the description
function formatDescription(description) {
    if (!description) return "";
    // Remove triple quotes and trim whitespace, replace line breaks with spaces
    return description.replace(/^"""\s*|\s*"""$/g, '').trim().replace(/\n\s*/g, ' ');
}

// --- 2. Helper functions for type linking ---

/**
 * Determines the target folder for the generated types (Enum, Input, Object, Interface, Scalar).
 */
function getTargetFolder(typeName) {
    if (internalGraphQLTypes.has(typeName) || typeName.startsWith("__")) {
        return null;
    }

    const type = schema.getType(typeName);

    if (isEnumType(type)) return folders.Enum;
    if (isInputObjectType(type)) return folders.Input;
    if (isObjectType(type)) return folders.Object;
    if (isInterfaceType(type)) return folders.Interface;
    if (isScalarType(type) && !internalGraphQLTypes.has(typeName)) return folders.Scalar;

    return null;
}

/**
 * Generates a Markdown link for a type if it is documented.
 */
function getLinkForType(typeName, rawTypeString) {
    const targetFolder = getTargetFolder(typeName);

    if (targetFolder) {
        // Create relative path to the document: ../[folder]/[Type].md
        // NOTE: This does not account for special filename overrides (like for MatchEvent).
        // This is handled in a post-processing step.
        const path = `../${targetFolder}/${typeName}`;
        return `[${rawTypeString}](${path})`;
    }

    // Not a built-in type or not documented, return code formatting only
    return `\`${rawTypeString}\``;
}


// --- 3. Function for generating JSON export component call ---
/**
 * Generates the React component call for JSON data export.
 */
function generateJsonExportCode(typeName, data) {
    const jsonData = JSON.stringify(data);
    return `\n<JsonExportButton data={${jsonData}} fileName="${typeName}" />\n`;
}


// --- 4. Markdown Generation Logic ---
// Function to generate Markdown based on type
function generateMarkdownForType(type) {
    let typeName        = type.name;
    let idPage          = type.name; //Could be different from typeName in special cases
    let folder          = null;
    let content         = "";
    let dataForExport   = [];

    let sidebarPrefix = ''; // Prefix for special sidebar categorization
    let finalSidebarLabel = ''; // Calculated label for logging

    if (isEnumType(type)) {
        folder = folders.Enum;
        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info[no-header]\n${description}\n:::\n\n`;
            content += '---\n\n';
        }

        content += "## Enum Values\n\n";
        content += "| Value | Description |\n";
        content += "|---|---|\n"; // OPRAVENO: Dva sloupce

        type.getValues().forEach((v) => {
            let rawDescription = v.description || '';
            let cleanedDescription = rawDescription.split(/CZ Name:/i)[0];
            const valueDescription = formatDescription(cleanedDescription);

            content += `| \`${v.name}\` | ${valueDescription} |\n`;
            dataForExport.push({ value: v.name, description: valueDescription });
        });

        // Export ONLY for ENUM types
        content += generateJsonExportCode(typeName, dataForExport);

    } else if (isInterfaceType(type)) {
        folder = folders.Interface;
        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info[no-header]\n${description}\n:::\n\n`;
            content += '---\n\n';
        }

        content += "## Fields\n\n";
        content += "| Field | Type | Description |\n";
        content += "|---|---|---|\n";

        const fields = type.getFields();
        Object.keys(fields).forEach((f) => {
            const field = fields[f];
            const fieldDescription = formatDescription(field.description || '');
            const fieldType = field.type;

            const namedType = getNamedTypeGraphQL(fieldType).name;
            const linkedType = getLinkForType(namedType, fieldType);

            content += `| \`${f}\` | ${linkedType} | ${fieldDescription} |\n`;
        });

    } else if (isInputObjectType(type)) {
        folder = folders.Input;
        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info[no-header]\n${description}\n:::\n\n`;
            content += '---\n\n';
        }

        content += "## Fields\n\n";
        content += "| Field | Type | Description |\n";
        content += "|---|---|---|\n";

        const fields = type.getFields();
        Object.keys(fields).forEach((f) => {
            const field = fields[f];
            const fieldDescription = formatDescription(field.description || '');
            const fieldType = field.type;

            const namedType = getNamedTypeGraphQL(fieldType).name;
            const linkedType = getLinkForType(namedType, fieldType);

            content += `| \`${f}\` | ${linkedType} | ${fieldDescription} |\n`;
        });

        //PROCESS OBJECTS ENTITIES
    } else if (isObjectType(type)) {
        folder = folders.Object;
        const fields = type.getFields();

        // SPECIAL FOR MATCH EVENT OBJECTS: All MatchEvents objects will have the same prefix in sidebar, to stay together
        if (typeName.includes('Event') && fields.type) {

            // This logic MUST be robust. Check if type.type.ofType exists.
            if (fields.type.type && fields.type.type.ofType) {
                const fieldTypeObject = fields.type.type.ofType.name;
                if (fieldTypeObject === 'MatchEventType') {
                    sidebarPrefix = 'Match Event >';
                    //Change the ID of the page to be proper ordered in sidebar AND FILE NAME
                    idPage = 'MatchEvent' + typeName;
                }
            }

        }

        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info[no-header]\n${description}\n:::\n\n`;
            content += '---\n\n';
        }

        content += "## Fields\n\n";
        content += "| Field | Type | Description |\n";
        content += "|---|---|---|\n";

        const fieldsKeys = Object.keys(fields);
        fieldsKeys.forEach((f) => {
            const field = fields[f];
            const fieldDescription = formatDescription(field.description || '');
            const fieldType = field.type;

            const namedType = getNamedTypeGraphQL(fieldType).name;
            const linkedType = getLinkForType(namedType, fieldType);

            content += `| \`${f}\` | ${linkedType} | ${fieldDescription} |\n`;
        });

    } else if (isScalarType(type)) {
        folder = folders.Scalar;
        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info[no-header]\n${description}\n:::\n\n`;
        }
    }

    if (folder && content) {
        // Calculate the final label for logging
        let baseLabel = typeName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // Apply prefix for logging
        finalSidebarLabel = sidebarPrefix ? `${sidebarPrefix} ${baseLabel}` : baseLabel;

        writeMarkdown(idPage,typeName, folder, content); // Voláme s idPage jako název souboru

        // Logging with the final label (zahrnuje uvozovky pro přesnost výstupu)
        console.log(`✅ ${typeName} -> ${folder} (File: "${idPage}.md", Sidebar: "${finalSidebarLabel}")`);
    }
}

// Main function
function main() {
    const typeMap = schema.getTypeMap();

    for (const typeName in typeMap) {
        const type = typeMap[typeName];

        // Ignore internal GraphQL types (`__*`) and standard GraphQL base types
        const internalGraphQLTypesBase = new Set(['String', 'Int', 'Float', 'Boolean', 'ID', 'Query', 'Mutation', 'schema', 'goExtraField', 'goField']);

        if (!typeName.startsWith("__") && !internalGraphQLTypesBase.has(typeName)) {
            generateMarkdownForType(type);
        }
    }

    console.log("✅ All Markdown files generated!");
}


// --- 5. Post-Processing Step ---

/**
 * Post-processes the generated Markdown files to fix links
 * pointing to 'MatchEvent' types, which have special filenames.
 */
function postProcessMatchEventLinks() {
    console.log("\n🔥 Post-processing MatchEvent links...");

    // First, determine which types were given a special filename.
    // We must re-run the same logic used during generation.
    const specialMatchEventTypes = new Set();

    // We also need to map the original typeName to its special filename
    // e.g., 'CardEvent' -> 'matchevent-CardEvent'
    const specialTypeNameToFilename = new Map();

    const typeMap = schema.getTypeMap();

    for (const typeName in typeMap) {
        const type = typeMap[typeName];

        if (isObjectType(type) && !typeName.startsWith("__") && !internalGraphQLTypes.has(typeName)) {
            const fields = type.getFields();

            // This logic MUST match the logic in generateMarkdownForType
            if (typeName.includes('Event') && fields.type) {
                if (fields.type.type && fields.type.type.ofType) {
                    const fieldTypeObject = fields.type.type.ofType.name;
                    if (fieldTypeObject === 'MatchEventType') {
                        specialMatchEventTypes.add(typeName);
                        // Store the mapping
                        specialTypeNameToFilename.set(typeName, 'MatchEvent' + typeName);
                    }
                }
            }
        }
    }

    if (specialMatchEventTypes.size === 0) {
        console.log("... No special MatchEvent types found. Skipping link processing.");
        return;
    }

    console.log(`... Found ${specialMatchEventTypes.size} special types to process:`, Array.from(specialMatchEventTypes));

    // Now, iterate through all generated files and fix links.
    const linkRegex = /\[([^\]]+)\]\(\.\.\/objects\/([^)]+)\)/g;
    let filesChanged = 0;
    let linksFixed = 0;
    let filesProcessed = 0;

    Object.values(folders).forEach((folder) => {
        const dir = path.join(baseOutputDir, folder);
        try {
            const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

            files.forEach(file => {
                filesProcessed++;
                const filePath = path.join(dir, file);

                // Read the file *content*
                let content;
                try {
                    content = fs.readFileSync(filePath, 'utf8');
                } catch (readErr) {
                    console.error(`  ❌ ERROR reading file ${filePath}: ${readErr.message}`);
                    return; // Skip this file
                }

                let changed = false;
                let logDetails = [];

                const newContent = content.replace(linkRegex, (match, linkText, typeName) => {
                    // typeName is the captured path component, e.g., "FoulEvent"

                    // Check if this typeName is one of our special types
                    if (specialMatchEventTypes.has(typeName)) {

                        // Get the correct filename (e.g., 'matchevent-FoulEvent')
                        const correctFilename = specialTypeNameToFilename.get(typeName);
                        const newLink = `[${linkText}](../objects/${correctFilename})`;

                        // Zkontrolujeme, zda se link skutečně liší
                        if (match !== newLink) {
                            changed = true;
                            linksFixed++;
                            logDetails.push(`    ✅ Fixing link: "${match}"  ==>  "${newLink}"`);
                        } else {
                            logDetails.push(`    ☑️ Link already correct: "${match}"`);
                        }

                        return newLink; // Vrací (potenciálně) nový link
                    }
                    // Otherwise, leave the match as is
                    return match;
                });

                if (changed) {
                    // Logujeme pouze soubory, kde se reálně něco změnilo
                    console.log(`  🔄 Processing file: ${file}`);
                    logDetails.filter(log => log.includes('✅')).forEach(log => console.log(log));

                    try {
                        // Write the *newContent* back to the *filePath*
                        fs.writeFileSync(filePath, newContent, 'utf8');
                        console.log(`  💾 File saved: ${filePath}`);
                        filesChanged++;
                    } catch (writeErr) {
                        console.error(`  ❌ ERROR writing file ${filePath}: ${writeErr.message}`);
                    }
                }
            });
        } catch (err) {
            console.error(`Could not process folder ${dir}: ${err.message}`);
        }
    });

    // Závěrečný souhrn
    console.log(`\n... Checked ${filesProcessed} markdown files in total.`);
    if (linksFixed > 0) {
        console.log(`🔥 Fixed ${linksFixed} links in ${filesChanged} files.`);
    } else {
        console.log("... No links needed fixing.");
    }

    console.log("✅ Post-processing complete!");
}

/**
 * Replaces '<' and '>' ONLY when they are not part of an HTML/React tag.
 */
function postProcessDangerousCharacters() {
    console.log(`  🔄 Replacing dangerous characters in api-reference folder...`);

    const files = globSync('./../docs/api-reference/**/*.md');
    let processedCount = 0;

    files.forEach(file => {
        try {
            //Skip the files starting with "MatchEvent" as they were already processed
            if (path.basename(file).startsWith('MatchEvent')) {
                console.log(`      |--- 🚫 Skipping protected file: ${file}`);
                return;
            }


            const originalContent = fs.readFileSync(file, 'utf8');

            // 1. Replace '<' ONLY if NOT followed by a letter (a-z, A-Z),
            //    a forward slash '/', or an exclamation mark '!'
            //    This protects <Tabs>, </TabItem>, and
            let content = originalContent.replace(/<(?![a-zA-Z/!])/g, '&lt;');

            // 2. Replace '>' ONLY if it is preceded by a space or a digit
            //    This is safer than replacing all '>' which would break tags.
            content = content.replace(/(?<=\d|\s)>(?!\s*?\d)/g, '&gt;');

            if (content !== originalContent) {
                fs.writeFileSync(file, content);
                console.log(`      |--- 🔥 Fixed: ${file}`);
                processedCount++;
            }
            else {
                console.log(`      |--- ⏭️ No changes needed: ${file}`);
            }
        } catch (err) {
            console.error(`      |--- ❌ Error processing ${file}:`, err.message);
        }
    });

    console.log(`✅ Dangerous characters replaced in api-reference folder. Modified ${processedCount} files.`);
}


// --- RUN SCRIPT ---

// Run the main generation
main();

// Run the post-processing steps
postProcessMatchEventLinks();
postProcessDangerousCharacters();