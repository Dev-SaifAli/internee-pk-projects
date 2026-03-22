import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Ethereal Watch Co.',
    category: 'E-commerce / Branding',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    size: 'large',
  },
  {
    title: 'Nova Banking',
    category: 'Fintech / UI UX',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    size: 'small',
  },
  {
    title: 'Urban Oasis',
    category: 'Architecture / Web',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    size: 'small',
  },
  {
    title: 'Zenith App',
    category: 'Productivity / Mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    size: 'large',
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              Projects that define <br />
              <span className="text-white/40 italic font-serif">excellence</span>.
            </h3>
          </div>
          <button className="px-8 py-4 rounded-full font-medium border border-white/10 hover:bg-white hover:text-black transition-all">
            View All Projects
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer ${
                project.size === 'large' ? 'md:row-span-2' : ''
              }`}
            >
              <div className="aspect-[4/5] md:aspect-auto md:h-full min-h-[400px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-end">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-white/60 mb-2 block">{project.category}</span>
                    <h4 className="text-3xl font-bold">{project.title}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
