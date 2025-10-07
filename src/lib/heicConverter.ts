// Utility function to handle HEIC images for preview
export const convertHeicToJpeg = async (file: File): Promise<string> => {
  return new Promise(async (resolve) => {
    // Check if it's a HEIC file
    const isHeic = file.type === "image/heic" || 
                   file.type === "image/heif" || 
                   file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif');

    if (!isHeic) {
      // If not HEIC, create regular object URL
      resolve(URL.createObjectURL(file));
      return;
    }

    // For HEIC files, try to convert using heic2any if available
    try {
      // Dynamic import to avoid bundle issues if package is not installed
      const heic2any = await import('heic2any');
      
      const convertedBlob = await heic2any.default({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8
      });
      
      const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      resolve(URL.createObjectURL(blob as Blob));
      
    } catch (error) {
      console.warn('HEIC conversion not available, using placeholder:', error);
      
      // Create a placeholder image for HEIC files
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 400;
        canvas.height = 400;
        
        // Draw a placeholder background
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, 400, 400);
        
        // Draw border
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, 398, 398);
        
        // Draw icon
        ctx.fillStyle = '#6b7280';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('HEIC Image', 200, 180);
        ctx.fillText(file.name, 200, 210);
        ctx.fillText('Preview not available', 200, 240);
        
        // Convert canvas to blob and return URL
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            // Final fallback - return original file URL (will show broken image)
            resolve(URL.createObjectURL(file));
          }
        }, 'image/png');
      } else {
        // If canvas is not available, return original file URL
        resolve(URL.createObjectURL(file));
      }
    }
  });
};

// NEW FUNCTION: Convert HEIC file to actual JPEG File object
export const convertHeicToJpegFile = async (file: File): Promise<File> => {
  return new Promise(async (resolve, reject) => {
    // Check if it's a HEIC file
    const isHeic = file.type === "image/heic" || 
                   file.type === "image/heif" || 
                   file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif');

    if (!isHeic) {
      // If not HEIC, return the original file
      resolve(file);
      return;
    }

    // For HEIC files, try to convert using heic2any if available
    try {
      // Dynamic import to avoid bundle issues if package is not installed
      const heic2any = await import('heic2any');
      
      const convertedBlob = await heic2any.default({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8
      });
      
      const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      
      // Create a new File object from the converted blob
      const jpegFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
      const jpegFile = new File([blob as Blob], jpegFileName, {
        type: 'image/jpeg',
        lastModified: file.lastModified
      });
      
      resolve(jpegFile);
      
    } catch (error) {
      console.error('HEIC conversion failed:', error);
      reject(new Error('HEIC conversion not available or failed. Please use a different image format.'));
    }
  });
};

// Helper function to check if a file is HEIC
export const isHeicFile = (file: File): boolean => {
  return file.type === "image/heic" || 
         file.type === "image/heif" || 
         file.name.toLowerCase().endsWith('.heic') || 
         file.name.toLowerCase().endsWith('.heif');
};
