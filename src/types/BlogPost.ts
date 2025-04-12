export interface BlogImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  type: string; // usually "article" for blog posts
  publishedTime: string; // ISO date string
  authors: string[];
  images: BlogImage[];
}

export interface TwitterCard {
  card: string; // e.g., "summary_large_image"
  title: string;
  description: string;
  images: string[]; // URLs
  creator?: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
  keywords?: string[]; // SEO keywords
  openGraph: OpenGraph;
  twitter: TwitterCard;
  canonical: string; // canonical URL
  readingTime?: string; // e.g., "3 min read"
  publishDate: string; // display format (e.g., "Apr 2025")
  lastUpdated?: string; // optional last updated date
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Section {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  instructions: string[];
}

export interface BlogContent {
  introduction: string;
  prerequisites?: string[];
  sections?: Section[];
  troubleshooting?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      solutions: string[];
    }>;
  };
  faq?: FAQItem[];
  conclusion?: string;
}

export interface BlogPost {
  id: string; // unique identifier for the blog post
  slug: string; // URL-friendly version of the title
  metadata: BlogMetadata;
  content: BlogContent;
  contentFilePath?: string; // Optional path to a markdown file containing the full content
}

// Example of a blog post factory function
export function createBlogPost(
  id: string,
  slug: string,
  metadata: BlogMetadata,
  content: BlogContent,
  contentFilePath?: string
): BlogPost {
  return {
    id,
    slug,
    metadata,
    content,
    contentFilePath,
  };
} 