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
 * @fileoverview Library module for color functions.
 */

const names = {
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'aqua': '#00ffff',
    'aquamarine': '#7fffd4',
    'azure': '#f0ffff',
    'beige': '#f5f5dc',
    'bisque': '#ffe4c4',
    'black': '#000000',
    'blanchedalmond': '#ffebcd',
    'blue': '#0000ff',
    'blueviolet': '#8a2be2',
    'brown': '#a52a2a',
    'burlywood': '#deb887',
    'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00',
    'chocolate': '#d2691e',
    'coral': '#ff7f50',
    'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc',
    'crimson': '#dc143c',
    'cyan': '#00ffff',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b',
    'darkgray': '#a9a9a9',
    'darkgreen': '#006400',
    'darkgrey': '#a9a9a9',
    'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f',
    'darkorange': '#ff8c00',
    'darkorchid': '#9932cc',
    'darkred': '#8b0000',
    'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f',
    'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f',
    'darkslategrey': '#2f4f4f',
    'darkturquoise': '#00ced1',
    'darkviolet': '#9400d3',
    'deeppink': '#ff1493',
    'deepskyblue': '#00bfff',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'dodgerblue': '#1e90ff',
    'firebrick': '#b22222',
    'floralwhite': '#fffaf0',
    'forestgreen': '#228b22',
    'fuchsia': '#ff00ff',
    'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff',
    'gold': '#ffd700',
    'goldenrod': '#daa520',
    'gray': '#808080',
    'green': '#008000',
    'greenyellow': '#adff2f',
    'grey': '#808080',
    'honeydew': '#f0fff0',
    'hotpink': '#ff69b4',
    'indianred': '#cd5c5c',
    'indigo': '#4b0082',
    'ivory': '#fffff0',
    'khaki': '#f0e68c',
    'lavender': '#e6e6fa',
    'lavenderblush': '#fff0f5',
    'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd',
    'lightblue': '#add8e6',
    'lightcoral': '#f08080',
    'lightcyan': '#e0ffff',
    'lightgoldenrodyellow': '#fafad2',
    'lightgray': '#d3d3d3',
    'lightgreen': '#90ee90',
    'lightgrey': '#d3d3d3',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'lightsteelblue': '#b0c4de',
    'lightyellow': '#ffffe0',
    'lime': '#00ff00',
    'limegreen': '#32cd32',
    'linen': '#faf0e6',
    'magenta': '#ff00ff',
    'maroon': '#800000',
    'mediumaquamarine': '#66cdaa',
    'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3',
    'mediumpurple': '#9370db',
    'mediumseagreen': '#3cb371',
    'mediumslateblue': '#7b68ee',
    'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585',
    'midnightblue': '#191970',
    'mintcream': '#f5fffa',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'navy': '#000080',
    'oldlace': '#fdf5e6',
    'olive': '#808000',
    'olivedrab': '#6b8e23',
    'orange': '#ffa500',
    'orangered': '#ff4500',
    'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa',
    'palegreen': '#98fb98',
    'paleturquoise': '#afeeee',
    'palevioletred': '#db7093',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'peru': '#cd853f',
    'pink': '#ffc0cb',
    'plum': '#dda0dd',
    'powderblue': '#b0e0e6',
    'purple': '#800080',
    'red': '#ff0000',
    'rosybrown': '#bc8f8f',
    'royalblue': '#4169e1',
    'saddlebrown': '#8b4513',
    'salmon': '#fa8072',
    'sandybrown': '#f4a460',
    'seagreen': '#2e8b57',
    'seashell': '#fff5ee',
    'sienna': '#a0522d',
    'silver': '#c0c0c0',
    'skyblue': '#87ceeb',
    'slateblue': '#6a5acd',
    'slategray': '#708090',
    'slategrey': '#708090',
    'snow': '#fffafa',
    'springgreen': '#00ff7f',
    'steelblue': '#4682b4',
    'tan': '#d2b48c',
    'teal': '#008080',
    'thistle': '#d8bfd8',
    'tomato': '#ff6347',
    'turquoise': '#40e0d0',
    'violet': '#ee82ee',
    'wheat': '#f5deb3',
    'white': '#ffffff',
    'whitesmoke': '#f5f5f5',
    'yellow': '#ffff00',
    'yellowgreen': '#9acd32'
};

const hexTripletRe = /#(.)(.)(.)/;
const validHexColorRe = /^#(?:[0-9a-f]{3}){1,2}$/i;

const rgbColorRe = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;

const isValidRgbColor = (str) => {
    // Each component is separate (rather than using a repeater) so we can
    // capture the match. Also, we explicitly set each component to be either 0,
    // or start with a non-zero, to prevent octal numbers from slipping through.
    var regExpResultArray = str.match(rgbColorRe);
    if (regExpResultArray) {
      const r = Number(regExpResultArray[1]);
      const g = Number(regExpResultArray[2]);
      const b = Number(regExpResultArray[3]);
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        return [r, g, b];
      }
    }
    return [];
  };

/**
 * Checks if a string is a valid hex color.  We expect strings of the format
 * #RRGGBB (ex: #1b3d5f) or #RGB (ex: #3CA == #33CCAA).
 * @param {string} str String to check.
 * @return {boolean} Whether the string is a valid hex color.
 * @private
 */
const isValidHexColor = (str) => {
    return validHexColorRe.test(str);
};

/**
 * Normalize an hex representation of a color
 * @param {string} hexColor an hex color string.
 * @return {string} hex color in the format '#rrggbb' with all lowercase
 *     literals.
 */
const normalizeHex = (hexColor) => {
    if (!isValidHexColor(hexColor))
      throw Error(`${hexColor}' is not a valid hex color`);

    if (hexColor.length == 4)  // of the form #RGB
      hexColor = hexColor.replace(hexTripletRe, '#$1$1$2$2$3$3');

    return hexColor.toLowerCase();
};

/**
 * Takes a string a prepends a '#' sign if one doesn't exist.
 * Small helper method for use by goog.color and friends.
 * @param {string} str String to check.
 * @return {string} The value passed in, prepended with a '#' if it didn't
 *     already have one.
 */
const prependHashIfNecessaryHelper = (str) => {
    return str.charAt(0) == '#' ? str : '#' + str;
};

/**
 * Parses a color out of a string.
 * @param {string} str Color in some format.
 * @return {{hex: string, type: string}} 'hex' is a string containing a hex
 *     representation of the color, 'type' is a string containing the type
 *     of color format passed in ('hex', 'rgb', 'named').
 */
const parse = (str) => {
    var result = {};
    str = String(str);
  
    var maybeHex = prependHashIfNecessaryHelper(str);

    if (isValidHexColor_(maybeHex)) {
      result.hex = normalizeHex(maybeHex);
      result.type = 'hex';
      return result;
    } else {
      var rgb = isValidRgbColor(str);

      if (rgb.length) {
        result.hex = rgbArrayToHex(rgb);
        result.type = 'rgb';
        return result;
      } else if (names) {
        var hex = names[str.toLowerCase()];
        if (hex) {
          result.hex = hex;
          result.type = 'named';
          return result;
        }
      }
    }
    throw Error(`${str} is not a valid color string`);
  };

/**
 * Converts a color from RGB to hex representation.
 * @param {number} r Amount of red, int between 0 and 255.
 * @param {number} g Amount of green, int between 0 and 255.
 * @param {number} b Amount of blue, int between 0 and 255.
 * @return {string} hex representation of the color.
 */
const rgbToHex = (r, g, b) => {
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
 * @param {Array} rgb rgb representation of the color.
 * @return {string} hex representation of the color.
 */
const rgbArrayToHex = (rgb) => {
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * Converts a hex representation of a color to RGB.
 * @param {string} hexColor Color to convert.
 * @return {Array} rgb representation of the color.
 */
const hexToRgb = (hex) => {
    // hex = normalizeHex(hex);
    let rgb = parseInt(hex.substr(1), 16);
    let r = rgb >> 16;
    let g = (rgb >> 8) & 255;
    let b = rgb & 255;

    return [r, g, b];
}

/**
 * Converts a hex representation of a color to HSL.
 * @param {string} hex Color to convert.
 * @return {Array} hsl representation of the color.
 */
const hexToHsl = (hex) => {
    let rgb = hexToRgb(hex);
    return rgbToHsl(rgb[0], rgb[1], rgb[2]);
}

/**
 * Converts a color from RGB color space to HSL color space.
 * Modified from {@link http://en.wikipedia.org/wiki/HLS_color_space}.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @return {!Array} hsl representation of the color.
 */
const rgbToHsl = (r, g, b) => {
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
 * @param {Array} rgb1 First color represented in rgb.
 * @param {Array} rgb2 Second color represented in rgb.
 * @param {number} factor The weight to be given to rgb1 over rgb2. Values
 *     should be in the range [0, 1]. If less than 0, factor will be set to 0.
 *     If greater than 1, factor will be set to 1.
 * @return {!Array} Combined color represented in rgb.
 */
const blend = (rgb1, rgb2, factor) => {
    factor = clamp(factor, 0, 1);
  
    return [
      Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])),
      Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])),
      Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]))
    ];
  };

/**
 * Adds black to the specified color, darkening it
 * @param {Array} rgb rgb representation of the color.
 * @param {number} factor Number in the range [0, 1]. 0 will do nothing, while
 *     1 will return black. If less than 0, factor will be set to 0. If greater
 *     than 1, factor will be set to 1.
 * @return {!Array} Combined rgb color.
 */
const darken = (rgb, factor) => {
    var black = [0, 0, 0];
    return blend(black, rgb, factor);
};

export default {
    names: names,
    hexTripletRe: hexTripletRe,
    validHexColorRe: validHexColorRe,
    rgbColorRe: rgbColorRe,
    isValidRgbColor: isValidRgbColor,
    isValidHexColor: isValidHexColor,
    normalizeHex: normalizeHex,
    prependHashIfNecessaryHelper: prependHashIfNecessaryHelper,
    parse: parse,
    rgbToHex: rgbToHex,
    rgbArrayToHex: rgbArrayToHex,
    hexToRgb: hexToRgb,
    hexToHsl: hexToHsl,
    rgbToHsl: rgbToHsl,
    blend: blend,
    darken: darken,
}