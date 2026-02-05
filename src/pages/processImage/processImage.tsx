import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fileToImageData } from "../../services/fileToImageData";
import { loadOpenCV } from "../../services/cvLoader";

type LocationState = {
    image: File;
}

export default function ProcessImage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const image = state?.image;

    // State
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [cvReady, setCvReady] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Initial Load Logic
    useEffect(() => {
        if (!image) {
            setError("⚠️ No image selected, Redirecting to upload page in 3 seconds...")
            const timer = setTimeout(() => {
                navigate("/takeImages");
            }, 3000);
            return () => clearTimeout(timer);
        }

        async function init() {
            try {
                // 1. Run both heavy tasks in parallel
                const [convertedData, _] = await Promise.all([
                    fileToImageData(image),
                    loadOpenCV() // Ensure this resolves when CV is ready
                ]);

                setImageData(convertedData);
                setCvReady(true);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setError("Failed to process image or loading opencv: " + err.message);
                setLoading(false);
            }
        };

        init();
    }, [image, navigate]);

    // Processing Logic (Runs once everything is ready)
    useEffect(() => {
        if (cvReady && imageData) {
            console.log("CV Ready & Image Loaded -- Starting Processing");

            try {
                // TODO: Your OpenCV processing logic goes here
                // const mat = cv.matFromImageData(imageData);
                // ...
            } catch (e) {
                console.error(e);
            }
        }
    }, [cvReady, imageData]);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-amber-50">
                <p className="text-4xl font-bold text-amber-900 mb-4">⚠️</p>
                <p className="text-amber-700 text-center">{error}</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading OpenCV & Processing Image...</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            {/* If you want to show the result, you probably need a canvas */}
            {imageData && <p>Processing Complete (Image Size: {imageData.width}x{imageData.height})</p>}
        </div>
    )
}