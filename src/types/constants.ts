/*
Color Calibration (The most critical part)
These are pre-calculated centroids in the CIELAB 'a' and 'b' color space.
They act as the "fingerprint" for each block color.
Shape: (7 colors, 2 channels [a, b])
*/
export const flashColors = [
    [161.38347, 77.89536],            // blue
    [129.3896, 178.28639],            // yellow
    [180.56088, 124.881424],            // pink
    [129.98366, 132.04521],            // background
    [131.7454, 96.85115],            // sky
    [169.68044, 161.4705],            // red
    [162.77925, 178.34721]             // orange
];


export const standardSizes = {
    "blue": [126, 122],
    //"yellow": ((140, 122),(126,122) ),
    "yellow": [140, 122],
    "pink": [126, 122],
    "sky": [102, 58],
    "red": [142, 122],
    "orange": [[111, 152], [184, 152]]
}

export const overlaps = {
    "blue": [17.5, 0]
}