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
 * @fileoverview Cabinet pedal component model.
 *
 * Impulse response buffer taken from
 *
 * http://www.adventurekid.se/akrt/free-reverb-impulse-responses/
 */

import ConvModel from "../conv/ConvModel";
import iRPath from "url:../../../example/audio/ir/speaker/AK-SPKRS_VinUs_002.wav";

/**
 * Component model for Cabinet pedal.
 *
 * @extends {ConvModel}
 */
class CabinetModel extends ConvModel {
    /**
     *
     * @param {AudioContext} context The context this component model will operate on.
     */
    constructor(context) {
        super(context);
    }
}

CabinetModel.prototype.iRPath = iRPath;

export default CabinetModel;
