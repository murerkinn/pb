// Copyright 2020 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview Library module for helper functions.
 */

/**
 * Converts a color from RGB to hex representation.
 * @param {number} r Amount of red, int between 0 and 255.
 * @param {number} g Amount of green, int between 0 and 255.
 * @param {number} b Amount of blue, int between 0 and 255.
 * @return {string} hex representation of the color.
 */
const rgbToHex = function(r, g, b) {
    r = Number(r);
    g = Number(g);
    b = Number(b);
    if (r != (r & 255) || g != (g & 255) || b != (b & 255)) {
      throw Error(`(${r}, ${g}, ${b}) is not a valid RGB color`);
    }
    var rgb = (r << 16) | (g << 8) | b;
    if (r < 0x10) {
      return `#${(0x1000000 | rgb).toString(16).substr(1)}`;
    }
    return `#${rgb.toString(16)}`;
  };

/**
 * Converts a color from RGB to hex representation.
 * @param {goog.color.Rgb} rgb rgb representation of the color.
 * @return {string} hex representation of the color.
 */
const rgbArrayToHex = function(rgb) {
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * 
 * @param {*} hex hex code of the color to convert.
 */
const hexToRgb = function(hex) {
    // hex = normalizeHex(hex);
    let rgb = parseInt(hex.substr(1), 16);
    let r = rgb >> 16;
    let g = (rgb >> 8) & 255;
    let b = rgb & 255;

    return [r, g, b];
}

/**
 * Converts a hex representation of a color to HSL.
 * @param {*} hex hex code of the color to convert
 * @return hsl representation of the color.
 */
const hexToHsl = function(hex) {
    let rgb = hexToRgb(hex);
    return rgbToHsl(rgb[0], rgb[1], rgb[2]);
}

/**
 * 
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 */
const rgbToHsl = function(r, g, b) {
    // First must normalize r, g, b to be between 0 and 1.
    const normR = r / 255;
    const normG = g / 255;
    const normB = b / 255;
    const max = Math.max(normR, normG, normB);
    const min = Math.min(normR, normG, normB); 
    var h = 0;
    var s = 0;

    // Luminosity is the average of the max and min rgb color intensities.
    var l = 0.5 * (max + min);

    // The hue and saturation are dependent on which color intensity is the max.
    // If max and min are equal, the color is gray and h and s should be 0.
    if(max != min) {
        if(max == normR) {
            h = 60 * (normG - normB) / (max - min);
        } else if(max == normG) {
            h = 60 * (normB - normR) / (max - min) + 120;
        } else if(max == normB) {
            h = 60 * (normR - normG) / (max - min) + 240;
        }

        if(0 < l && l <= 0.5) {
            s = (max - min) / (2 * l);
        } else {
            s = (max - min) / (2 - 2 * l);
        }
    }

    // Make sure the hue falls between 0 and 360.
    return [Math.round(h + 360) % 360, s, l];
}

/**
 * Blend two colors together, using the specified factor to indicate the weight
 * given to the first color
 * @param {goog.color.Rgb} rgb1 First color represented in rgb.
 * @param {goog.color.Rgb} rgb2 Second color represented in rgb.
 * @param {number} factor The weight to be given to rgb1 over rgb2. Values
 *     should be in the range [0, 1]. If less than 0, factor will be set to 0.
 *     If greater than 1, factor will be set to 1.
 * @return {!goog.color.Rgb} Combined color represented in rgb.
 */
const blend = function(rgb1, rgb2, factor) {
    factor = clamp(factor, 0, 1);
  
    return [
      Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])),
      Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])),
      Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]))
    ];
  };

/**
 * Adds black to the specified color, darkening it
 * @param {goog.color.Rgb} rgb rgb representation of the color.
 * @param {number} factor Number in the range [0, 1]. 0 will do nothing, while
 *     1 will return black. If less than 0, factor will be set to 0. If greater
 *     than 1, factor will be set to 1.
 * @return {!goog.color.Rgb} Combined rgb color.
 */
const darken = function(rgb, factor) {
    var black = [0, 0, 0];
    return blend(black, rgb, factor);
};

const color = {
    rgbToHex,
    rgbArrayToHex,
    hexToRgb,
    hexToHsl,
    rgbToHsl,
    blend,
    darken,
}
export default color;