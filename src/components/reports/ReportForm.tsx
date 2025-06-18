import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportFormProps {
  onSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageFile: null as File | null,
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location description is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Incident description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Submitting report:', formData);

      setFormData({
        name: '',
        location: '',
        description: '',
        imageFile: null,
        latitude: '',
        longitude: '',
      });

      onSuccess();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location Description</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Near Hillside Community Center"
                className={`flex-grow ${errors.location ? 'border-destructive' : ''}`}
              />
              <Button type="button" variant="outline" onClick={getCurrentLocation}>
                <MapPin className="mr-2 h-4 w-4" />
                Get
              </Button>
            </div>
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            {(formData.latitude && formData.longitude) && (
              <p className="text-xs text-muted-foreground">
                Coordinates: {parseFloat(formData.latitude).toFixed(4)}, {parseFloat(formData.longitude).toFixed(4)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Incident Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you observed in detail..."
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image (Optional)</Label>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="mr-2 h-4 w-4" />
                  Select Image
                </Label>
              </Button>
              <Input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-sm text-muted-foreground">
                {formData.imageFile ? formData.imageFile.name : 'No image selected'}
              </span>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
