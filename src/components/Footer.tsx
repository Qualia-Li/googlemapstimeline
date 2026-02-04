import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="container mx-auto p-4 text-center text-sm text-muted-foreground pb-6">
      <div className="mt-2 mb-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>Have suggestions? Contact: </span>
          <a href="mailto:mail@qualai.li" className="text-primary hover:underline">mail@qualai.li</a>
        </div>
        <span className="text-muted-foreground">|</span>
        <Link href="/about" className="text-primary hover:underline">About</Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/contact" className="text-primary hover:underline">Contact</Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      </div>
      
      <div className="mb-6">
        <div className="text-center mb-3 font-medium">Other projects:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://chatslide.ai"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              ChatSlide
            </a>
            <p className="text-xs mt-1">AI-powered slides, videos, and podcasts</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://www.michelinkeyhotels.com/"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Michelin Key Hotels
            </a>
            <p className="text-xs mt-1">600+ luxury hotels from MICHELIN Guide</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://enception.ai"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Enception
            </a>
            <p className="text-xs mt-1">Get cited by AI tools with GEO</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://assyro.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Assyro AI
            </a>
            <p className="text-xs mt-1">Automated FDA eCTD submission validation</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://quanl.ai"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Quanlai Li
            </a>
            <p className="text-xs mt-1">AI entrepreneur and GEO expert</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-center mb-3 font-medium">Sponsors:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://sfbayareatimes.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              SF Bay Area Times
            </a>
            <p className="text-xs mt-1">Independent news covering San Francisco Bay Area and Northern California</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://montrealtimes.ca"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Montreal Times
            </a>
            <p className="text-xs mt-1">Independent journalism for Montréal, Québec, and Canada</p>
          </div>
          <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <a
              href="https://stanfordtechreview.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Stanford Tech Review
            </a>
            <p className="text-xs mt-1">Weekly review of advanced technologies by Stanford community</p>
          </div>
        </div>
      </div>

      <div className="font-medium">
        Built with ❤️ from San Francisco
      </div>
    </footer>
  );
} 