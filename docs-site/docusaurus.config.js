// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ControlaCRM",
  tagline: "Gestión inteligente de contactos comerciales para empresas",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://controla-crm-docs.onrender.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "anggelserrato", // Usually your GitHub org/user name.
  projectName: "controla-crm", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          sidebarCollapsed: false,
          editUrl:
            "https://github.com/anggelserrato/controla-crm/tree/main/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "ControlaCRM",
        logo: {
          alt: "ControlaCRM Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentación",
          },
          {
            href: "https://github.com/anggelserrato/controla-crm",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentación",
            items: [
              {
                label: "Requisitos del Sistema",
                to: "/docs/requisitos-sistema",
              },
              {
                label: "API REST",
                to: "/docs/api-rest",
              },
              {
                label: "Guía de Despliegue",
                to: "/docs/guia-despliegue",
              },
            ],
          },
          {
            title: "Proyecto",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/anggelserrato/controla-crm",
              },
              {
                label: "Reportar un Problema",
                href: "https://github.com/anggelserrato/controla-crm/issues",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "Aplicación",
                href: "https://crm.serrato.me",
              },
              {
                label: "API",
                href: "https://controla-crm.onrender.com/api/v1/docs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ControlaCRM. Proyecto de grado SENA Tecnólogo en Análisis y Desarrollo de Software.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
