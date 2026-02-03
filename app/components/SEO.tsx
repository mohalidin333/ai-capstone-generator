import React from "react";
import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>Capstone Idea Studio</title>
      <meta
        name="description"
        content="Generate a capstone that tailored to your needs"
      />
      <meta
        name="keyword"
        content="Capstone Idea Studio, Thesis Title Generator, Capstone Title Generator, Best Capstone Title Generator, AI, Thesis, Capstone, Generator"
      />
      <meta name="author" content="Capstone Idea Studio" />
      <meta property="og:title" content="Capstone Idea Studio" />
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
            name: "Capstone Idea Studio",
            description: "Generate a capstone that tailored to your needs",
            url: "ai-capstone-generator.vercel.app",
            author : {
              "@type": "Person",
              name: "Capstone Idea Studio",
              url: "ai-capstone-generator.vercel.app",
              logo: "/favicon.ico",
            },
            publisher: {
              "@type": "Person",
              name: "Capstone Idea Studio",
              url: "ai-capstone-generator.vercel.app",
              logo: "/favicon.ico",
            },
          }),
        }}
      />
    </Head>
  );
}
