import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blogPosts";
import { BlogPost } from "@/types/BlogPost";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params to resolve the slug
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    openGraph: post.metadata.openGraph,
    twitter: post.metadata.twitter,
    alternates: {
      canonical: post.metadata.canonical,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await params to resolve the slug
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main>
      <article className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">{post.metadata.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
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

          {post.metadata.openGraph.images &&
            post.metadata.openGraph.images[0] && (
              <div className="rounded-lg overflow-hidden bg-muted mb-8 flex items-center justify-center">
                <Image
                  src={post.metadata.openGraph.images[0].url}
                  alt={post.metadata.openGraph.images[0].alt}
                  width={post.metadata.openGraph.images[0].width}
                  height={post.metadata.openGraph.images[0].height}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            {post.content.introduction}
          </p>
          <Alert className="my-6">
            <AlertTitle>Privacy First</AlertTitle>
            <AlertDescription>
              Your location data contains sensitive information. Our tool
              processes this data entirely in your browser - we never store or
              transmit your data to any server.
            </AlertDescription>
          </Alert>
          {post.content.prerequisites &&
            post.content.prerequisites.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">Prerequisites</h2>
                <ul className="space-y-2 mb-6">
                  {post.content.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </>
            )}
          {post.content.sections && post.content.sections.length > 0 && (
            <div className="space-y-8">
              {post.content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold mb-3">
                    {section.title}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-1/2">
                      <ol className="space-y-4 mb-4">
                        {section.instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    {section.imageSrc && (
                      <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        <Image
                          src={section.imageSrc}
                          alt={section.imageAlt || ""}
                          width={300}
                          height={500}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {post.content.troubleshooting && (
            <>
              <div className="my-8">
                <Separator />
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                {post.content.troubleshooting.title}
              </h2>

              {post.content.troubleshooting.items.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mt-6 mb-3">
                    {item.title}
                  </h3>
                  <p className="mb-4">{item.description}</p>
                  <ul className="space-y-2 mb-6">
                    {item.solutions.map((solution, idx) => (
                      <li key={idx}>{solution}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
          {post.content.faq && post.content.faq.length > 0 && (
            <>
              <div className="my-8">
                <Separator />
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">FAQ</h2>

              <div className="space-y-6">
                {post.content.faq.map((faqItem, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {faqItem.question}
                      </h3>
                      <p>{faqItem.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </article>
      </main>
      <Footer />
    </>
  );
}
