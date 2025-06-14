
import { Calendar, MapPin, Palette, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h1 className="font-playfair text-5xl font-bold mb-6">About the Artist</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Levan Mosiashvili is a distinguished Georgian painter whose work bridges the gap between 
              traditional Georgian artistic heritage and contemporary artistic expression.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" size={20} />
                <div>
                  <p className="font-semibold">Based in</p>
                  <p className="text-muted-foreground">Georgia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" size={20} />
                <div>
                  <p className="font-semibold">Active Since</p>
                  <p className="text-muted-foreground">2015</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Palette className="text-primary" size={20} />
                <div>
                  <p className="font-semibold">Specializes In</p>
                  <p className="text-muted-foreground">Landscapes & Portraits</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={20} />
                <div>
                  <p className="font-semibold">Recognition</p>
                  <p className="text-muted-foreground">Local Exhibitions</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=700&fit=crop"
              alt="Artist at work"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Biography */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Artistic Journey</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-playfair text-xl font-semibold mb-3">Early Inspiration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Born and raised in Georgia, Levan's artistic journey began with childhood fascination 
                  for the dramatic landscapes of the Caucasus Mountains and the rich cultural tapestry 
                  of Georgian heritage. The interplay of light and shadow across ancient monasteries 
                  and rolling vineyards became the foundation of his artistic vision.
                </p>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-playfair text-xl font-semibold mb-3">Artistic Philosophy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "Art should speak to the soul before it speaks to the mind," Levan often says. 
                  His work explores the emotional landscape of Georgian identity, capturing not just 
                  the physical beauty of the land, but the spiritual connection between people and place 
                  that defines Georgian culture.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="font-playfair text-xl font-semibold mb-3">Technical Mastery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Working primarily in oils and acrylics, Levan has developed a distinctive style that 
                  combines realistic detail with impressionistic atmosphere. His landscapes capture 
                  the changing moods of Georgian seasons, while his portraits reveal the depth and 
                  complexity of human emotion through abstract elements.
                </p>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="font-playfair text-xl font-semibold mb-3">Contemporary Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In his recent work, Levan explores modern surrealism, creating pieces that challenge 
                  conventional perspectives while remaining deeply rooted in Georgian artistic traditions. 
                  This fusion of classical technique with contemporary vision creates artwork that resonates 
                  with both local and international audiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold mb-12 text-center">Career Highlights</h2>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-primary/30"></div>
            
            <div className="space-y-12">
              {[
                {
                  year: "2015",
                  title: "Artistic Journey Begins",
                  description: "Started painting professionally, focusing on Georgian landscapes and traditional themes."
                },
                {
                  year: "2018",
                  title: "First Solo Exhibition",
                  description: "Showcased 'Echoes of Kakheti' series at a local gallery, receiving critical acclaim."
                },
                {
                  year: "2020",
                  title: "Digital Presence",
                  description: "Launched social media presence, connecting with art lovers worldwide during the pandemic."
                },
                {
                  year: "2022",
                  title: "Abstract Evolution",
                  description: "Began incorporating abstract elements and surrealistic themes into traditional Georgian subjects."
                },
                {
                  year: "2024",
                  title: "Online Gallery Launch",
                  description: "Established comprehensive online presence to share artwork with global audience."
                }
              ].map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center animate-fade-in ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full absolute left-0 md:left-1/2 md:transform md:-translate-x-4 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <div className="text-primary font-semibold text-lg mb-2">{event.year}</div>
                      <h3 className="font-playfair text-xl font-semibold mb-3">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-secondary/30 p-12 rounded-lg animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <h2 className="font-playfair text-3xl font-bold mb-4">Connect with the Artist</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Follow Levan's artistic journey on social media or get in touch to discuss 
            commissions and available artwork.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com/levanmosiashviliart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit Facebook Page
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-primary text-primary rounded-md font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              Contact for Commissions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
