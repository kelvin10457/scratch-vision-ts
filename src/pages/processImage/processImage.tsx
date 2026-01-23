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
            navigate("/takeImages");
            return;
        }

        const url = URL.createObjectURL(image);
        setUrl(url);


        //when you return a function on a useEffect it only runs when the component is destroyed
        //or just before the effect runs again, in this way you prevent of having unnecessary 
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [image]);
    return (
        <>
            {url && (
                <img src={url} alt={image.name} className="w-full h-auto rounded-2xl shadow-2xl" />
            )}
        </>
    )
}