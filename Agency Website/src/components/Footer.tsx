import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <a href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
              </div>
              <span>LUMINA</span>
            </a>
            <p className="text-black/60 max-w-sm text-lg leading-relaxed">
              We are a team of designers, developers, and strategists dedicated to 
              crafting exceptional digital experiences that push the boundaries of what's possible.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-black/60 hover:text-black transition-colors">Services</a></li>
              <li><a href="#work" className="text-black/60 hover:text-black transition-colors">Our Work</a></li>
              <li><a href="#about" className="text-black/60 hover:text-black transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-black/60 hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-8">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/5 gap-6">
          <p className="text-sm text-black/40">
            © 2026 Lumina Creative Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-black/40">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
