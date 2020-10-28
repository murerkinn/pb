// Copyright 2020 Aytekin Hazar İlhan. All Rights Reserved.
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
 * @fileoverview Delay pedal.
 */

import Box from "../box/Box";
import DelayModel from "./DelayModel";
import Log from "../../pot/Log/Log";
import Linear from "../../pot/Linear/Linear";

/**
 * Delay pedal.
 *
 * @extends {Box}
 */
class Delay extends Box {
    /**
     * 
     * @param {AudioContext} context Audio context the pedal will work on.
     */
    constructor(context) {
        super(context);
        /**
         * @override
         */
        this.modelClass = DelayModel;

        this.delayTimerPot = undefined;
        this.feedbackGainPot = undefined;
        

        /**
         * @override
         */
        this.name = 'delay';
    }

    /**
     * @override
     */
    createPots() {
        super.createPots();
        let delayTimeHandler = this.model.setDelayTimer.bind(this.model);
        let feedbackGainHandler = this.model.setFeedbackGain.bind(this.model);

        this.delayTimerPot = new Log(delayTimeHandler, 'delay time', 5);
        this.feedbackGainPot = new Linear(feedbackGainHandler, 'feedback gain', 0.95);
        this.pots.push(this.delayTimerPot, this.feedbackGainPot);
    };


    /**
     * Sets the delay timer pot.
     *
     * @param {number} newTimer New delay timer value in range 0-5 seconds.
     */
    setDelayTimer(newTimer) {
        this.delayTimerPot.setValue(newTimer);
    };


    /**
     * Sets the feedback gain pot.
     *
     * @param {number} newGain New gain value in range 0-0.95.
     */
    setFeedbackGain(newGain) {
        this.feedbackGainPot.setValue(newGain);
    };
}

export default Delay;