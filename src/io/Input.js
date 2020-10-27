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
 * @fileoverview Input abstraction for an audio context. There can be many input sources in an audio context and this
 * class is an abstraction of an input that also implements the pb.Connectable interface so that it can be chained
 * before a pb.stomp.BoxModel.
 */

import IConnectable from "../IConnectable";

/**
 * The input wrapper for an audio context.
 * 
 * @implements {IConnectable}
 * @extends {goog.events.EventTarget}
 */
class Input extends goog.events.EventTarget {
    
    /**
     * 
     * @param {AudioContext} context Audio context for this input.
     */
    constructor(context) {
        super();
        this.source = context.createBufferSource(); // creates a sound source
        this.source.loop = true;
        this.state = Input.State.NOT_STARTED;
        this.source.addEventListener('ended', this.onEnded.bind(this));
    }

    /**
     * Starts playing the input.
     * 
     * @param {number=} opt_time Milliseconds after whom this input will start playing.
     */
    play(opt_time) {
        if(this.state == Input.State.NOT_STARTED) {
            this.source.start(opt_time || 0);
            this.state = Input.State.PLAYING;
        }
    }

    /**
     * Stops playing the input.
     * 
     * @param {number=} opt_time Milliseconds after whom this input will stop playing.
     */
    stop(opt_time) {
        if(this.state == Input.State.PLAYING) {
            this.source.stop(opt_time || 0);
            this.state = Input.State.FINISHED;
        }
    }

    /**
     * Sets the source buffer of this input.
     * 
     * @protected
     * @param {*} sourceBuffer The new buffer.
     */
    setSourceBuffer(sourceBuffer) {
        this.source.buffer = sourceBuffer;
    }

    /**
     * Connects this input to a destination pedal.
     * 
     * @param {IConnectable} destination Next pedal where this input will connect to.
     */
    connect(destination) {
        destination.setPrev(this);
        this.source.connect(destination.getInput());
    }

    /**
     * Disconnects this input from wherever it's connected to.
     */
    disconnect() {
        this.source.disconnect();
    }

    /**
     * Gets the source of this input.
     * 
     * @return {AudioBufferSourceNode} The source of this input.
     */
    getOutput() {
        return this.source;
    }

    /**
     * Handler for the end event. When the playback of the input ends, this method correctly sets the State to FINISHED.
     */
    onEnded() {
        this.state = Input.State.FINISHED;
    }

    /**
     * Dummy method for the Connectable interface. It's meaningless for an input to be connected to the output of another
     * thing.
     */
    setPrev() {}

    /**
     * Dummy method for the Connectable interface. It's meaningless for an input to have an input.
     */
    getInput() {}
}

/**
* Playback states that partially fulfills the deprecated playbackState in Web Audio API. Basically it helps to avoid
* exceptions when start or stop is called inappropriately.
*
* @enum {string}
*/
Input.State = {
   NOT_STARTED: 'notStarted',
   PLAYING: 'playing',
   FINISHED: 'finished'
};

export default Input;