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
 * @fileoverview A stage is unique per session, has an Input, an Output and a Board.
 * Its board can be swapped with other boards.
 */

import Component from "./ui/Component";
import FileInput from "./io/FileInput";
import Input from "./io/Input";
import Output from "./io/Output";
import Board from "./Board";

/**
 * Stage hosts pedal boards, input and output.
 * 
 * @extends {Component}
 */
class Stage extends Component {
    constructor() {
        super();
        this.input = null;
        this.output = null;
        this.board = null;
        this.mediaStreamDestination = null;
        /**
         * The audio context for this stage.
         * 
         * @protected
         * @type {AudioContext}
         */
        this.context = new AudioContext();
        this.initIO();
    }

    /**
     * Gives the audio context created for this stage. Every effect, input and output in this stage should be declared on
     * this context.
     * 
     * @return {AudioContext} The audio context of this stage.
     */
    getContext() {
        return this.context;
    }

    /**
     * Initializes the input and the output.
     */
    initIO() {
        /*
            Example for FileInput:
                this.input = new FileInput(this.context, 'audio/samples/sample1.mp3');

                goog.events.listen(this.input, 'loaded', () => {
                    this.route();
                }, false, this);
        */

        this.input = new Input(this.context);
        this.output = new Output(this.context);
    }

    /**
     * Initializes the pedal components.
     * @param {Board} board Board component.
     */
    setBoard(board) {
        this.board && this.board.dispose();

        this.board = board;
        this.mediaStreamDestination && this.board.setMediaStreamDestination(this.mediaStreamDestination);

        this.route();

        this.addChild(this.board);
    }

    /**
     * Routes the signal.
     * Input -> volume pedal -> reverb pedal
     */
    route() {
        this.input.disconnect();
        this.input.connect(this.board);
        this.board.connect(this.output);
    }

    /**
     * Sets the media stream destination for this stage. It will be forwarded to this stage's board.
     * 
     * @param {MediaStreamAudioDestinationNode} destination Media stream destination for RTC peer connections.
     */
    setMediaStreamDestination(destination) {
        this.mediaStreamDestination = destination;
        this.board.setMediaStreamDestination(this.mediaStreamDestination);
    }

    /**
     * Plays the input.
     * 
     * @param {string} url The url of the external sample. Since it will be interpreted as a relative path, it should
     * reside at the domain where the application runs.
     */
    play(url) {
        this.input.disconnect();
        this.input = new FileInput(this.context, url);
        this.route();
        this.input.on('loaded', () => {
            this.input.play(0)
        });
    }

    /**
     * Stops the input.
     */
    stop() {
        this.input.stop();
    }

    /**
     * @override
     */
    template() {
        return `<div class="stage"></div>`;
    }
}

export default Stage;