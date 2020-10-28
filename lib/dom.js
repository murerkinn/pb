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
 * @fileoverview Library module for dom functions.
 */

import math from "./math";

var defaultDomHelper;

const NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
  };

const getOwnerDocument = (node) => {
    if(node) {
        return /** @type {!Document} */ (
            node.nodeType == NodeType.DOCUMENT ? node : node.ownerDocument ||
                    node.document);
    }
};

const getDocument = () => {
    return document;
};

class DomHelper {
    constructor(opt_document=null) {
        /**
         * Reference to the document object to use
         * @const
         * @type {!Document}
         */
        this.document_ = opt_document || document;
    }
};

const removeNode = (node) => {
    return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}

const getDomHelper = (opt_element) => {
    return opt_element ?
        new DomHelper(getOwnerDocument(opt_element)) :
        (defaultDomHelper ||
         (defaultDomHelper = new DomHelper()));
};

const insertSiblingBefore = (newNode, refNode) => {
    if (refNode.parentNode) {
      refNode.parentNode.insertBefore(newNode, refNode);
    }
};

const getDocumentScrollElement = (doc) => {
    // Old WebKit needs body.scrollLeft in both quirks mode and strict mode. We
    // also default to the documentElement if the document does not have a body
    // (e.g. a SVG document).
    // Uses http://dev.w3.org/csswg/cssom-view/#dom-document-scrollingelement to
    // avoid trying to guess about browser behavior from the UA string.
    if (doc.scrollingElement) {
      return doc.scrollingElement;
    }
    // if (!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc)) {
    //   return doc.documentElement;
    // }
    return doc.body || doc.documentElement;
};

const getWindow = (doc) => {
  return /** @type {!Window} */ (doc.parentWindow || doc.defaultView);
};

const getDocumentScroll = (doc) => {
    var el = getDocumentScrollElement(doc);
    var win = getWindow(doc);
    // if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('10') &&
    //     win.pageYOffset != el.scrollTop) {
    //   // The keyboard on IE10 touch devices shifts the page using the pageYOffset
    //   // without modifying scrollTop. For this case, we want the body scroll
    //   // offsets.
    //   return new math.Coordinate(el.scrollLeft, el.scrollTop);
    // }
    return new math.Coordinate(
        win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};

export default {
    defaultDomHelper: defaultDomHelper,
    NodeType: NodeType,
    getOwnerDocument: getOwnerDocument,
    getDocument: getDocument,
    DomHelper: DomHelper,
    removeNode: removeNode,
    getDomHelper: getDomHelper,
    insertSiblingBefore: insertSiblingBefore,
    getDocumentScrollElement: getDocumentScrollElement,
    getWindow: getWindow,
    getDocumentScroll: getDocumentScroll
}