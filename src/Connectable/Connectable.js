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

import Component from "../ui/Component";
import ConnectableModel from "./ConnectableModel";
import IConnectable from "../IConnectable";
import Output from "../io/Output";

/**
 * Base component.
 *
 * @extends {Component}
 * @implements {IConnectable}
 */
class Connectable extends Component {

    /**
     * 
     * @param {AudioContext} context Audio context the pedal will work on.
     */
    constructor(context) {
        super();
        this.setModel(new this.modelClass(context));
        this.createChildComponents();
        this.bindModelEvents();
        this.components = null;
    }

    /**
     * Creates child components such as pots and switches.
     */
    createChildComponents() {
        this.components = [];
    }

    /**
     * Gets the input buffer of a pedal.
     * @return {!(AudioNode)} The input buffer of this component.
     */
    getInput() {
        return this.model.getInput();
    }

    /**
     * Gets the output buffer of a pedal.
     * @return {!(AudioNode)} The output buffer of this component.
     */
    getOutput() {
        return this.model.getOutput();
    }

    /**
     * Lets the pedal instance know who is connected to its input.
     * @param {IConnectable} prev Previous pedal whose output will connect to this pedal's input.
     */
    setPrev(prev) {
        this.model.setPrev(prev.getOutput());
    }

    /**
     * Connects the output of this pedal to another pedal.
     * @param {IConnectable|Output} destination Next pedal where the output of this pedal will connect to.
     */
    connect(destination) {
        destination.setPrev(this);
        this.model.connect(destination.getInput());
    }
    
    /**
     * Disconnects the output of this pedal.
     */
    disconnect() {
        this.model.disconnect();
    }
}

Connectable.prototype.modelClass = ConnectableModel

export default Connectable;