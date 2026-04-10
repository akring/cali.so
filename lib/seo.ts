export const seo = {
  title: 'Akring | 独立开发者、创作者、打磨控、长期主义者',
  description:
    '我是 Akring，独立开发者与科技内容创作者，专注 macOS / iOS 工具类应用。日常在开发、设计和内容创作之间切换，持续尝试把想法变成可用的产品。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://akring.com'
      : 'http://localhost:3000'
  ),
} as const
