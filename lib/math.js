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
 * @fileoverview Library module for math functions.
 */

class Coordinate {
    constructor(opt_x, opt_y) {
        /**
         * X-value
         * @type {number}
         */
        this.x = (opt_x !== undefined) ? opt_x : 0;
    
        /**
         * Y-value
         * @type {number}
         */
        this.y = (opt_y !== undefined) ? opt_y : 0;
    }
};

/**
 * Returns the last element in an array without removing it.
 * @param {IArrayLike<T>|string} array The array.
 * @return {T} Last item in array.
 * @template T
 */
const peek = (array) => {
    return array[array.length - 1];
}

/**
 * Performs linear interpolation between values a and b. Returns the value
 * between a and b proportional to x (when x is between 0 and 1. When x is
 * outside this range, the return value is a linear extrapolation).
 * @param {number} a A number.
 * @param {number} b A number.
 * @param {number} x The proportion between a and b.
 * @return {number} The interpolated value between a and b.
 */
const lerp = (a, b, x) => {
    return a + x * (b - a);
};

/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export default {
    Coordinate: Coordinate,
    peek: peek,
    lerp: lerp,
    clamp: clamp
}