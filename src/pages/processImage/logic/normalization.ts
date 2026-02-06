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
        let transformed = cv.Mat();
        cv.cvtColor(source, transformed, transformation);
        results.push(transformed);
    });

    source.delete();
    return results;
}


export function brightnessCorrection() {

}

