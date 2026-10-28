'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from 'next/link';

export default function DonatePage() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Submit the form immediately when the component mounts
    if (formRef.current) {
      formRef.current.submit();
    }

    // No timeout needed anymore
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center w-full min-h-screen py-2 text-center">
        <h1 className="text-3xl font-bold mb-6">Thank You for Supporting This Project</h1>

        <p className="mb-6">
          You will be redirected to PayPal in a moment. If the redirect doesn&apos;t work, please click the button below.
        </p>

        <form
          ref={formRef}
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
          className="mb-8"
        >
          <input type="hidden" name="business" value="FHJMRDXEDC74L" />
          <input type="hidden" name="amount" value="8" />
          <input type="hidden" name="no_recurring" value="0" />
          <input
            type="hidden"
            name="item_name"
            value="Buy me a cup of coffee"
          />
          <input type="hidden" name="currency_code" value="USD" />

          <Button
            type="submit"
            className="bg-[#ffd140] hover:bg-[#ffd140]/50 text-[#003087] px-6 py-2 font-bold italic"
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate via PayPal
          </Button>
        </form>

        <section className="max-w-2xl text-left mb-12 space-y-8 px-4">
          <div>
            <h2 className="text-2xl font-semibold mb-3">What Your Donation Supports</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Google Maps Timeline Visualizer is a free tool that lets you explore
              your location history through beautiful, interactive heatmaps and
              detailed trip breakdowns. Your donation helps cover the ongoing server
              and hosting costs that keep this tool available to everyone at no
              charge. It also supports continued open-source development, including
              new features, performance improvements, and bug fixes that make the
              experience better for all users.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every contribution, no matter the size, goes directly toward
              maintaining the infrastructure and dedicating development time to this
              project. With your support, we can continue to improve the tool and
              keep it freely accessible to anyone who wants to visualize their
              Google Maps Timeline data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">A Privacy-Focused Approach</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Unlike many online services, this tool is designed with your privacy
              as a top priority. All of your location data is processed entirely
              within your browser. Your Google Maps Timeline files are never
              uploaded to any server, and we do not collect, store, or share any of
              your personal information or location history.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe you should be able to explore and understand your own data
              without sacrificing your privacy. There are no analytics trackers
              harvesting your behavior, no hidden data pipelines, and no third-party
              access to your files. Your timeline stays yours, and your donation
              helps us keep it that way by ensuring we never need to monetize user
              data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Other Ways to Support the Project</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              If you are not in a position to donate right now, there are still
              plenty of meaningful ways to help. Starring the project on GitHub
              increases its visibility and helps other users discover the tool. You
              can also share it with friends, family, or anyone who might enjoy
              exploring their own location history. Word of mouth is one of the most
              powerful ways to grow an open-source project.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you encounter any bugs or have ideas for new features, opening an
              issue on GitHub is incredibly valuable. Community feedback directly
              shapes the development roadmap and helps us prioritize the
              improvements that matter most. Whether you contribute code, report a
              problem, or simply tell a friend, every bit of support makes a real
              difference. Thank you for being part of this community.
            </p>
          </div>
        </section>

        <Link href="/" className="text-blue-500 hover:underline mb-4">
          Return to Homepage
        </Link>

        <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
          Privacy Policy
        </Link>
      </main>
    </>
  );
}
