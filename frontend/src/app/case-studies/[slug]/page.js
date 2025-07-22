// app/pages/case-studies/[slug].jsx
import { fetchStrapi, getStrapiMedia } from "@/lib/api";
import CaseStudyMain from "@/app/components/case-studies-components/CaseStudyMain";

export async function generateStaticParams() {
  const res = await fetchStrapi("case-study-cards?fields=slug&populate=image");
  return (res || []).map((item) => ({
    slug: item.slug,
  }));
}

async function getCaseStudyData(slug) {
  const res = await fetchStrapi(
    `case-study-cards?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[image][fields]=url,formats&populate[caseStudyCarousel][populate]=*`
  );
  if (!res || !res.length) return null;
  return res[0];
}

export default async function CaseStudyDetail({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyData(slug);

  if (!caseStudy) {
    return <div className="mt-12">Case study not found</div>;
  }

  const CaseStudies = await fetchStrapi(
    "case-studies-pages?populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
     "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&"
  );

   const caseStudiesData = CaseStudies?.[0] || {};
  const contactFormData = caseStudiesData.contact_section;
  const contactForm = contactFormData.contactForm;



  return (
    <CaseStudyMain 
      caseStudy={caseStudy}
      contactSectionHeader={contactFormData}
      contactForm={contactForm}
    />
  );
}