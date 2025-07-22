import { getBaseUrl } from "@/utils/baseUrl";


export default function sitemap() {
  const baseUrl = getBaseUrl();
  return [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url:           `${baseUrl}/about-us`,
      lastModified:  new Date(),
      changeFrequency: "monthly",
      priority:      0.8,
    },
  ]
}