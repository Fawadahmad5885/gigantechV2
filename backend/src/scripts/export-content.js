const fs = require("fs");
const axios = require("axios");
const path = require("path");
const { promisify } = require("util");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);

// Configuration
const STRAPI_URL = "http://localhost:1337";
const API_TOKEN =
  "cd54baafdeb050fb77aedd7a8e13932f1162e7a1333a1656bbafaeeb48c9426aeec1b467f7b23368f7ba7e3c0d550202589edab448cdc012a07cb05fce6016015edb42523957d8e3658b89aad6f44c1d4f561edb3cf93d1a332a901e9a0494c65fb328d1c74f3c9c05f28f4b881d627959a21f8a5029b7bf785c906098c6e02c"; // Get this from Strapi Settings > API Tokens
const OUTPUT_DIR = path.join(
  __dirname,
  "../../../frontend/public/content-export"
);
const MEDIA_DIR = path.join(OUTPUT_DIR, "uploads");
const CONTENT_TYPE_QUERIES = {
  "landing-pages": [
    "populate[hero_sections][populate][image][fields]=url,formats",
    "populate[hero_sections][populate][video][fields]=url,formats",
    "populate[hero_sections][populate][Button][fields]=*",
    "populate[industries_section][populate][industryCard][populate][image][fields]=url,formats",
    "populate[services_section][populate][serviceCard][populate][image][fields]=url,formats",
    "populate[services_section][populate][backgroundImage][fields]=url,formats",
    "populate[about_section][populate][aboutImage][fields]=url",
    "populate[technologies_section][populate][backgroundImage][fields]=url,formats",
    "populate[technologies][populate][logo][fields]=url",
    "populate[technologies][fields]=*",
    "populate[contact_section][populate][contactForm][populate][Input][fields]=label",
    "populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value",
    "populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title",
    "populate[contact_section][populate][footerSteps][fields]=*",
    "populate[clients_section][populate][Client][populate][clientLogo][fields]=url",
    "populate[case_studies_hero][populate][image][fields]=url,formats",
    "populate[case_study_cards][populate][image][fields]=url,formats",
    "populate[news_blogs_and_event][populate][image][fields]=url,formats",
    "populate[news_items][populate][image][fields]=url,formats"
  ].join('&'),
  "about-pages": [
    "populate[about_hero][populate][Button]=*",
    "populate[about_hero][populate][styledText]=*",
    "populate[partner_choice][populate][partnerChoiceCard][populate][image][fields]=url",
    "populate[about_story]=*",
    "populate[contact_section][populate][contactForm][populate][Input][fields]=label",
    "populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value",
    "populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title",
    "populate[contact_section][populate][footerSteps][fields]=*"
  ].join('&'),
  "about-meta": "populate[aboutMetaData][populate][0]=metaImage",
  "case-studies-pages": [
    "populate[case_studies_hero][populate]=*",
    "populate[case_study_cards][populate][image][fields]=url,formats",
    "populate[contact_section][populate][contactForm][populate][Input][fields]=label",
    "populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value",
    "populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title",
    "populate[contact_section][populate][footerSteps][fields]=*"
  ].join('&'),
  "home-meta": "populate[homeMetaData][populate][0]=metaImage&populate[homeMetaData][populate][1]=openGraphImage",
  "news-meta": "populate[newsMetaData][populate][0]=metaImage",
  "news-blogs-pages": [
    "populate[news_blogs_and_event][populate]=*",
    "populate[news_items][populate][image][fields]=url,formats",
    "populate[contact_section][populate][contactForm][populate][Input][fields]=label",
    "populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value",
    "populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title",
    "populate[contact_section][populate][footerSteps][fields]=*"
  ].join('&'),
  "news-items": [
    "populate=*"
  ].join('&'),
  "case-study-meta": "populate[caseStudiesMetaData][populate][0]=metaImage",
  "case-study-cards": [
    "populate=*"
  ].join('&'),
  "layout-pages": [
    "populate[header_section][populate][logo][fields][0]=url",
    "populate[header_section][populate][navItems]=*",
    "populate[footer_section][populate][officesCard][populate][flagImage][fields]=url,formats",
    "populate[footer_section][populate][whiteLogo][fields]=url",
    "populate[services_lists][populate]=*",
    "populate[industries_lists][populate]=*"
  ].join('&')
};
// Utility functions
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

async function downloadMedia(url, filePath, retries = 3) {
  try {
    ensureDirectoryExistence(filePath);
    const response = await axios.get(url, {
      responseType: "stream",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      timeout: 30000,
    });
    await pipeline(response.data, fs.createWriteStream(filePath));
    return true;
  } catch (err) {
    if (retries > 0) {
      console.log(`Retrying download (${retries} attempts left)...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return downloadMedia(url, filePath, retries - 1);
    }
    console.error(`❌ Failed to download ${url}:`, err.message);
    return false;
  }
}

async function processMedia(data) {
  if (!data) return data;

  if (Array.isArray(data)) {
    return await Promise.all(data.map(item => processMedia(item)));
  }

  if (typeof data === "object" && data !== null) {
    if (data.attributes?.url && data.attributes?.provider) {
      const mediaUrl = data.attributes.url.startsWith("http")
        ? data.attributes.url
        : `${STRAPI_URL}${data.attributes.url}`;

      const filename = path.basename(data.attributes.url);
      const localPath = path.join(MEDIA_DIR, filename);

      console.log(`Downloading media: ${mediaUrl}`);
      const downloaded = await downloadMedia(mediaUrl, localPath);

      if (downloaded) {
        data.attributes.url = `/content-export/uploads/${filename}`;
      }
    }

    for (const key in data) {
      if (data.hasOwnProperty(key) && typeof data[key] === "object") {
        data[key] = await processMedia(data[key]);
      }
    }
  }

  return data;
}

async function fetchContentType(contentType) {
  const queryString = CONTENT_TYPE_QUERIES[contentType];
  if (!queryString) {
    throw new Error(`No query defined for content type: ${contentType}`);
  }
  const url = `${STRAPI_URL}/api/${contentType}?${queryString}`;
  
  console.log(`Fetching ${contentType} from ${url}`);
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      },
      timeout: 60000
    });

    if (response.status >= 400) {
      throw new Error(`API returned ${response.status}: ${JSON.stringify(response.data)}`);
    }

    return response.data;
  } catch (err) {
    console.error(`Error fetching ${contentType}:`, {
      url,
      error: err.response?.data || err.message,
      status: err.response?.status
    });
    throw err;
  }
}

async function fetchAndSave(contentType) {
  try {
    console.log(`Starting export for ${contentType}...`);
    const data = await fetchContentType(contentType);

    if (data.data) {
      data.data = await processMedia(data.data);
    }

    fs.writeFileSync(
      `${OUTPUT_DIR}/${contentType}.json`,
      JSON.stringify(data, null, 2)
    );
    console.log(`✅ Successfully exported ${contentType}`);
  } catch (err) {
    console.error(`❌ Critical error exporting ${contentType}:`, err.message);
    
    // Save more detailed error information
    const errorInfo = {
      timestamp: new Date().toISOString(),
      contentType,
      error: err.message,
      stack: err.stack,
    };
    
    fs.writeFileSync(
      `${OUTPUT_DIR}/${contentType}_error.log`,
      JSON.stringify(errorInfo, null, 2)
    );
  }
}

async function runExport() {
  try {
    console.log('Starting Strapi v4 export process...');
    
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });

    // Process content types sequentially
    for (const contentType of Object.keys(CONTENT_TYPE_QUERIES)) {
      console.log(`
Exporting ${contentType}...`);
      await fetchAndSave(contentType);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Export completed successfully!");
  } catch (err) {
    console.error('❌ Export failed:', err.message);
    process.exit(1);
  }
}

runExport();