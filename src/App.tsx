

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Services />
        </motion.div>

        <Projects />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
