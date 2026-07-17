/**
 * * Constants for MD3 TextField animations and layout.
 * @see https://m3.material.io/components/text-fields/specs
 */

export const LABEL_SCALE = 0.75;
export const LABEL_SCALE_COMPENSATION_X = (1 - LABEL_SCALE) / 2;

export const LABEL_TRANSLATE_Y_UNPOPULATED = 16;
export const LABEL_TRANSLATE_Y_POPULATED_FILLED = 4;
export const LABEL_TRANSLATE_Y_POPULATED_OUTLINED = -12;

// The horizontal shift required to bypass the leading icon in outlined mode.
// Leading icon area width = icon size (24) + margin (12) = 36.
export const OUTLINED_LEADING_ICON_SHIFT = -36;

// Horizontal padding for the notch (4dp on each side of the label text)
export const NOTCH_PADDING = 8;

// The fixed width of the left outline segment before the notch begins
export const OUTLINED_NOTCH_LEAD_WIDTH = 12;
