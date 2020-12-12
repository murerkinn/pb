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

        let that = this;
        this.on(SwitchModel.EventType.ON, function() {
            this.model.routeInternal();
            setTimeout(() => {
                that.model.routeInternal();
            }, 10);
        }, this.bypassSwitch.model);
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
                <div class="pots"></div>
                <div class="name">${this.name}</div>
                <div class="leds"></div>
                <div class="switches"></div>
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

    /**
     * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
     * @override
     */
    onAfterRender() {
        super.onAfterRender();

        this.pots.forEach((pot) => {
            pot.render(this.$(this.mappings.POTS));
        }, this);

        this.switches.forEach((sw) => {
            sw.render(this.$(this.mappings.SWITCHES));
        }, this);

        this.leds.forEach((led) => {
            led.render(this.$(this.mappings.LEDS));
        }, this);
    }
}

Box.prototype.modelClass = BoxModel;
Box.prototype.pots = [];
Box.prototype.leds = [];
Box.prototype.switches = [];
Box.prototype.volumePot = null;
Box.prototype.bypassSwitch = null;
Box.prototype.led = null;

export default Box;