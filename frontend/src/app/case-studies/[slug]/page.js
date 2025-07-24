// app/pages/case-studies/[slug].jsx
import { fetchStrapi, getStrapiMedia } from "@/lib/api";
import CaseStudyMain from "@/app/components/case-studies-components/CaseStudyMain";

// Generate static paths for both local and Strapi data
export async function generateStaticParams() {
  if (process.env.USE_LOCAL) {
    try {
      const localData = await fetchStrapi("case-study-cards");
      return (localData || []).map((item) => ({
        slug: item.slug,
      }));
    } catch (error) {
      console.error("Failed to generate static paths from local data:", error);
      return [];
    }
  }

  try {
    const res = await fetchStrapi("case-study-cards?fields=slug&populate=image");
    return (res || []).map((item) => ({
      slug: item.attributes?.slug || item.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static paths from Strapi:", error);
    return [];
  }
}

// Unified data fetcher that works with both sources
async function getCaseStudyData(slug) {
  let res;
  
  if (process.env.USE_LOCAL) {
    res = await fetchStrapi("case-study-cards");
    if (!res) return null;
    
    // Find matching item in local data
    const caseStudy = res.find(item => item.slug === slug);
    if (!caseStudy) return null;
    
    // Transform local data to match Strapi structure
    return {
      id: caseStudy.id,
      attributes: {
        ...caseStudy,
        image: {
          data: {
            attributes: caseStudy.image
          }
        }
      }
    };
  }

  // Strapi data fetching
  res = await fetchStrapi(
    `case-study-cards?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[image][fields]=url,formats&populate[caseStudyCarousel][populate]=*`
  );
  
  if (!res || !res.length) return null;
  return res[0];
}

// Unified contact data fetcher
async function getContactData() {
  const endpoint = 
    "case-studies-pages?populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
    "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
    "&populate[contact_section][populate][footerSteps][fields]=*";

  const data = await fetchStrapi(endpoint);
  
  if (process.env.USE_LOCAL && Array.isArray(data)) {
    // Transform local contact data to match Strapi structure
    return {
      contact_section: data[0]?.contact_section || {},
      ...data[0]
    };
  }
  
  return data?.[0]?.attributes || {};
}

export default async function CaseStudyDetail({ params }) {
  const { slug } = params;
  const [caseStudy, contactData] = await Promise.all([
    getCaseStudyData(slug),
    getContactData()
  ]);

  if (!caseStudy) {
    return <div className="mt-12">Case study not found</div>;
  }

  // Normalize the data structure for the component
  const normalizedCaseStudy = {
    ...caseStudy.attributes,
    id: caseStudy.id
  };

  return (
    <CaseStudyMain 
      caseStudy={normalizedCaseStudy}
      contactSectionHeader={contactData.contact_section}
      contactForm={contactData.contact_section?.contactForm}
    />
  );
}