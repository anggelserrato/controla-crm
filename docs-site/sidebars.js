// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Introducción",
      items: ["project-charter", "estudio-factibilidad"],
    },
    {
      type: "category",
      label: "Especificaciones",
      items: [
        "requisitos-sistema",
        "user-stories",
        "sad-arquitectura-sistema",
        "database-design",
      ],
    },
    {
      type: "category",
      label: "Desarrollo",
      items: ["api-rest", "code-standards"],
    },
    {
      type: "category",
      label: "Testing & Deployment",
      items: ["plan-de-pruebas", "casos-prueba", "guia-despliegue"],
    },
    {
      type: "category",
      label: "Recursos",
      items: ["user-manual"],
    },
  ],
};

export default sidebars;
