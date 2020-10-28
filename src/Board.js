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


import Connectable from "./Connectable/Connectable";
import { shadowMaker } from "./ShadowMaker";
import dom from "../lib/dom";
import Box from "./stomp/box/Box";

class Board extends Connectable {
  constructor(context) {
    super(context);
    this.context = context;

    this.output = null;

    this.mediaStreamDestination = null;

    /**
     * Pedals of this board.
     *
     * @protected
     * @type {Array.<Box>}
     */
    this.pedals = null;

    /**
     * @enum {string} DOM mappings.
     */
    this.mappings = {
      EMPTY: '.empty'
    }
  }

  /**
   * Adds pedals to this board. An alias method for addChildren.
   * @param {Array.<Box>} pedals Pedals.
   */
  addPedals(pedals) {
    // Component.prototype.addChildren.call(this, pedals);
    this.addChildren(pedals);
  };

  /**
   * Calculates and draws shadows for pedals and their pots.
   */
  doShadows() {
    this.getPedals().forEach((pedal) => {
      shadowMaker(pedal.el, 40, 0.5, 0.7);
      pedal.pots.forEach((pot) => {
        shadowMaker(pot.$(pot.mappings.KNOB_HOLDER)[0], 10, 0.5, 4);
      });
    });
  };

  /**
   * @override
   *
   * @param {Box} child Child pedal to add to this board.
   * @param {number} index Where the child pedal should be put at.
   * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
   */
  addChildAt(child, index, opt_render) {
    super.addChildAt(child, index, opt_render);

    if (this.getPedals().length)
        dom.removeNode(this.$(this.mappings.EMPTY)[0]);

    this.routeInternal();
    if (this.rendered) this.doShadows();
  };

  /**
   * Convenience method for adding pedals at a given index.
   *
   * @param {Box} child Child pedal to add to this board.
   * @param {number} index Where the child pedal should be put at.
   * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
   */
  addPedalAt(child, index, opt_render) {
    this.addChildAt(child, index, opt_render)
  };

  /**
   * @override
   */
  remove_child(child, opt_unrender) {
    let el = super.remove_child(child, opt_unrender);

    if (this.getPedals().length == 0)
        this.el.innerHTML = this.templates_empty();

    this.routeInternal();
    return el;
  };

  /**
   * @override
   */
  onAfterRender() {
    super.onAfterRender();
    this.doShadows();
  };

  /**
   * Returns the pedals in this board.
   *
   * @return {Array.<Box>} Pedals in this board.
   */
  getPedals () {
    return this.getChildren();
  };

  /**
   * @override
   */
  template() {
    return `<div class="board">
              ${this.templates_empty()}
            </div>`;
  };

  templates_empty() {
    return '<div class="empty"><div class="text">board is empty</div></div>';
  };

  /**
   * @override
   */
  connect(destination) {
    super.connect(destination);
    this.output = destination;
    this.routeInternal();
  };

  /**
   * Routes the pedals.
   *
   * @protected
   */
  routeInternal() {
    let fx = this.getPedals();

    this.getInput().disconnect();

    if (fx.length) {
        this.getInput().connect(fx[0].getInput());
        this.output && fx[fx.length - 1].connect(this.output);

        fx.forEach((pedal, i) => {
            pedal.disconnect();
            fx[i + 1] && pedal.connect(fx[i + 1]);
        });
        this.output && this.mediaStreamDestination && fx[fx.length - 1].model.getOutput().connect(this.mediaStreamDestination);
    }
    else {
        this.getInput().connect(this.getOutput());
        this.mediaStreamDestination && this.getInput().connect(this.mediaStreamDestination);
    }
  };

  /**
   * Sets the media stream destination for this board. The output will be sent to the media stream destination, too.
   *
   * @param {MediaStreamAudioDestinationNode} destination Media stream destination for RTC peer connections.
   */
  setMediaStreamDestination(destination) {
    this.mediaStreamDestination = destination;
  };

}

export default Board;