// Copyright 2012 Armagan Amcalar. All Rights Reserved.
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
 * @fileoverview Overdrive pedal.
 */

import Box from "../box/Box";
import OverdriveModel from "./OverdriveModel";
import Pot from "../../pot/pot/Pot";
import Log from "../../pot/Log/Log";

/**
 * Overdrive pedal.
 *
 * @extends {Box}
 */
class Overdrive extends Box {
    /**
     * 
     * @param {AudioContext} context Audio context the pedal will work on.
     */
    constructor(context) {
        super(context);
        /**
         * @override
         */
        this.modelClass = OverdriveModel;

        this.drivePot = undefined;
        this.tonePot = undefined;
        

        /**
         * @override
         */
        this.name = 'overdrive';
    }

    /**
     * @override
     */
    createPots() {
        super.createPots();
        let driveHandler = this.model.setDrive.bind(this.model);
        let toneHandler = this.model.setTone.bind(this.model);

        this.drivePot = new Log(driveHandler, 'drive', 2000);
        this.tonePot = new Log(toneHandler, 'tone', 3000, Pot.Size.SMALL);
        this.pots.push(this.drivePot, this.tonePot);
    };


    /**
     * Sets the drive pot.
     *
     * @param {number} newValue New drive value, ranges between 0-10.
     */
    setDrive(newValue) {
        this.drivePot.setValue(newValue);
    };


    /**
     * Sets the tone pot.
     *
     * @param {number} newValue New tone value.
     */
    setTone(newValue) {
        this.tonePot.setValue(newValue);
    };
}

export default Overdrive;