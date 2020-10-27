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
 * @fileoverview Registry for Component. Manages DOM event interactions for these components.
 */

import ErsteComponentManager from "erste/src/lib/base/component-manager";

/**
 * @extends {ErsteComponentManager}
 */
class ComponentManager extends ErsteComponentManager {

    constructor() {
        super();
        
        /** @type {Object.<string, Component>} */
        this.components = {};
    }

    /**
     * Set given component.
     * @param {Component} cmp Component which will be set to components.
     */
    set(cmp) {
        this.components[cmp.getId()] = cmp;
    }

    /**
     * Removes given component.
     * @param {Component} cmp Component which will be removed from components.
     */
    remove(cmp) {
        delete this.components[cmp.getId()];
    }
}

export default ComponentManager;