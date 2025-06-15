
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { ArtworkForm } from './ArtworkForm';

interface Artwork {
  id: number;
  title: string;
  image: string;
  dimensions: string;
  medium: string;
  year: number;
  description: string;
  category: string;
  period: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('gallery_admin_auth');
    onLogout();
  };

  const handleAddArtwork = (artwork: Omit<Artwork, 'id'>) => {
    const newArtwork = {
      ...artwork,
      id: Date.now()
    };
    setArtworks(prev => [...prev, newArtwork]);
    setIsFormOpen(false);
    console.log('Added artwork:', newArtwork);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setArtworks(prev => prev.map(a => a.id === artwork.id ? artwork : a));
    setEditingArtwork(null);
    console.log('Updated artwork:', artwork);
  };

  const handleDeleteArtwork = (id: number) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      setArtworks(prev => prev.filter(a => a.id !== id));
      console.log('Deleted artwork with id:', id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-playfair text-xl font-bold">Gallery Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Artwork Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            Add New Artwork
          </button>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-playfair text-lg font-semibold mb-2">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{artwork.category} • {artwork.year}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{artwork.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingArtwork(artwork)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArtwork(artwork.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No artworks added yet. Click "Add New Artwork" to get started.</p>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {(isFormOpen || editingArtwork) && (
          <ArtworkForm
            artwork={editingArtwork}
            onSave={editingArtwork ? handleEditArtwork : handleAddArtwork}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingArtwork(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
