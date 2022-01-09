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

import Input from "./Input";

/**
 * The input wrapper for an audio context.
 *
 * @extends {Input}
 */
class StreamInput extends Input {

    /**
     * 
     * @param {AudioContext} context Audio context for this input.
     */
    constructor(context) {
        super(context);

        const that = this;

        navigator.mediaDevices.getUserMedia({
            'audio': {
                'echoCancellation': false,
                'autoGainControl': false,
                'noiseSuppression': false,
            }
        }).then((stream) => {
            that.disconnect();

            // TODO: Fix the type issue below
            // @ts-ignore
            that.source = context.createMediaStreamSource(stream);

            that.emit('loaded');
        }).catch((err) => {
            throw new Error(err);
        })
    }

    /**
     * @override
     */
    stop() {
        this.source.disconnect();
    }
}

export default StreamInput;