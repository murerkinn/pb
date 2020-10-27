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
 * @fileoverview Base pot component.
 */

import LinearModel from "./LinearModel";
import Pot from "../pot/Pot";


/**
 * Linear pot component models a linear potentiometer.
 *
 * @extends {Pot}
 */
export default class Linear extends Pot {
    /**
     * 
     * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc. If more complex
     *     calculation is desired, one can pass a callback function which will be triggered each time the value of this pot
     *     changes.
     * @param {string} name Name of the pot. Will be written under it.
     * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
     *                       thousands.
     * @param {string=} opt_size Size of the pot. Might be one of the values in pb.pot.Pot.Size enum. Default is REGULAR.
     *     This size is added to the pot's class names for easier styling.
     * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
     * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
     * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
     */
    constructor(param, name, multiplier, opt_size, opt_min, opt_max, opt_default) {
        super(param, name, multiplier, opt_size, opt_min, opt_max, opt_default);
        this.modelClass = LinearModel;
    }
}