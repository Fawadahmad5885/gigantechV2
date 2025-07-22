// news/[slug]/page.js
import { fetchStrapi } from "@/lib/api";
import NewsDetailClient from "@/app/components/news-components/NewsDetailClient";

export async function generateStaticParams() {
    const res = await fetchStrapi("news-items?fields=slug");
  return (res || []).map((item) => ({
    slug: item.slug,
  }));
}

async function getNewsData(slug) {
  const res = await fetchStrapi(
    `news-items?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*`
  );
  if (!res || !res.length) return null;
  return res[0];
}

export default async function NewsDetail({ params }) {
  const { slug } =await params;
  const newsArticle = await getNewsData(slug);

  if (!newsArticle) {
    return <div className="mt-12">News article not found</div>;
  }

    const NewsAndBlogs = await fetchStrapi(
    "news-blogs-pages?populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
     "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&"
  );

   const newsBlogsData = NewsAndBlogs?.[0] || {};
  const contactFormData = newsBlogsData.contact_section;
  const contactForm = contactFormData.contactForm;

  return (
    <NewsDetailClient
      newsArticle={newsArticle}
      contactSectionHeader={contactFormData}
      contactForm={contactForm}
    />
  );
}
