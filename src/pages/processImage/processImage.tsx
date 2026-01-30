import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//function to convert the file object to image data to work it as a Mat object from cv
import fileToImageData from "../../utils/services/fileToImageData";

//just for getting autocomplete and safety
type LocationState = {
    image: File;
}

export default function ProcessImage() {
    const location = useLocation();
    const navigate = useNavigate();

    //the file is actually a image as an File object
    const [imageData, setImageData] = useState<ImageData | null>(null);

    const state = location.state as LocationState;
    const image = state?.image;

    //this is for cleaning up and creating a url object for the image
    useEffect(() => {
        if (!image) {
            const timer = setTimeout(() => {
                navigate("/takeImages");
            }, 3000);
            return () => clearTimeout(timer);
        }

        fileToImageData(image).then(setImageData).catch(console.error);

    }, [image]);

    useEffect(() => {
        if (imageData) {
            console.log("Image Data processed:", imageData);
        }
    }, [imageData]);


    //this is for people that try to get at this page without an image uploaded
    if (!image) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-amber-50">
                <p className="text-2xl font-bold text-amber-900 mb-4">⚠️ No image selected</p>
                <p className="text-amber-700">Redirecting to upload page in 3 seconds...</p>
            </div>
        )
    }

    //this should return the canvas with the cat moving.
    return (
        <>
            {imageData && (
                <p>there is image data</p>
            )}
        </>
    )
}