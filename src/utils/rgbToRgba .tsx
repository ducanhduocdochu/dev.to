export const rgbToRgba = (rgb: string, alpha: number): string => {
    const colors = rgb.match(/\d+/g) || [];
    if (colors.length !== 3) {
        throw new Error("Invalid RGB string");
    }
    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${alpha})`;
};


