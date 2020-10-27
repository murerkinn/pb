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
 * @fileoverview Base connectable component model. Hosts input and output buffer, chain and effects base.
 */

import IConnectableModel from "../IConnectableModel";
import Component from "erste";

/**
 * Component model for base connectables.
 * 
 * @implements {IConnectableModel}
 * @extends {Component}
 */
class ConnectableModel extends Component {
    
    /**
     * 
     * @param {AudioContext} context The context this component model will operate on.
     */
    constructor(context) {
        super();

        this.context = context;

        /**
         * @type {Array.<!AudioNode>}
         */
        this.chain = [];
            
        /**
         * @type {Array.<AudioNode>}
         */
        this.effects = [];

        /**
         * @type {GainNode}
         * @protected
         */
        this.inputBuffer = this.context.createGain();
        
        /**
         * @type {GainNode}
         * @protected
         */
        this.outputBuffer = this.context.createGain();
    }

    /**
     * Connects the output of the audio node of this model to another audio node.
     * 
     * @param {AudioNode} destination Next audio node where the output of this model's node will connect to. 
     */
    connect(destination) {
        this.next = destination;
        this.chain = [].concat(this.inputBuffer, this.effects, this.outputBuffer, this.next);

        this.routeInternal();
    }

    /**
     * Gets the input buffer of a pedal.
     * 
     * @return {AudioNode} The input buffer of this component.
     */
    getInput() {
        return this.inputBuffer;
    }

    /**
     * Gets the output buffer of a pedal.
     * 
     * @return {AudioNode} The output buffer of this component.
     */
    getOutput() {
        return this.outputBuffer;
    }

    /**
     * Lets the model know who is connected to its effects node.
     * 
     * @param {AudioNode} prev Previous node who is connected to this model's effects node.
     */
    setPrev(prev) {
        this.prev = prev;
    }

    /**
     * Routes the internal effects chain.
     */
    routeInternal() {
        let chain = this.chain;
        for(let i = 0, len = chain.length - 1; i < len; i++) {
            chain[i].connect(chain[i + 1]);
        }
    }

    /**
     * Disconnects the output buffer of this pedal.
     */
    disconnect() {
        this.outputBuffer.disconnect();
    }

    /**
     * @override
     */
    disposeInternal() {
        super.disposeInternal();
        this.disconnect();
    }
}

export default ConnectableModel;