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
 * @fileoverview Base pot component model.
 */

import EventEmitter from "erste/src/lib/base/eventemitter3";
import math from "../../../lib/math";

/**
 * @extends {EventEmitter}
 *
 */
class PotModel extends EventEmitter {

    /**
     * 
     * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc.
     * @param {string} name Name of the pot. Will be written under it.
     * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
     *                       thousands.
     * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
     * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
     * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
     */
    constructor(param, name, multiplier, opt_min, opt_max, opt_default) {
        super();

        if(param instanceof Function)
            this.callback = param
        else
            this.param = param;

        this.minValue = opt_min || 0;
        this.maxValue = opt_max || 1;
        this.defaultValue = opt_default || 0.5;

        this.name = name;
        this.multiplier = multiplier;
        this.value = this.minValue;

        this.setValue(this.defaultValue);
    }

    /**
     * Sets the new value for this pot's audio parameter and lets whoever listens hear about it. This method sanitizes
     * the input and calls processValue, which actually sets it as the value of this PotModel. This approach lets
     * subclasses to skip input sanitization and event dispatching.
     *
     * @param {number} newValue New value to be set.
     */
    setValue(newValue) {
        let oldValue = this.value;

        newValue = math.clamp(newValue, 0, 1);
        this.processValue(newValue, oldValue);

        let event = {
            type: PotModel.EventType.VALUE_CHANGED,
            newValue: this.value,
            oldValue
        };

        if (this.param)
            this.param.value = this.value;
        else
            this.callback(this.value, oldValue);

        this.emit(event);
    }

    /**
     * Processes the sanitized input, sets it to value parameter. Generally, this is a function of a value and a multiplier,
     * and maybe the old value.
     *
     * @protected
     * @param {number} newValue The sanitized pot value.
     * @param {number} oldValue The old value of this PotModel.
     */
    processValue(newValue, oldValue) {
        this.value = math.lerp(this.minValue, this.maxValue, newValue) * this.multiplier;
    }

    /**
     * @return {number} The value of this pot's parameter.
     */
    getValue() {
        return this.value;
    }

    /**
     * @return {number} The normalized value of this pot's parameter (as calculated in value / range).
     */
    getNormalizedValue() {
        let rv = this.value / this.multiplier;
        rv = (rv - this.minValue) / (this.maxValue - this.minValue);
        return rv;
    }
}

/**
 *
 * @enum {string}
 */
PotModel.EventType = { VALUE_CHANGED: 'valueChanged'};

export default PotModel;