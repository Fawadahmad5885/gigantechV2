// app/news/[slug]/page.js
import { fetchStrapi } from "../../../lib/api";
import NewsDetailClient from "@/app/components/news-components/NewsDetailClient";

// Generate static paths for both local and Strapi data
export async function generateStaticParams() {
  if (process.env.USE_LOCAL) {
    try {
      const localData = await fetchStrapi("news-items");
      return (localData || []).map((item) => ({
        slug: item.slug,
      }));
    } catch (error) {
      console.error("Failed to generate static paths from local data:", error);
      return [];
    }
  }

  try {
    const res = await fetchStrapi("news-items?fields=slug");
    return (res || []).map((item) => ({
      slug: item.attributes?.slug || item.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static paths from Strapi:", error);
    return [];
  }
}

// Unified news data fetcher
async function getNewsData(slug) {
  let res;

  if (process.env.USE_LOCAL) {
    res = await fetchStrapi("news-items");
    if (!res) return null;

    // Find matching item in local data
    const newsItem = res.find((item) => item.slug === slug);
    if (!newsItem) return null;

    // Transform local data to match Strapi structure
    return {
      id: newsItem.id,
      attributes: {
        ...newsItem,
        image: newsItem.image
          ? {
              data: {
                attributes: newsItem.image,
              },
            }
          : null,
      },
    };
  }

  // Strapi data fetching
  res = await fetchStrapi(
    `news-items?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );

  if (!res || !res.length) return null;
  return res[0];
}

// Unified contact data fetcher for news
async function getNewsContactData() {
  const endpoint =
    "news-blogs-pages?populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
    "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
    "&populate[contact_section][populate][footerSteps][fields]=*";

  const data = await fetchStrapi(endpoint);

  if (process.env.USE_LOCAL && Array.isArray(data)) {
    // Transform local contact data to match Strapi structure
    return {
      contact_section: data[0]?.contact_section || {},
      ...data[0],
    };
  }

  return data?.[0]?.attributes || {};
}

export default async function NewsDetail({ params }) {
  const { slug } = await params;
  const [newsArticle, contactData] = await Promise.all([
    getNewsData(slug),
    getNewsContactData(),
  ]);

  if (!newsArticle) {
    return <div className="mt-12">News article not found</div>;
  }

  // Normalize the data structure for the component
  const normalizedNewsArticle = {
    ...newsArticle.attributes,
    id: newsArticle.id,
  };

  return (
    <NewsDetailClient
      newsArticle={normalizedNewsArticle}
      contactSectionHeader={contactData.contact_section}
      contactForm={contactData.contact_section?.contactForm}
    />
  );
}
