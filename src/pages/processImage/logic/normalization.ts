/*
def load_image(img_path, color_transformations = [], scale=1.0):
    """
    Loads an image from the specified path, optionally resizes it, and applies color conversions.

    Parameters:
    - img_path (str): Path to the image file.
    - color_transformations (list): List of OpenCV color conversion codes (e.g., cv2.COLOR_BGR2Lab).
    - scale (float): Scaling factor for resizing the image. Default is 1.0 (no scaling).

    Returns:
    - tuple: The original (possibly resized) image followed by the transformed images.
    """
    img = cv2.imread(img_path)
    if scale != 1:
        img = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
    img_transformations = [cv2.cvtColor(img, color_trans) for color_trans in color_transformations]
    return img, *img_transformations
*/

/**
 * Processes an ImageData object: resizes it and applies color transformations.
 * Note: ImageData is always RGBA.
 */
export function loadImage(imageData: ImageData, listOfTransformations: number[], scale = 1.0) {
    let source = cv.matFromImageData(imageData);
    let results: any[] = [];

    //resize if needed
    if (scale !== 1.0) {
        let destination = new cv.Mat(); // empty mat
        let desiredSize = new cv.Size(0, 0); // the size to resize
        cv.resize(source, destination, desiredSize, scale, scale, cv.INTER_AREA); //
        source.delete(); // this empty the source bc we need to put the possibly new resized source 
        source = destination;
    }
    //rgba to bgr bc for default browser uses rgba
    let bgr = new cv.Mat();
    cv.cvtColor(source, bgr, cv.COLOR_RGBA2BGR);
    results.push(bgr);

    listOfTransformations.forEach((transformation) => {
        let transformed = new cv.Mat();
        // Use bgr as source because most OpenCV color codes (like BGR2HSV) expect BGR
        cv.cvtColor(bgr, transformed, transformation);
        results.push(transformed);
    });

    source.delete();
    return results;
}
/*
def brigthness_correction(img_lab):
    """
    Normalizes the brightness of an image by setting the L channel to a constant value.

    Parameters:
    - img_lab (numpy.ndarray): Image in CIELAB color space.

    Returns:
    - numpy.ndarray: The brightness-corrected image.
    """
    img_l, img_a, img_b =cv2.split(img_lab)
    img_l[:,:] = 150
    img_lab = cv2.merge((img_l, img_a, img_b))
    return img_lab
*/
//everything related with open cv is an any object because is written 
//in js so there is no types
export function brightnessCorrection(labImage: any): any {
    let channels = new cv.MatVector();
    //this copies the splitted parts of labImage in channels (cv.MatVector object)
    cv.split(labImage, channels);

    // We only need to modify the L channel (index 0)
    let l = channels.get(0);
    l.setTo(new cv.Scalar(150));

    let result = new cv.Mat();

    // Merge requires the vector of channels
    cv.merge(channels, result);

    l.delete();
    channels.delete();


    return result;
}

