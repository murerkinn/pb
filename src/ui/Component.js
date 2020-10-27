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
 * @fileoverview The base component class.
 */

import ComponentManager from "../ComponentManager";

import ErsteComponent from 'erste';

/**
 * Component is from ersteJS.
 * 
 * @extends {ErsteComponent}
 */
class Component extends ErsteComponent {
    constructor() {
        super();
        ComponentManager.getInstance().set(this);
    }

    /**
     * Listens to the model's events. This method should be overridden by the implementer, and should keep the model's event
     * listeners.
     * @protected
     */
    bindModelEvents() {}

    /**
     * @override
     */
    createDom() {
        this.setElementInternal(/** @type {Element} */(tart.dom.createElement(this.templates_base())));
    }

    /**
     * @override
     */
    setModel(model) {
        super.setModel(model);
        this.model = this.getModel();
    }

    /**
     * @override
     */
    addChildAt(child, index, opt_render) {
        if (opt_render != false) opt_render = true;

        super.addChildAt(child, index, opt_render);
    }

    /**
     * Adds the specified children to this component, appending at the end.
     * 
     * @param {Array.<Component>} children The new child components.
     * @param {boolean=} opt_render If false, the child component will not be rendered into the parent.
     */
    addChildren(children, opt_render) {
        let that = this;
        children.forEach((child) => {
            that.addChild(child, opt_render);
        }, this);
    }

    /**
     * Returns the child components of this component (if any).
     * @return {Array.<Component>} Child components.
     */
    getChildren() {
        let ids = this.getChildIds(),
            that = this;

        return ids.map((id) => that.getChild(id))
    }

    /**
     * @override
     */
    disposeInternal() {
        super.disposeInternal();

        this.model && this.model.dispose && this.model.dispose();
        this.model = null;
    }

    /**
     * Much like jQuery, this method gets a DOM element that is a child of this component. It's a convenience method and
     * wraps goog.dom.query.
     * 
     * @param {string} selector A selector string as understood by the querySelector.
     * @return { {length: number} } The elements as the result of the query. 
     */
    $(selector) {
        return document.querySelectorAll(selector);
        // return goog.dom.query(selector, this.getElement());
    }

    /**
     * template for the component's root element.
     * 
     * @return {string} template.
     */
    templates_base() {
        return `<div id="${this.getId()}"></div>`;
    }
}

export default Component;