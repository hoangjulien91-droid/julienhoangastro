import type { MetadataRoute } from 'next'

/**
 * S-TIER: Robots.txt
 *
 * Full crawling enabled with sitemap reference.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://julienhoang.com/sitemap.xml',
    host: 'https://julienhoang.com',
  }
}
