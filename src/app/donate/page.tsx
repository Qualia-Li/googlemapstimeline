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
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2 text-center">
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
      
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
}
