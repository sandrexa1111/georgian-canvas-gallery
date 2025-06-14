import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // In a real implementation, you would submit to Formspree or similar service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Interested in commissioning a piece, purchasing artwork, or simply want to connect? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="font-playfair text-3xl font-bold mb-8">Let's Connect</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Georgia</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:info@levanmosiashvili.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      info@levanmosiashvili.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MessageCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <a
                      href="https://wa.me/995555123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Quick message via WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-semibold mb-4">What We Offer</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Original artwork sales with certificates of authenticity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom commissioned paintings for homes and businesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Professional framing and shipping worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Art consultation for collectors and interior designers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border">
                <h2 className="font-playfair text-2xl font-bold mb-6">Send a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                    placeholder="Tell us about your interest in the artwork, commission details, or any questions you have..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
                
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-playfair text-3xl font-bold mb-8">Follow the Journey</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com/levanmosiashviliart"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook Business Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
