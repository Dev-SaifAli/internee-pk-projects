import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center  pt-20 overflow-hidden bg-[#f5f5f4]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/50 -skew-x-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-black/5 text-xs font-bold tracking-widest uppercase mb-6"
            >
              Award Winning Agency
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              CRAFTING <br />
              <span className="text-black/40 italic font-serif">Digital</span> <br />
              EXPERIENCES.
            </h1>
            
            <p className="text-lg text-black/60 max-w-md mb-10 leading-relaxed">
              We partner with forward-thinking brands to build meaningful digital products 
              that drive growth and inspire change.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-all flex items-center gap-3 group">
                View Our Work
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full font-medium border border-black/10 hover:bg-white transition-all flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-black" />
                </div>
                Watch Showreel
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                alt="Creative Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white text-sm font-medium">Our studio in downtown Tokyo</p>
              </div>
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-black/5"
            >
              <div className="text-3xl font-bold">150+</div>
              <div className="text-xs text-black/50 font-bold uppercase tracking-wider">Projects Delivered</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
