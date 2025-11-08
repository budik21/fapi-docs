// scripts/generateDocs.js
import fs from "fs";
import path from "path";
// Import change to resolve CommonJS/ESM conflict in Node.js
import pkg from "graphql";
// Allows to deep inspect of the object
import util from "util";

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
    Enum:       "enums",
    Input:      "inputs",
    Object:     "objects",
    Interface:  "interfaces",
    Scalar:     "scalars",
};
// Mapping of folder names to type suffix for the title
const typeSuffixMap = {
    [folders.Enum]:         'Enum',
    [folders.Input]:        'Input',
    [folders.Object]:       'Object',
    [folders.Interface]:    'Interface',
    [folders.Scalar]:       'Scalar',
};

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
            content += `:::info\n${description}\n:::\n\n`;
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
            content += `:::info\n${description}\n:::\n\n`;
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
            content += `:::info\n${description}\n:::\n\n`;
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
            const fieldTypeObject = fields.type.type.ofType.name;
            if (fieldTypeObject === 'MatchEventType') {
                sidebarPrefix = 'Match Event >';
                //Change the ID of the page to be proper ordered in sidebar AND FILE NAME
                idPage = 'MatchEvent' + typeName;
            }

        }

        content += generateFrontmatter(idPage, typeName, folder, sidebarPrefix);

        const description = formatDescription(getDescription(type));
        if (description) {
            content += `:::info\n${description}\n:::\n\n`;
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
            content += `:::info\n${description}\n:::\n\n`;
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
        console.log(`✅ ${typeName} -> ${folder} (Sidebar Label: "${finalSidebarLabel}")`);
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

main();