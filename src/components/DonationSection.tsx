import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export function DonationSection() {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">☕ Support This Project</h2>
      <p className="mb-6 text-muted-foreground">
        If you find this tool helpful, consider buying me a coffee to support
        further development.
      </p>
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
            className="bg-[#ffd140] text-[#003087] px-6 py-2 font-bold italic"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Donate with PayPal
          </Button>
        </form>
      </div>
    </div>
  );
} 