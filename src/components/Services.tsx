import { motion } from 'motion/react';
import { Layout, Smartphone, Globe, BarChart, Palette, Zap } from 'lucide-react';

const services = [
  {
    title: 'Web Design',
    description: 'Bespoke digital experiences tailored to your brand identity and user needs.',
    icon: Globe,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Mobile Apps',
    description: 'High-performance native and cross-platform mobile applications.',
    icon: Smartphone,
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric interfaces that are intuitive, accessible, and beautiful.',
    icon: Layout,
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    title: 'Branding',
    description: 'Strategic brand positioning and visual identity systems that resonate.',
    icon: Palette,
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    title: 'Growth Marketing',
    description: 'Data-driven strategies to scale your business and reach new audiences.',
    icon: BarChart,
    color: 'bg-rose-500/10 text-rose-600',
  },
  {
    title: 'Performance',
    description: 'Optimizing your digital assets for maximum speed and conversion.',
    icon: Zap,
    color: 'bg-amber-500/10 text-amber-600',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black/40 mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              We help brands thrive in the <br />
              <span className="italic font-serif">digital age</span>.
            </h3>
          </div>
          <p className="text-black/60 max-w-xs leading-relaxed">
            From strategy to execution, we provide end-to-end solutions for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-black/5 hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">{service.title}</h4>
              <p className="text-black/60 leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all">
                Learn More
                <div className="w-5 h-px bg-black" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
