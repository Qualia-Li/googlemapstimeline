import { Mail, Globe, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="container mx-auto p-4 text-center text-sm text-muted-foreground pb-6">
      <div className="mt-2 mb-4 flex items-center justify-center gap-2">
        <Mail className="h-4 w-4" />
        <span>Have suggestions? Contact: </span>
        <a href="mailto:mail@qualai.li" className="text-primary hover:underline">mail@qualai.li</a>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        Other projects:
        
        <a 
          href="https://chatslide.ai" 
          target="_blank" 
          rel="noopener"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          chatslide.ai
        </a>
        
        <a 
          href="https://vibehacker.fm" 
          target="_blank" 
          rel="noopener"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          vibehacker.fm
        </a>

        <a 
          href="https://enception.ai" 
          target="_blank" 
          rel="noopener"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          enception.ai
        </a>
        
        <a 
          href="https://quanlai.li" 
          target="_blank" 
          rel="noopener"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <Globe className="h-4 w-4" />
          quanlai.li
        </a>
      </div>

      <div className="mb-6">
        <div className="text-center mb-3 font-medium">Sponsors:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
          <div>
            <a
              href="https://bctimes.ca"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              BC Times
            </a>
            <p className="text-xs mt-1">Authoritative news and insights for British Columbia</p>
          </div>
          <div>
            <a
              href="https://cambridgereview.uk"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Cambridge Review
            </a>
            <p className="text-xs mt-1">Definitive coverage of Cambridge and East England</p>
          </div>
          <div>
            <a
              href="https://districtofcolumbiatimes.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              District of Columbia Times
            </a>
            <p className="text-xs mt-1">The trusted source for Washington DC news</p>
          </div>
          <div>
            <a
              href="https://eeuuhoy.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              EEUU Hoy
            </a>
            <p className="text-xs mt-1">Leading Spanish-language news for the United States</p>
          </div>
          <div>
            <a
              href="https://lentreprise.ca"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              L'Entreprise
            </a>
            <p className="text-xs mt-1">Authoritative business news for Canadian francophone markets</p>
          </div>
          <div>
            <a
              href="https://manhattanmonday.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Manhattan Monday
            </a>
            <p className="text-xs mt-1">Your definitive guide to Manhattan news and culture</p>
          </div>
          <div>
            <a
              href="https://montrealtimes.ca"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Montreal Times
            </a>
            <p className="text-xs mt-1">The trusted voice for Montreal and Quebec news</p>
          </div>
          <div>
            <a
              href="https://sfbayareatimes.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              SF Bay Area Times
            </a>
            <p className="text-xs mt-1">Definitive coverage of San Francisco Bay Area</p>
          </div>
          <div>
            <a
              href="https://stanfordtechreview.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Stanford Tech Review
            </a>
            <p className="text-xs mt-1">Authoritative technology news and innovation insights</p>
          </div>
          <div>
            <a
              href="https://techforum.ca"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline font-medium"
            >
              Tech Forum
            </a>
            <p className="text-xs mt-1">Leading technology news source for Canada</p>
          </div>
        </div>
      </div>

      <div className="font-medium">
        Built with ❤️ from San Francisco
      </div>
    </footer>
  );
} 