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
 * @fileoverview Reverb pedal.
 */

import ReverbModel from "./ReverbModel";
import Conv from "../conv/Conv";

/**
 * Reverb pedal.
 *
 * @extends {Conv}
 */
class Reverb extends Conv {
    /**
     * 
     * @param {AudioContext} context Audio context the pedal will work on.
     */
    constructor(context) {
        super(context);
        /**
         * @override
         */
        this.modelClass = ReverbModel;

        /**
         * @override
         */
        this.name = 'reverb';

        /**
         * @override
         */
        this.gainMultiplier = 1;
    }
}

export default Reverb;