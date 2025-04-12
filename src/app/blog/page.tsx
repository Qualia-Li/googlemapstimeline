import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/data/blogPosts";

export const metadata = {
  title: "Blog | Google Maps Timeline Visualizer",
  description: "Helpful articles and guides about using Google Maps Timeline data and our visualization tools",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 max-w-5xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Guides, tutorials, and insights to help you get the most out of your location data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                {post.metadata.openGraph.images && post.metadata.openGraph.images[0] && (
                  <Image
                    src={post.metadata.openGraph.images[0].url}
                    alt={post.metadata.openGraph.images[0].alt}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{post.metadata.title}</CardTitle>
                <CardDescription>{post.metadata.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {post.metadata.publishDate}
                  </div>
                  {post.metadata.readingTime && (
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.metadata.readingTime}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={`/blog/${post.slug}`}>
                  <Button>Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
} 