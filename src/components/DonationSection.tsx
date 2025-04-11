import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function DonationSection() {
  return (
    <div className="mt-12 text-center">
      <div className="flex justify-center">
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
          className=""
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
            Support this free tool
          </Button>
        </form>
      </div>
    </div>
  );
} 