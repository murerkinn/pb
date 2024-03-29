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
 * @fileoverview IConnectableModel interface for consistent routing. All the connectable component models should
 * implement this interface.
 */

 /**
  * IConnectableModel interface. Sports connect method for output and setInput method for input.
  * @interface
  */
class IConnectableModel {    
    /**
     * Connects the output of this IConnectableModel to a node.
     * 
     * @param {AudioNode} destination Destination node to connect the output of this IConnectableModel.
     */
    connect(destination) {}
    
    /**
     * Disconnects the output of this IConnectableModel
     */
    disconnect() {}
    
    /**
     * Sets the previous node of this IConnectableModel.
     * 
     * @param {AudioNode} prev The node that will be connected to the input of this IConnectableModel.
     */
    setPrev(prev) {}

    /**
     * Gets the input of a IConnectableModel.
     *
     * @return {!(AudioNode)} The input of this IConnectableModel.
     */
    getInput() {
      throw new Error('not implemented')
    }

    /**
     * Gets the output of a IConnectableModel.
     *
     * @return {!(AudioNode)} The output of this IConnectableModel.
     */
    getOutput() {
      throw new Error('not implemented')
    }
}

export default IConnectableModel;