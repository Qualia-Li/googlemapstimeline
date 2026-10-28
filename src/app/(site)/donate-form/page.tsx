'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from 'next/link';

export default function DonateFormPage() {
  const googleFormUrl = 'https://forms.gle/yourGoogleFormLink';

  useEffect(() => {
    // Automatically redirect to the Google Form when the component mounts
    const timer = setTimeout(() => {
      window.location.href = googleFormUrl;
    }, 1000); // 1 second delay to show the page briefly

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1 className="text-3xl font-bold mb-6">Thank You for Supporting This Project</h1>
      
      <p className="mb-6">
        You will be redirected to a Google Form in a moment. If the redirect doesn&apos;t work, please click the button below.
      </p>
      
      <Button
        onClick={() => window.open(googleFormUrl, '_blank')}
        className="bg-[#4285f4] hover:bg-[#4285f4]/50 text-white px-6 py-2 font-bold italic mb-8"
      >
        <FileText className="mr-2 h-5 w-5" />
        Open Google Form
      </Button>
      
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
} 