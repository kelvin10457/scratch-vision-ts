// Use a module-level variable to track the loading state
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadOpenCV(): Promise<void> {
    // 1. If it's already loaded, don't do anything
    if (isLoaded || (window.cv && window.cv.Mat)) {
        isLoaded = true;
        return Promise.resolve();
    }

    // 2. If a loading attempt is already in progress, return the existing promise
    if (loadPromise) {
        return loadPromise;
    }

    // 3. Start a new loading process
    loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.id = 'opencv-script';
        script.src = '/js/opencv.js'; // Ensure this matches your public folder path
        script.async = true;

        script.onload = () => {
            // OpenCV.js is special: the script loads, then the Wasm runtime initializes.
            // We must wait for 'onRuntimeInitialized'.
            if (window.cv && window.cv.onRuntimeInitialized) {
                window.cv.onRuntimeInitialized = () => {
                    isLoaded = true;
                    resolve();
                };
            } else if (window.cv && window.cv.Mat) {
                // Fallback if it somehow initialized instantly
                isLoaded = true;
                resolve();
            }
        };

        script.onerror = () => {
            loadPromise = null; // Reset so user can try to reload
            reject(new Error("Failed to load the OpenCV.js script. Check your network or file path."));
        };

        document.body.appendChild(script);
    });

    return loadPromise;
}