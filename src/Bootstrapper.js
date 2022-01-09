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

import Board from './Board'
import IConnectable from './IConnectable'
import IConnectableModel from './IConnectableModel'
import Led from './Led'
import Stage from './Stage'

import { Connectable, ConnectableModel } from './Connectable/index'
import { Momentary, MomentaryModel, Switch, SwitchModel, Toggle, ToggleModel } from './footswitch/index'
import { FileInput, Input, Output, StreamInput } from './io/index'
import { Linear, LinearModel, Log, LogModel, Pot, PotModel } from './pot/index'
import { Box, BoxModel, Cabinet, CabinetModel, Conv, ConvModel, Delay, DelayModel, Overdrive, OverdriveModel, Reverb, ReverbModel, Volume, VolumeModel } from './stomp/index'
import Component from './ui/Component'
/**
 * Bootstrapper class includes things to do on startup.
 */
class Bootstrapper {}

window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext'];

export default {
    Board,
    IConnectable,
    IConnectableModel,
    Led,
    Stage,
    connectable: {
        Connectable,
        ConnectableModel
    },
    footswitch: {
        Momentary,
        MomentaryModel,
        Switch,
        SwitchModel,
        Toggle,
        ToggleModel
    },
    io: {
        FileInput,
        Input,
        Output,
        StreamInput
    },
    pot: {
        Linear,
        LinearModel,
        Log,
        LogModel,
        Pot,
        PotModel
    },
    stomp: {
        Box,
        BoxModel,
        Cabinet,
        CabinetModel,
        Conv,
        ConvModel,
        Delay,
        DelayModel,
        Overdrive,
        OverdriveModel,
        Reverb,
        ReverbModel,
        Volume,
        VolumeModel
    },
    ui: {
        Component
    }
};

// export default Bootstrapper;
// export { default as Connectable } from './Connectable/index.js'
// export { default as footswitch } from './footswitch/index.js'
// export { default as io } from './io/index.js'
// export { default as pot } from './pot/index.js'
// export { default as stomp } from './stomp/index.js'
// export { default as Component } from './ui/Component.js'
// export { default as Board } from './Board.js'
// export { default as IConnectable } from './IConnectable.js'
// export { default as IConnectableModel } from './IConnectableModel.js'
// export { default as Led } from './Led.js'
// export { default as Stage } from './Stage.js'