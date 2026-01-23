import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title:    'Livesport Football API',
    tagline:  'The most granular football data, easier to access than ever before',
    favicon:  'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    //Remove the trailing slash from all URLs, so the URL looks like /path/file instead of /path/file/
    trailingSlash: true,

    // Set the production url of your site here
    url: 'https://opta.lsoffice.cz',

    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    // !!! Keep in the mind the slash after the last folder !!!
    baseUrl: '/football-api-docs/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    //organizationName: 'facebook', // Usually your GitHub org/user name.
    //projectName: 'docusaurus', // Usually your repo name.

    //Generates an error during the build if some broken link is found
    onBrokenLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    //where the local documentation is taken from
                    path: 'docs',
                    //where the sidebar config is taken from
                    sidebarPath: './sidebars.ts',
                    // Undefined disallows to modify a documentation page.
                    editUrl: undefined,
                    // To avoid "docs/docs" duplication - do not add "docs" folder to baseURL
                    routeBasePath: '/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Football API',
            logo: {
                alt: 'Football API Logo',
                src: 'img/football-api.png',
            },
            items: [
                {
                    to:         '/api-essentials',
                    label:      'API Essentials',
                    position:   'left',
                },
                {
                    type:       'docSidebar',
                    sidebarId:  'apiGuideSidebar',
                    position:   'left',
                    label:      'API Guide',
                },
                {
                    type:       'docSidebar',
                    sidebarId:  'apiReferenceSidebar',
                    position:   'left',
                    label:      'API Reference',
                },
                /*{
                    type:       'docSidebar',
                    sidebarId:  'objectSidebar',
                    position:   'left',
                    label:      'Objects',
                },
                {
                    type:       'docSidebar',
                    sidebarId:  'enumsSidebar',
                    position:   'left',
                    label:      'Enums',
                },
                {
                    type:       'docSidebar',
                    sidebarId:  'inputsSidebar',
                    position:   'left',
                    label:      'Inputs',
                },*/
                {
                    to:         '/contacts/contacts',
                    label:      'Contacts',
                    position:   'left',
                },
                //Add the search bar to the right (before dark/light mode switcher which is hardcoded as last one)
                {
                    type: 'search',
                    position: 'right',
                }
            ]
        },

        footer: {
            style: 'dark',
            /* links: [
                 {
                 title: 'Docs',
                 items: [
                     {
                         label: 'Tutorial',
                         to: 'intro',
                     },
                 ],
                 },
                 {
                     title: 'Community',
                     items: [
                         {
                           label: 'Stack Overflow',
                           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                         },
                         {
                           label: 'Discord',
                           href: 'https://discordapp.com/invite/docusaurus',
                         },
                         {
                           label: 'X',
                           href: 'https://x.com/docusaurus',
                         },
                     ],
                 }
             ],*/
            copyright: `Copyright © ${new Date().getFullYear()} Livesport`,
        },

        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['php'],
        },

    } satisfies Preset.ThemeConfig,

    plugins: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                //true, if the doc is not ruinning from file system, but from web server
                hashed: true,
                //Which language is the index build in?
                language: ["en"],
                // May the phrase found be highleded?
                highlightSearchTermsOnTargetPage: true,
                // May the blog be indexed (no blog at this time, so showtched off)
                indexBlog: false,
                // May the documentation be indexed
                indexDocs: true,
                //Key setting for Football API setup
                docsRouteBasePath: '/',
            },
        ],
    ],
};

export default config;

