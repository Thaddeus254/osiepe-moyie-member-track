import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCw, Crop, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onProfileSetup: (profilePhoto: string | null) => void;
  userName: string;
}

export function ProfileSetupModal({ isOpen, onProfileSetup, userName }: ProfileSetupModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      onProfileSetup(selectedImage);
    } catch (err) {
      console.error('Failed to upload profile photo');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onProfileSetup(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Set Up Your Profile
          </DialogTitle>
          <DialogDescription>
            Hi {userName}! Let's add a profile photo to personalize your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
              dragOver 
                ? 'border-primary bg-primary/5' 
                : selectedImage 
                  ? 'border-success bg-success/5' 
                  : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            {selectedImage ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img 
                    src={selectedImage} 
                    alt="Profile preview" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-success"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-sm text-success font-medium">Photo selected!</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Crop className="h-4 w-4 mr-1" />
                    Crop
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-4 w-4 mr-1" />
                    Rotate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drop your photo here or</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Guidelines */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Photo Guidelines:</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Maximum size: 5MB</li>
                <li>• Formats: JPG, PNG, GIF</li>
                <li>• Recommended: Square aspect ratio</li>
                <li>• Clear face photo works best</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
              disabled={loading}
            >
              Skip for Now
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-primary text-white"
              disabled={!selectedImage || loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                'Set Photo'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}