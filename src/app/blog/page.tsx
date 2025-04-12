import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
};

const blogPosts: BlogPost[] = [
  {
    slug: "export-google-timeline-data",
    title: "Step by Step Guide to Export Your Google Timeline Data in 2025",
    description: "Learn how to export your location history from Google and visualize it with our tool.",
    date: "Apr 12, 2025",
    author: "Quan Lai",
    readTime: "3 min read",
    imageUrl: "/images/export_google_timeline.webp",
  },
  // {
  //   slug: "privacy-and-location-data",
  //   title: "Understanding Privacy and Your Location Data",
  //   description: "What you should know about privacy implications when using location services.",
  //   date: "June 3, 2023",
  //   author: "Privacy Expert",
  //   readTime: "8 min read",
  //   imageUrl: "/blog/privacy-location.jpg",
  // },
  // {
  //   slug: "visualizing-travel-history",
  //   title: "Creative Ways to Visualize Your Travel History",
  //   description: "Fun and interesting ways to make the most of your location data visualization.",
  //   date: "July 12, 2023",
  //   author: "Travel Enthusiast",
  //   readTime: "6 min read",
  //   imageUrl: "/blog/travel-visualization.jpg",
  // },
];

export const metadata = {
  title: "Blog | Google Maps Timeline Visualizer",
  description: "Articles and guides about Google Maps Timeline, location data, and travel visualization.",
  openGraph: {
    title: "Blog | Google Maps Timeline Visualizer",
    description: "Articles and guides about Google Maps Timeline, location data, and travel visualization.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <main className="container mx-auto p-4 md:p-6 min-h-screen">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to Map
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8">
          Tips, guides, and insights on location history and travel visualization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="group overflow-hidden rounded-lg border bg-card shadow transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <div className="h-full w-full bg-secondary flex items-center justify-center text-muted-foreground">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="h-full w-full object-fit transition-all group-hover:scale-105" 
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <div className="flex flex-wrap text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
} 