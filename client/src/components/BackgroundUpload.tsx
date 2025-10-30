import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { useCertificateStore } from '@/store/certificateStore';

interface BackgroundUploadProps {
  pageId: string;
}

export function BackgroundUpload({ pageId }: BackgroundUploadProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setPageBackground = useCertificateStore((state) => state.setPageBackground);
  const removePageBackground = useCertificateStore((state) => state.removePageBackground);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const dataUrl = event.target?.result as string;
          setPageBackground(pageId, dataUrl, img.width, img.height);
          setIsLoading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) return;

    setIsLoading(true);
    const img = new Image();
    img.onload = () => {
      setPageBackground(pageId, imageUrl, img.width, img.height);
      setImageUrl('');
      setIsLoading(false);
    };
    img.onerror = () => {
      console.error('Failed to load image from URL');
      setIsLoading(false);
    };
    img.src = imageUrl;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Background
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Certificate Background</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
            <Button
              onClick={() => removePageBackground(pageId)}
              variant="ghost"
              className="w-full"
            >
              Remove Background
            </Button>
          </TabsContent>
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleUrlSubmit}
              disabled={!imageUrl.trim() || isLoading}
              className="w-full gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              {isLoading ? 'Loading...' : 'Load Image'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
