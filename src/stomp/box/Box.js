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
 * @fileoverview Base pedal.
 */

import Connectable from "../../Connectable/Connectable";
import SwitchModel from "../../footswitch/Switch/SwitchModel";
import BoxModel from "./BoxModel";
import Toggle from "../../footswitch/toggle/Toggle";
import Led from "../../Led";
import Linear from "../../pot/Linear/Linear";

class Box extends Connectable {
    constructor(context) {
        super(context);

        /**
         * DOM selector mappings.
         *
         * @enum {string}
         */
        this.mappings = {
            POTS: '.pots',
            SWITCHES: '.switches',
            LEDS: '.leds'
        };

        /**
         * Name of the pedal. It's written on top plate.
         *
         * @type {string}
         */
        this.name = 'pb';
    }

    /**
     * @override
     */
    createChildComponents() {
        super.createChildComponents();

        this.pots = []
        this.leds = []
        this.switches = []
        this.volumePot = null
        this.bypassSwitch = null
        this.led = null

        this.createPots();
        this.createSwitches();
    }

    /**
     * Creates the potentiometers of this stomp box.
     */
    createPots() {
        this.volumePot = new Linear(this.model.level.gain, 'volume', 1);
        this.volumePot.setValue(1);

        this.pots.push(this.volumePot);
    }

    /**
     * Creates the switches of this stomp box.
     */
    createSwitches() {
        this.bypassSwitch = new Toggle();
        this.led = new Led(this.bypassSwitch);
        this.leds.push(this.led);
        this.switches.push(this.bypassSwitch);

        this.bypassSwitch.model.on(SwitchModel.EventType.ON, () => {
            this.model.routeInternal();
            setTimeout(() => {
                this.model.routeInternal();
            }, 10);
        });
    }

    /**
     * @override
     */
    connect(destination) {
        super.connect(destination);
        this.bypassSwitch.setNodes(this.model.nodes);
    }

    /**
     * Sets the level of the effect.
     *
     * @param {number} newLevel The new level of the effect.
     */
    setLevel(newLevel) {
        this.volumePot.setValue(newLevel);
    }

    /**
     * @override
     */
    template() {
        let className = this.name.replace(/\s/g, '-').toLowerCase();

        return `
            <div class="box ${className}">
                <div class="pots">${this.pots.join('')}</div>
                <div class="name">${this.name}</div>
                <div class="leds">${this.leds.join('')}</div>
                <div class="switches">${this.switches.join('')}</div>
                ${/*<div class="obg"></div>
                <div class="bg"></div>
                <div class="bgs">
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                    <div class="bg"></div>
                </div> */''}
            </div>`;
    }
}

Box.prototype.modelClass = BoxModel;

export default Box;
