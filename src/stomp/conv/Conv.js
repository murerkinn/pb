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
 * @fileoverview Conv pedal.
 */

import Box from "../box/Box";
import ConvModel from "./ConvModel";
import Pot from "../../pot/pot/Pot";

/**
 * Conv pedal.
 * 
 * @extends {Box}
 */
class Conv extends Box {

    /**
     * 
     * @param {AudioContext} context Audio context the pedal will operate on.
     */
    constructor(context) {
        super(context);

        /**
         * @override
         */
        this.name = 'convo';

        /**
         * @type {number} The gain multiplier for the level pot. Some IR responses are too high on volume and they need
         * to be tamed.
         */
        this.gainMultiplier = 1;
    }

    /**
     * @override
     */
    createPots() {
        this.volumePot = new Pot(this.model.convGain.gain, 'effect', this.gainMultiplier);
        this.pots = [].concat(this.volumePot);
    }
}

Conv.prototype.modelClass = ConvModel;

export default Conv;