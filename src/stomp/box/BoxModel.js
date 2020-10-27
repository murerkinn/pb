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
 * @fileoverview Base pedal component model.
 */

import ConnectableModel from "../../Connectable/ConnectableModel"
import helpers from "../../../lib/helpers";

/**
 * Component model for base pedal
 * 
 * @extends {ConnectableModel}
 */
class BoxModel extends ConnectableModel {

    /**
     * 
     * @param {AudioContext} context The context this component model will operate on.
     */
    constructor(context) {
        super(context);

        this.level = this.context.createGain();
        this.effects.push(this.level);
    }

    /**
     * Sets the level of the effect.
     * 
     * @param {number} newLevel The new level of the effect.
     */
    setLevel(newLevel) {
        newLevel = Math.min(newLevel, 10);
        newLevel = newLevel / 10;
        this.level.gain.value = newLevel;
    }

    /**
     * Routes the internal effects chain.
     * 
     * @protected
     * @requires goog.array
     */
    routeInternal() {
        let chain = this.chain;

        for(let i = 0, len = chain.length - 1; i < len; i++) {
            chain[i].connect(chain[i + 1]);
        }

        this.nodes = [
            [this.effects[0], this.inputBuffer, this.outputBuffer],
            [this.outputBuffer, helpers.peek(this.effects), null]
        ]
    }
}

export default BoxModel;