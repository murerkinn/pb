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
 * @fileoverview ShadowMaker for pb.
 */

import color from "../lib/color";

/**
 * Casts shadows on a box element.
 *
 * @param {Element} element Element to cast my shadows upon.
 * @param {number} length Length of the shadow.
 * @param {number} darkness How dark the shadow will be.
 * @param {number} weight How vast the shadow will be.
 * @param {Array.<string>=} opt_before Any shadows to cast before mine.
 * @param {Array.<string>=} opt_after Any shadows to cast after mine.
 */
export function shadowMaker(element, length, darkness, weight, opt_before, opt_after) {
    opt_before = opt_before || [];
    opt_after = opt_after || [];

    let elStyle = document.defaultView.getComputedStyle(element, null);
    let colorText = elStyle.getPropertyValue('background-color');
    let hslArray = color.hexToHsl(goog.color.parse(colorText).hex);

    darkness = darkness || 1;

    hslArray[2] = hslArray[2] * darkness;

    /**
     * Returns a shadow declaration.
     * 
     * @param {number} x X distance.
     * @param {number} y Y distance.
     * @param {number} blur Blur amount.
     * @param {number} a Alpha.
     * @param {number} opt_d Density.
     * @return {string} The shadow CSS declaration.
     */
    let shadowTemplate = function(x, y, blur, a, opt_d) {
        opt_d = opt_d || 0;
        let d = `${opt_d}px`;
        return `${x}px ${y}px ${blur}px ${d} hsl(${hslArray[0]}, ${hslArray[1]*100}%, ${a}%)`;
    };

    // let all = '';
    let shadows = [];
    let xAngle = (window.innerWidth / 2 - goog.style.getPageOffset(element).x - element.offsetWidth / 2) / 30;
    let yAngle = (window.innerHeight - goog.style.getPageOffset(element).y - element.offsetHeight / 2) / 80;
    let yConDist = yAngle * length / 10;

    let con = length;

    while(length--) {
        let xDist = xAngle * length / con;
        let yDist = yConDist * length * 2 / con; //yAngle * Math.sqrt(length) * length / con;
    
        shadows.push(
            shadowTemplate(
                xDist,
                yDist,
                0,
                hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6
            )
        );
    }

    shadows.splice(0, 0,
        shadowTemplate(xAngle, yConDist * 2, con * 4, 0, 0),
        //shadowTemplate(xAngle / weight, yConDist * 2, con / 2, 0,  con / 4 / weight),
        shadowTemplate(xAngle / weight / 8, yConDist * 3, con * 4, 30, con / 12),
        shadowTemplate(xAngle / weight / 8, yConDist * 2, con, 0, con / 4 / weight),
        shadowTemplate(xAngle / weight / 8, yConDist * 2.55, con * 2, 5, con / 3 / weight)
    );

    shadows = [].concat(opt_before, shadows.reverse(), opt_after);
    element.style['boxShadow'] = shadows.join(', ');
    element.style['left'] = `-${xAngle/2}px`;
}

/**
 * Casts shadows on a text element.
 *
 * @param {Element} element Element to cast my shadows upon.
 * @param {number} length Length of the shadow.
 * @param {Array.<string>} before Any shadows to cast before mine.
 * @param {Array.<string>} after Any shadows to cast after mine.
 * @param {boolean} invertY Whether I should invert the Y axis and casts shadows up instead of down.
 * @param {number} invertX How I may invert the X axis.
 */
export function textShadowMaker(element, length, before, after, invertY, invertX) {
    before = before || [];
    after = after || [];
    let elStyle = document.defaultView.getComputedStyle(element, null);
    let colorText = elStyle.getPropertyValue('color');
    let hslArray = color.hexToHsl(goog.color.parse(colorText).hex);

    /**
     * Returns a shadow declaration.
     *
     * @param {number} x X distance.
     * @param {number} y Y distance.
     * @param {number} blur Blur amount.
     * @param {number} a Alpha.
     * @return {string} The shadow CSS declaration.
     */
    let shadowTemplate = function(x, y, blur, a) {
        return `${x}px ${y}px ${blur}px hsl(${hslArray[0]}, ${hslArray[1]*100}%, ${a}%)`;
    };
    // let all = '';
    let shadows = [];
    let xAngle = (window.innerWidth / 2 - goog.style.getPageOffset(element).x - element.offsetWidth / 2) / 30;
    let yAngle = (window.innerHeight - goog.style.getPageOffset(element).y - element.offsetHeight / 2) / 30;

    let yConDist = yAngle * length / 10;

    let con = length;

    while (length--) {
        let xDist = xAngle * length / con;
        let yDist = yConDist * length * 2 / con; //yAngle * Math.sqrt(length) * length / con;
        if (invertY) yDist = -yDist;
        if (invertX) xDist = -xDist * Math.pow(invertX, 4);
        shadows.push(
            shadowTemplate(
                xDist,
                yDist,
                0,
                hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6
            )
        );
    }
    shadows.splice(0, 0,
        shadowTemplate(xAngle, 0, con * 2, 0),
        shadowTemplate(xAngle, yConDist * 1.8, con / 2, 0),
        shadowTemplate(xAngle, yConDist * 2.5, con * 2, 0));

    shadows = [].concat(before, shadows.reverse(), after);

    element.style.textShadow = shadows.join(', ');
};

export function textShadowMakerDom(element, length) {
    element.style.position = 'absolute';

    let elStyle = document.defaultView.getComputedStyle(element, null);
    let colorText = elStyle.getPropertyValue('color');
    let rgbArray = color.hexToRgb(goog.color.parse(colorText).hex);

    for (let i = 0; i < length; i++) {
        let el = element.cloneNode(true);
        el.style.position = 'absolute';
        el.style.webkitTransform = `translateZ(-${i}px)`;

        el.style.color = color.rgbArrayToHex(color.darken(rgbArray, (i / length * 0.8) + 0.2));
        goog.dom.insertSiblingBefore(el, element);

        if (i == length - 1) {
            el.style.textShadow = '0 0 10px black,0 0 20px black,0 0 30px black,0 0 40px black,0 0 50px black';
        }
    }
};