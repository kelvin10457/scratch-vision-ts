import React, { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

const TakeImages: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Ideally, use a useEffect to revoke object URLs to avoid memory leaks
      // inside a real application lifecycle
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800">Upload or Take Photo</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Button 1: Upload from Gallery */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          📁 Upload Image
        </button>

        {/* Button 2: Take Photo with Camera */}
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
        >
          📸 Open Camera
        </button>
      </div>

      {/* Hidden Input: Standard File Picker */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden Input: Camera Trigger 
          'capture="environment"' forces the rear camera on mobile */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview Section */}
      {previewUrl && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700">Preview:</p>
          <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          {selectedImage && (
            <p className="text-xs text-gray-500 truncate">
              File: {selectedImage.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeImages;