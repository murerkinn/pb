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
 * @fileoverview Library module for events.
 */

import math from "./math";
import dom from "./dom";

const getBoundingClientRect = (el) => {
  try {
    return el.getBoundingClientRect();
  } catch (e) {
    // In IE, calling getBoundingClientRect on an orphan element raises an
    // "Unspecified Error". All other browsers return zeros.
    return {'left': 0, 'top': 0, 'right': 0, 'bottom': 0};
  }
};

const getClientViewportElement = (opt_node) => {
    var doc;
    if (opt_node) {
      doc = dom.getOwnerDocument(opt_node);
    } else {
      doc = dom.getDocument();
    }

    // In old IE versions the document.body represented the viewport
    // if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9) &&
    //     !dom.getDomHelper(doc).isCss1CompatMode()) {
    //   return doc.body;
    // }
    return doc.documentElement;
  };


const getPageOffset = (el) => {
  var doc = dom.getOwnerDocument(el);

  // NOTE(arv): If element is hidden (display none or disconnected or any the
  // ancestors are hidden) we get (0,0) by default but we still do the
  // accumulation of scroll position.

  // TODO(arv): Should we check if the node is disconnected and in that case
  //            return (0,0)?

  var pos = new math.Coordinate(0, 0);

  var viewportElement = getClientViewportElement(doc);

  if (el == viewportElement) {
    // viewport is always at 0,0 as that defined the coordinate system for this
    // function - this avoids special case checks in the code below
    return pos;
  }

  var box = getBoundingClientRect(el);

  // Must add the scroll coordinates in to get the absolute page offset
  // of element since getBoundingClientRect returns relative coordinates to
  // the viewport.

  var scrollCoord = dom.getDocumentScroll(doc);
  pos.x = box.left + scrollCoord.x;
  pos.y = box.top + scrollCoord.y;

  return pos;
}

export default {
  getBoundingClientRect: getBoundingClientRect,
  getClientViewportElement: getClientViewportElement,
  getPageOffset: getPageOffset
}
