
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';

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

interface ArtworkFormProps {
  artwork?: Artwork | null;
  onSave: (artwork: any) => void;
  onCancel: () => void;
}

const categories = [
  'Landscape',
  'Portrait', 
  'Still Life',
  'Religious',
  'Abstract',
  'Cultural Heritage'
];

const periods = [
  'Contemporary (2020-2024)',
  'Modern (2000-2019)',
  'Classical (1980-1999)'
];

export const ArtworkForm = ({ artwork, onSave, onCancel }: ArtworkFormProps) => {
  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    image: artwork?.image || '',
    dimensions: artwork?.dimensions || '',
    medium: artwork?.medium || '',
    year: artwork?.year || new Date().getFullYear(),
    description: artwork?.description || '',
    category: artwork?.category || categories[0],
    period: artwork?.period || periods[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (artwork) {
      onSave({ ...artwork, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-playfair text-2xl font-bold">
              {artwork ? 'Edit Artwork' : 'Add New Artwork'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {formData.image ? (
                  <div className="space-y-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mx-auto max-h-40 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2 text-muted-foreground" size={48} />
                    <p className="text-muted-foreground mb-2">Upload an image or enter URL</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer hover:bg-primary/90"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
              <input
                type="url"
                placeholder="Or enter image URL"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Artwork title"
              />
            </div>

            {/* Dimensions & Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dimensions</label>
                <input
                  type="text"
                  required
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="e.g., 80 x 60 cm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Medium</label>
                <input
                  type="text"
                  required
                  value={formData.medium}
                  onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="e.g., Oil on Canvas"
                />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            {/* Category & Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {periods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Describe the artwork..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                {artwork ? 'Update Artwork' : 'Add Artwork'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
