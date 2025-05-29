import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Docusaurus 配置檔
 */
const config: Config = {
  // ————————————————— 基本資訊 —————————————————
  title: 'Internal Docs',
  tagline: 'Company Knowledge Base',
  favicon: 'img/favicon.ico',

  // GitHub Pages 部署網址
  url: 'https://vandoren0927.github.io',
  baseUrl: '/internal-docs/',

  // 部署分支與路徑規則
  trailingSlash: true,
  deploymentBranch: 'gh-pages',
  organizationName: 'vandoren0927',
  projectName: 'internal-docs',

  // 錯誤處理
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 多語系設定
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // ————————————————— Presets 設定 —————————————————
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'kb',
          editUrl: 'https://github.com/vandoren0927/internal-docs/tree/main/docs/',
        } satisfies Preset.Options['docs'],
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vandoren0927/internal-docs/tree/main/blog/',
        } satisfies Preset.Options['blog'],
        theme: {
          customCss: './src/css/custom.css',
        } satisfies Preset.Options['theme'],
      },
    ],
  ],

  // ————————————————— Theme 設定 —————————————————
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Internal Docs',
      logo: { alt: 'Site Logo', src: 'img/logo.svg' },
      items: [
        { type: 'doc', docId: 'index', position: 'left', label: 'Docs' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/vandoren0927/internal-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: '首頁', to: '/kb/' }],
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
      copyright: `Copyright © ${new Date().getFullYear()} Internal Docs.`, 
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
