import { Button } from "@/components/ui/button";
import { Heart, FileText } from "lucide-react";
import Link from "next/link";

export function DonationSection() {
  return (
    <div className="mt-12 text-center">
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link href="/donate">
          <Button
            className="bg-[#ffd140] hover:bg-[#ffd140]/50 text-[#003087] px-6 py-2 font-bold italic"
          >
            <Heart className="mr-2 h-5 w-5" />
            Support via PayPal
          </Button>
        </Link>
      </div>
    </div>
  );
} 