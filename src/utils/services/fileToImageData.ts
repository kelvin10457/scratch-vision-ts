
export default async function fileToImageData(file: File): Promise<ImageData> {

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            // Example OpenCV usage - USO OPENCV 
            /*try {
                if (typeof cv !== 'undefined' && cv.Mat) {
                    console.log('OpenCV is loaded, processing image...');
                    const src = cv.matFromImageData(imageData);
                    const dst = new cv.Mat();
                    // Convert to grayscale as an example
                    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);

                    // Cleanup - CRITICAL in OpenCV.js
                    src.delete();
                    dst.delete();
                    console.log('OpenCV processing complete and memory freed');
                } else {
                    console.warn('OpenCV not loaded yet, skipping processing');
                }
            } catch (e) {
                console.error('Error using OpenCV:', e);
            }*/

            resolve(imageData);
            URL.revokeObjectURL(img.src);
        };
        img.onerror = (err) => {
            URL.revokeObjectURL(img.src);
            reject(err);
        };
    });
}