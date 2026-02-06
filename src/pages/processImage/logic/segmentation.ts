import { flashColors as listOfClusters } from '../../../types/constants';

/*
def foreground_mask(img_hsv, threshold =70):
    """
    Creates a binary mask for the foreground based on Saturation (S) in HSV.
    Colored blocks usually have higher saturation than the white/gray background.
    """
    _, img_s, _= cv2.split(img_hsv)
    img_mask = (img_s > threshold)
    return img_mask

foreground = foreground_mask(img_hsv_bc)
*/
export function getForegroundMask(hsvImageWithBrightnessCorrected: any, treshold = 70) {
    let chanels = cv.MatVector();
    cv.split(hsvImageWithBrightnessCorrected, chanels);

    let saturation = chanels.get(1);
    console.log(saturation);

    let foregroundMask = new cv.Mat();

    //this makes the boolen mask 0, where the treshold is < 70 otherwise 255
    cv.treshold(
        saturation,
        foregroundMask,
        treshold,
        255,
        cv.THRESH_BINARY
    );


    //cleanup
    chanels.delete();
    saturation.delete();

    return foregroundMask;
}
/*
def assign_to_custom_centers(X, centers):
    """
    Assign each sample in X to the nearest of the given centers.

    Parameters
    ----------
    X : np.ndarray, shape (n_samples, n_features)
        Data points.
    centers : np.ndarray, shape (k, n_features)
        Fixed cluster centers.

    Returns
    -------
    labels : np.ndarray, shape (n_samples,)
        Index of the nearest center for each sample.
    distances : np.ndarray, shape (n_samples,)
        Distance to the assigned center for each sample.
    """
    X = np.asarray(X)
    centers = np.asarray(centers)

    if X.ndim != 2 or centers.ndim != 2:
        raise ValueError("X and centers must be 2D arrays (n_samples, n_features).")
    if X.shape[1] != centers.shape[1]:
        raise ValueError("X and centers must have the same number of features.")

    # Compute squared distances from every point to every center
    # Shape: (n_samples, n_centers)
    diff = X[:, None, :] - centers[None, :, :]
    dist_sq = np.sum(diff**2, axis=2)

    # For each sample, pick the center with minimum distance
    labels = np.argmin(dist_sq, axis=1)
    distances = np.sqrt(np.min(dist_sq, axis=1))

    return labels, distances

labels, _= assign_to_custom_centers(kmeans_input, cluster_list)
*/
function assignToCustomCenters() {

}
/*
def clusterize_by_color (img_lab_bc, cluster_list):
    """
    Segments the image by assigning each pixel to the nearest color center (closest cluster).
    Uses the 'a' and 'b' channels of LAB color space, effectively ignoring Lightness (since we flattened it).
    
    Args:
        img_lab_bc: Brightness-corrected LAB image.
        cluster_list: List of expected color centers (centroids).
    """
    _, img_a, img_b = cv2.split(img_lab_bc)
    # Flatten the image to (N, 2) array of a,b values
    kmeans_input = np.vstack((img_a.flatten(), img_b.flatten())).T.astype(np.float32)
    #  kmeans_input = random_sample_xy(kmeans_input, samples = 1000)
    
    # Assign every pixel to the closest predefined color center
    labels, _= assign_to_custom_centers(kmeans_input, cluster_list)
    
    # Reshape back to image dimensions
    img_clustered = labels.reshape(img_a.shape)
    return img_clustered

img_clustered = clusterize_by_color(img_lab_bc, flash_colors)
*/

export function clusterByColor(labImageWithBrightnessCorrected: any) {
    let chanels = new cv.MatVector();
    let a = new cv.Mat();
    let b = new cv.Mat();
    cv.split(labImageWithBrightnessCorrected, chanels);

    a = chanels.get(0);
    b = chanels.get(1);

}

export function getMaskByCluster() {

}

export function processMasks() {

}