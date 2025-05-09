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
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          chatslide.ai
        </a>
        
        <a 
          href="https://vibehacker.fm" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          vibehacker.fm
        </a>

        <a 
          href="https://enception.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          enception.ai
        </a>
        
        <a 
          href="https://quanlai.li" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <Globe className="h-4 w-4" />
          quanlai.li
        </a>
      </div>
      
      <div className="font-medium">
        Built with ❤️ from San Francisco
      </div>
    </footer>
  );
} 