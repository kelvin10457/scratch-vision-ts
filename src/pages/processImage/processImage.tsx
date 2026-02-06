import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//this is for converting the file object to a imageData object
import { fileToImageData } from "../../services/fileToImageData";
//this ensure opencv is loaded
import { loadOpenCV } from "../../services/cvLoader";

//this module is for normalizing the image, correcting brightness
import { loadImage, brightnessCorrection } from "./logic/normalization";

//this module is mainly for the segmentation of the blocks in image
import { getForegroundMask, clusterByColor } from "./logic/segmentation";

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

        //this setup the tools for starting working with the image
        init();
    }, [image, navigate]);

    // Processing Logic (Runs once everything is ready)
    useEffect(() => {
        if (cvReady && imageData) {

            //all variables declared as any are something related to opencv (Mat objects mostly)
            //they're declared as any because it was written in js and ts does not understand that
            let bgrImage: any, labImage: any, hsvImage: any;

            let labBrightnessCorrected: any, bgrBrightnessCorrected: any, hsvBrightnessCorrected: any;

            let foregroundMask: any; //boolean mask but with 255 in true

            try {
                //preprocessing
                [bgrImage, labImage, hsvImage] = loadImage(imageData, [cv.COLOR_BGR2Lab, cv.COLOR_BGR2HSV]);
                labBrightnessCorrected = brightnessCorrection(labImage);
                bgrBrightnessCorrected = new cv.Mat();
                hsvBrightnessCorrected = new cv.Mat();

                //cv.cvtColor(source,destination,constant to decide the change)
                cv.cvtColor(labBrightnessCorrected, bgrBrightnessCorrected, cv.COLOR_Lab2BGR);
                cv.cvtColor(bgrBrightnessCorrected, hsvBrightnessCorrected, cv.COLOR_BGR2HSV);

                //clustering
                foregroundMask = getForegroundMask(hsvBrightnessCorrected);


            } catch (e) {
                console.error(e);
            }
            finally {
                //clean up beacuse there is no garbage collector and the finally is always runned
                //even if there is errors
                if (bgrImage) bgrImage.delete();
                if (labImage) labImage.delete();
                if (hsvImage) hsvImage.delete();

                if (labBrightnessCorrected) labBrightnessCorrected.delete();
                if (bgrBrightnessCorrected) bgrBrightnessCorrected.delete();
                if (hsvBrightnessCorrected) hsvBrightnessCorrected.delete();

                if (foregroundMask) foregroundMask.delete();

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