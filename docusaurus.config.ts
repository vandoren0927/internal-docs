import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/** Docusaurus 站點設定（routeBasePath 改為 "kb"） */
const config: Config = {
  // ————————————————— 基本資訊 —————————————————
  title: 'Internal Docs',
  tagline: 'Company Knowledge Base',
  favicon: 'img/favicon.ico',

  // GitHub Pages 網址
  url: 'https://vandoren0927.github.io',
  baseUrl: '/internal-docs/',                 // 使用者站（根路徑）

  trailingSlash: true,
  deploymentBranch: 'gh-pages',
  organizationName: 'vandoren0927',
  projectName: 'internal-docs',

  // ————————————————— Links 與錯誤處理 —————————————————
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // ————————————————— i18n —————————————————
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ————————————————— 預設模板 —————————————————
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'kb',          // ★ 替換原本的 /docs 前綴
          editUrl: 'https://github.com/vandoren0927/internal-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vandoren0927/internal-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // ————————————————— Theme 設定 —————————————————
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Internal Docs',
      logo: { alt: 'Site Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/vandoren0927/internal-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Tutorial', to: '/kb/' }],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
            { label: 'X', href: 'https://x.com/docusaurus' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/vandoren0927/internal-docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Internal Docs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
