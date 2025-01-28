import React from "react";
import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>AI Capstone Generator</title>
      <meta
        name="description"
        content="Generate a capstone that tailored to your needs"
      />
      <meta
        name="keyword"
        content="AI Capstone Generator, Thesis Title Generator, Capstone Title Generator, Best Capstone Title Generator, AI, Thesis, Capstone, Generator"
      />
      <meta name="author" content="AI Capstone Generator" />
      <meta property="og:title" content="AI Capstone Generator" />
      <meta
        property="og:description"
        content="Generate a capstone that tailored to your needs"
      />
      <meta property="og:image" content="../favicon.ico" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="ai-capstone-generator.vercel.app" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="ai-capstone-generator.vercel.app" />

      {/* Structured Data for Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Website",
            name: "AI Capstone Generator",
            description: "Generate a capstone that tailored to your needs",
            url: "ai-capstone-generator.vercel.app",
            author : {
              "@type": "Person",
              name: "AI Capstone Generator",
              url: "ai-capstone-generator.vercel.app",
              logo: "/favicon.ico",
            },
            publisher: {
              "@type": "Person",
              name: "AI Capstone Generator",
              url: "ai-capstone-generator.vercel.app",
              logo: "/favicon.ico",
            },
          }),
        }}
      />
    </Head>
  );
}
