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
 * @fileoverview Cabinet pedal. This pedal simulates amp cabinets.
 */

import CabinetModel from "./CabinetModel";
import Conv from "../conv/Conv";

/**
 * Cabinet Pedal.
 * 
 * @extends {Conv}
 */
class Cabinet extends Conv {
    /**
     * 
     * @param {AudioContext} context Audio context the pedal will work on.
     */
    constructor(context) {
        super(context);

        this.volumePot.setValue(1);

        /**
         * @override
         */
        this.modelClass = CabinetModel;

        /**
         * @override
         */
        this.name = 'cabinet';

        /**
         * @override
         */
        this.gainMultiplier = 10;
    }
}

export default Cabinet;