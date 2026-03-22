import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#f5f5f4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black/40 mb-4">Get in Touch</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Let's create something <br />
              <span className="italic font-serif">extraordinary</span>.
            </h3>
            
            <p className="text-lg text-black/60 mb-12 leading-relaxed max-w-md">
              Have a project in mind? We'd love to hear from you. 
              Fill out the form and we'll get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black/40 mb-2">Email Us</h4>
                <p className="text-xl font-medium">hello@lumina.agency</p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black/40 mb-2">Visit Us</h4>
                <p className="text-xl font-medium">123 Creative St, Tokyo, Japan</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-black/5 border border-black/5"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-black/60">Thank you for reaching out. We'll be in touch soon.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-bold underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-black/40 ml-1">Name</label>
                    <input
                      {...register('name')}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-black/5 border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none",
                        errors.name && "border-red-500 bg-red-50"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-black/40 ml-1">Email</label>
                    <input
                      {...register('email')}
                      className={cn(
                        "w-full px-6 py-4 rounded-2xl bg-black/5 border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none",
                        errors.email && "border-red-500 bg-red-50"
                      )}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-black/40 ml-1">Subject</label>
                  <input
                    {...register('subject')}
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl bg-black/5 border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none",
                      errors.subject && "border-red-500 bg-red-50"
                    )}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-xs text-red-500 ml-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-black/40 ml-1">Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl bg-black/5 border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none resize-none",
                      errors.message && "border-red-500 bg-red-50"
                    )}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black/80 transition-all disabled:opacity-50 group"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className={cn("w-5 h-5 transition-transform", !isSubmitting && "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
