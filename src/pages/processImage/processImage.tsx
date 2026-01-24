import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//just for getting autocomplete and safety
type LocationState = {
    image: File;
}
export default function ProcessImage() {
    const location = useLocation();
    const navigate = useNavigate();

    //the file is actually a image as an File object
    const [url, setUrl] = useState<string | null>(null);

    const state = location.state as LocationState;
    const image = state?.image;

    useEffect(() => {
        if (!image) {
            const timer = setTimeout(() => {
                navigate("/takeImages");
            }, 3000);
            return () => clearTimeout(timer);
        }

        const url = URL.createObjectURL(image);
        setUrl(url);

        // Cleanup
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [image]);

    if (!image) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-amber-50">
                <p className="text-2xl font-bold text-amber-900 mb-4">⚠️ No image selected</p>
                <p className="text-amber-700">Redirecting to upload page in 3 seconds...</p>
            </div>
        )
    }

    return (
        <>
            {url && (
                <img src={url} alt={image.name} className="w-full h-full object-contain p-2" />
            )}
        </>
    )
}