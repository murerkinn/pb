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

const DomHelper = (opt_document) => {
    /**
     * Reference to the document object to use
     * @type {!Document}
     * @private
     */
    this.document_ = opt_document || document;
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

export default {
    defaultDomHelper: defaultDomHelper,
    NodeType: NodeType,
    getOwnerDocument: getOwnerDocument,
    getDocument: getDocument,
    DomHelper: DomHelper,
    removeNode: removeNode,
    getDomHelper: getDomHelper,
    insertSiblingBefore: insertSiblingBefore
}