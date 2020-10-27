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
 * @fileoverview Base switch component.
 */

import SwitchModel from "./SwitchModel";
import Component from "../../ui/Component";
import ComponentManager from "../../ComponentManager";

/**
 * Switch component models a footswitch. This base class is used to toggle stompbox nodes.
 *
 * @extends {Component}
 *
 */
class Switch extends Component {
  
  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  constructor(opt_name) {
    super();
    this.model = new this.modelClass(opt_name);
    this.modelClass = SwitchModel;
    this.mappings = {
      BUTTON: ".button",
    };
    this.events = {
      [ComponentManager.events['mousedown']]: {
        [this.mappings.BUTTON]: this.toggle,
      },
    };
  }

  /**
   * Sets the nodes this switch will toggle.
   *
   * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
   */
  setNodes(nodes) {
    this.model.setNodes(nodes);
  }

  /**
   * Returns the current state of the switch. Return value is true if the switch is on, and false if otherwise.
   *
   * @return {boolean} Whether the switch is on or off.
   */
  getState() {
    return this.model.state;
  }

  /**
   * Toggles the switch.
   */
  toggle() {
    this.model.toggle();
  }

  /**
   * @override
   */
  templates_base() {
    return `<div class="switch" id="${this.getId()}">
                    <div class="button"></div>
                    ${this.templates_name()}
                </div>`;
  }

  /**
   * @return {string} Name template. Returns empty string if no name is given.
   */
  templates_name() {
    return this.model.name ? `<div class="name">${this.model.name}</div>` : "";
  }
}

export default Switch;