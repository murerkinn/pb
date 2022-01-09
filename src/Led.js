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
 * @fileoverview LED component.
 */

import SwitchModel from "./footswitch/Switch/SwitchModel";
import Component from "./ui/Component";
import Switch from "./footswitch/Switch/Switch";

/**
 * LED is a simple component used to show the status of switches.
 *
 * @extends {Component}
 *
 */
class Led extends Component {
    /**
     *
     * @param {Switch=} opt_footswitch Footswitch this LED will follow.
     * @param {string=} opt_name Name of the LED. Will be written under it.
     */
    constructor(opt_footswitch, opt_name) {
        super();
        this.footswitch = opt_footswitch;
        this.name = opt_name || '';
        this.state = false;

        this.bindModelEvents();
    }

    /**
     * Toggles the state of the LED explicitly. Normally, this is unnecessary given a footswitch.
     */
    toggle() {
        this.state = !this.state;
        this.updateUi();
    }

    /**
     * Updates the user interface - glow - accordingly.
     */
    updateUi() {
        if(this.rendered) {
            this.el.classList.toggle('on', this.state);
        }
    }

    /**
     * @override
     */
    template() {
        return `<div class="led">
                    <div class="nameHolder">
                        <div class="name">${this.name}</div>
                    </div>
                </div>`;
    }

    /**
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
        if(this.footswitch) {
            this.footswitch.model.on(SwitchModel.EventType.ON, this.onSwitchValueChange, this);
            this.footswitch.model.on(SwitchModel.EventType.OFF, this.onSwitchValueChange, this);
        }
    }

    /**
     * Acts on an off or on event dispatched from this LED's footswitch. Updates the UI accordingly.
     *
     * @param {boolean} e ON / OFF event of the switch.
     */
    onSwitchValueChange(e) {
        this.state = e;
        this.updateUi();
    }
}

export default Led;