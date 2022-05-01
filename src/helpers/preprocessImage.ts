export function preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0,0,canvas.width, canvas.height);
    thresholdFilter(image.data, 0.5);
    return image;
}

function thresholdFilter(pixels, level) {
    if (level === undefined) {
        level = 0.5;
    }
    const thresh = Math.floor(level * 255);
    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        let value;
        if (gray >= thresh) {
            value = 255;
        } else {
            value = 0;
        }
        pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
    }
}

