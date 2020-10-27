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
 * @fileoverview Linear pot component model.
 */

import PotModel from "../pot/PotModel";


/**
 * Log model provides a potentiometer behavior similar to real world logarithmic potentiometers.
 *
 * @extends {PotModel}
 */
export default class LogModel extends PotModel {

    /**
     * @override
     */
    processValue(newValue, oldValue) {
        newValue = Math.pow(newValue, 3.3);
        super.processValue(newValue, oldValue);
    }

    /**
     * @override
     */
    getNormalizedValue() {
        let rv = super.getNormalizedValue();
        rv = Math.pow(rv, 1/3.3);
        return rv;
    }
}