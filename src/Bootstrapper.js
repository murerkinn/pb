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
 * @fileoverview Bootstrapper for pb.
 */

// import { Stage } from "./Stage";

/**
 * Bootstrapper class includes things to do on startup.
 */
class Bootstrapper {}

window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext'];
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
// || navigator.mozGetUserMedia;

export default Bootstrapper;