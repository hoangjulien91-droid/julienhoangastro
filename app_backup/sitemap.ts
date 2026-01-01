import type { MetadataRoute } from 'next'

/**
 * S-TIER: Dynamic Sitemap
 *
 * Priority 1.0 on home page for Knowledge Graph.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://julienhoang.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]
}
