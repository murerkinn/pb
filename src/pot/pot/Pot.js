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

import PotModel from "./PotModel";
import Component from "../../ui/Component";

/**
 * Pot component models a virtual potentiometer. This base class is used to adjust audio parameter values of pedals.
 *
 * @extends {Component}
 */
class Pot extends Component {

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
        super();
        this.setModel(new this.modelClass(param, name, multiplier || 1, opt_min, opt_max, opt_default));

        this.modelClass = PotModel;

        this.angle = 260;

        /**
         * @enum {string} DOM mappings.
         */
        this.mappings = {
            KNOB: '.knob',
            KNOB_HOLDER: '.knobHolder'
        };
        this.size = opt_size || Pot.Size.REGULAR;
        this.bindModelEvents();
    }

    /**
     * Sets the new value for this pot's audio parameter.
     *
     * @param {number} newValue New value to be set.
     */
    setValue(newValue) {
        this.model.setValue(newValue);
    }

    /**
     * Updates the user interface - rotation - accordingly.
     */
    updateUi() {
        if(this.rendered) {
            let newStyle = `rotateZ(${this.model.getNormalizedValue() * this.angle}deg)`;
            this.$(this.mappings.KNOB)[0].style['-webkit-transform'] = newStyle;
            this.$(this.mappings.KNOB)[0].style['transform'] = newStyle;
        }
    }

    /**
     * @override
     */
    template() {
        return `<div class="pot ${this.size}">
                    <div class="knobHolder">
                        <div class="knob"></div>
                    </div>
                    <div class="nameHolder">
                        <div class="name">${this.model.name}</div>
                    </div>
                </div>`;
    }

    /**
     * Render method updates its knob.
     * @override
     */
    onAfterRender() {
        super.onAfterRender();
        this.updateUi();
    }

    /**
     * @override
     */
    bindModelEvents() {
        this.model.addEventListener(PotModel.EventType.VALUE_CHANGED, this.updateUi, false);
        // goog.events.listen(this.model, PotModel.EventType.VALUE_CHANGED, this.updateUi, false, this);
    }
}

/**
 * @enum {string} Pot size.
 */
Pot.Size = { SMALL: 'small', REGULAR: 'regular' };

export default Pot;