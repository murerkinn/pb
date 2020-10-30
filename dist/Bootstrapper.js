// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/erste/src/lib/base/use.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @typedef {{$$register: Function}}
 */
const ErstePlugin = null;
/**
 * @param {ErstePlugin} plugin An erste plugin to install and use. Its `$$register`
 * method will be called with erste as the first parameter, allowing it to
 * modify the erste module freely. One common use case is the regie npm 
 * library, which is the state management solution for vanilla JavaScript 
 * applications and erste. It injects the store into root of erste and allows
 * Components to have a special syntax to declare observations for state
 * properties.
 */

function _default(plugin) {
  plugin.$$register(this);
}
},{}],"../node_modules/erste/src/lib/base/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**!
 * Adapted from Google Closure Library, math.js
 *
 *
 * Copyright 2006 The Closure Library Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * The % operator in JavaScript returns the remainder of a / b, but differs from
 * some other languages in that the result will have the same sign as the
 * dividend. For example, -1 % 8 == -1, whereas in some other languages
 * (such as Python) the result would be 7. This function emulates the more
 * correct modulo behavior, which is useful for certain applications such as
 * calculating an offset index in a circular list.
 *
 * @param {number} a The dividend.
 * @param {number} b The divisor.
 * @return {number} a % b where the result is between 0 and b (either 0 <= x < b
 *     or b < x <= 0, depending on the sign of b).
 */
const modulo = (a, b) => {
  var r = a % b; // If r and b differ in sign, add b to wrap the result to the correct sign.

  return r * b < 0 ? r + b : r;
};
/**
 * Converts radians to degrees.
 * @param {number} angleRadians Angle in radians.
 * @return {number} Angle in degrees.
 */


const toDegrees = angleRadians => {
  return angleRadians * 180 / Math.PI;
};
/**
 * Normalizes an angle to be in range [0-360). Angles outside this range will
 * be normalized to be the equivalent angle with that range.
 * @param {number} angle Angle in degrees.
 * @return {number} Standardized angle.
 */


const standardAngle = angle => modulo(angle, 360);
/**
 * Computes the angle between two points (x1,y1) and (x2,y2).
 * Angle zero points in the +X direction, 90 degrees points in the +Y
 * direction (down) and from there we grow clockwise towards 360 degrees.
 * @param {number} x1 x of first point.
 * @param {number} y1 y of first point.
 * @param {number} x2 x of second point.
 * @param {number} y2 y of second point.
 * @return {number} Standardized angle in degrees of the vector from
 *     x1,y1 to x2,y2.
 */


const angle = (x1, y1, x2, y2) => {
  return standardAngle(toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
/**
 * Calculates distance between two points given 4 points.
 * @param {number} x1 X value of the first point
 * @param {number} y1 Y value of the first point
 * @param {number} x2 X value of the second point
 * @param {number} y2 Y value of the second point
 * @return {number} Distance between two points
 */


const distance = (x1, y1, x2, y2) => (x1 - x2) ** 2 + (y1 - y2) ** 2;
/**
 * Performs linear interpolation between values a and b. Returns the value
 * between a and b proportional to x (when x is between 0 and 1. When x is
 * outside this range, the return value is a linear extrapolation).
 * @param {number} a A number.
 * @param {number} b A number.
 * @param {number} x The proportion between a and b.
 * @return {number} The interpolated value between a and b.
 */


const lerp = (a, b, x) => {
  return a + x * (b - a);
};

var _default = {
  angle: angle,
  distance: distance,
  lerp: lerp
};
exports.default = _default;
},{}],"../node_modules/erste/src/lib/base/gesture-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview GestureHandler adds the ability to capture gesture events on
 * touch enabled devices.
 * It listens to 'touchstart', 'touchmove' and 'touchend' events and generates
 * 'tap' or 'swipe' events with inherent heuristics.
 *
 * Currently, the tap algorithm begins with a touchstart, checks for touchend.
 * Any touchmove greater than 3px cancels the tap event, and if a touchend is
 * captured without a touchmove after a touchstart; it's registered as a tap,
 * and the GestureHandler dispatches a tap event on the touchend target.
 *
 * Swipe up, left, right and down gestures are also supported.
 *
 * Example usage:
 *
 *     document.body.addEventListener('tap', function() {
 *         console.log('tapped!');
 *     });
 */

/**
 * iOS 6.0(+?) requires the target element to be manually derived.
 * @type {?boolean}
 */
const deviceIsIOSWithBadTarget = navigator.userAgent.match(/iPhone/i) && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
const EventType = {
  TAP: 'tap',
  LONG_TAP: 'longTap',
  SWIPE_RIGHT: 'swipeRight',
  SWIPE_UP: 'swipeUp',
  SWIPE_LEFT: 'swipeLeft',
  SWIPE_DOWN: 'swipeDown'
};

class GestureHandler {
  /**
   * Tracks and fires gestures on touch enabled devices.
   *
   * @param {!HTMLElement=} opt_el Provided, gesture handler will track gesture
   *                           events on this element. The default
   *                           value is document.body; but an optional
   *                           root element is inevitable for iframe's.
   */
  constructor(opt_el) {
    this.el = opt_el || document.body;
    this.isInMotion = false;
    this.canTap = false;
    this.canSwipe = false;
    /**
     * @type {number} Start time of the first touch in milliseconds since 1970
     */

    this.touchStartTime = 0;
    /**
     * @type {!Array.<number>} Touch list whose first element is the time of the first touch
     */

    this.touches = [];
    this.el.addEventListener('touchstart', this.onTouchstart.bind(this), false);
    this.el.addEventListener('touchmove', this.onTouchmove.bind(this), false);
    this.el.addEventListener('touchend', this.onTouchend.bind(this), false);
  }

  onTouchstart(e) {
    this.isInMotion = true;
    this.canTap = true;
    this.canSwipe = true;
    this.touchStartTime = new Date().getTime();
    var changedTouch = e.changedTouches[0];
    this.touches = [e.timeStamp, changedTouch.pageX, changedTouch.pageY];
  }

  onTouchmove(e) {
    var touches = this.touches,
        changedTouch = e.changedTouches[0];
    if (Math.abs(changedTouch.pageX - touches[1]) > 20 || Math.abs(changedTouch.pageY - touches[2]) > 20) this.canTap = false;
    if (!this.canSwipe) return;
    touches.push(e.timeStamp, changedTouch.pageX, changedTouch.pageY);

    if (+new Date() > touches[0] + 100) {
      this.canSwipe = false;
      return;
    } // Filter the touches


    var date = e.timeStamp;
    touches = touches.filter((touch, index, arr) => {
      var relatedTimeStamp = arr[index - index % 3];
      return relatedTimeStamp > date - 250;
    });
    if (touches.length / 3 <= 1) return;

    var distance = _math.default.distance(touches[1], touches[2], touches[touches.length - 2], touches[touches.length - 1]);

    if (distance < 60) return; // calculate angle.

    var angle = _math.default.angle(touches[1], touches[2], touches[touches.length - 2], touches[touches.length - 1]);

    var eventType = EventType.SWIPE_RIGHT;

    if (angle > 45 && angle < 135) {
      eventType = EventType.SWIPE_DOWN;
    } else if (angle > 135 && angle < 225) {
      eventType = EventType.SWIPE_LEFT;
    } else if (angle > 225 && angle < 315) {
      eventType = EventType.SWIPE_UP;
    }

    var swipe = document.createEvent("Event");
    swipe && swipe.initEvent(eventType, true, true);
    e.target.dispatchEvent(swipe);
    this.canSwipe = false;
  }

  onTouchend(e) {
    this.isInMotion = false;
    if (!this.canTap) return;
    var touches = this.touches,
        changedTouch = e.changedTouches[0];

    if (Math.abs(changedTouch.pageX - touches[1]) > 20 || Math.abs(changedTouch.pageY - touches[2]) > 20) {
      this.canTap = false;
      return;
    }

    var tapTimeDiff = new Date().getTime() - this.touchStartTime;
    var tap = document.createEvent('Event');
    var eventName = tapTimeDiff > 800 ? EventType.LONG_TAP : EventType.TAP;
    tap && tap.initEvent(eventName, true, true); // Target element fix for iOS6+

    var targetElement = e.target;
    if (deviceIsIOSWithBadTarget) targetElement = document.elementFromPoint(changedTouch.pageX - window.pageXOffset, changedTouch.pageY - window.pageYOffset);
    targetElement.dispatchEvent(tap);
  }

}

exports.default = GestureHandler;
},{"./math":"../node_modules/erste/src/lib/base/math.js"}],"../node_modules/erste/src/lib/base/uid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let counter = Math.floor(Math.random() * 2147483648);
/**
 * Returns a unique identifier string, which is an auto-incremented
 * base-36 counter.
 *
 * @return {string}
 */

const getUid = () => (counter++).toString(36);

var _default = getUid;
exports.default = _default;
},{}],"../node_modules/erste/src/lib/base/component-manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gestureHandler = _interopRequireDefault(require("./gesture-handler"));

var _uid = _interopRequireDefault(require("./uid"));

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const events = ['blur', 'click', 'mouseover', 'mouseout', 'mousemove', 'mousedown', 'mouseup', 'scroll', 'keyup', 'keypress', 'focus', 'paste', 'input', 'touchstart', 'touchmove', 'touchend', 'tap', 'longtap', 'doubletap', 'press', 'pan', 'swipe', 'swipeTop', 'swipeRight', 'swipeBottom', 'swipeLeft']; // match & select "[eventType] [css selector]"

const handlerMethodPattern = new RegExp(`^(${events.join('|')}) (.*)`);
/**
 * Fills events object of given component class from method names that match event handler pattern.
 *
 * @param {!Component} comp Component instance to decorate events for.
 */

function decorateEvents(comp) {
  const prototype =
  /** @type {!Function} */
  comp.constructor.prototype;
  if (prototype.__events) return;
  let events = {};

  if ('events' in prototype) {
    events = prototype.events;
  }

  Object.getOwnPropertyNames(prototype).map(propertyName => handlerMethodPattern.exec(propertyName)).filter(x => x).forEach(([methodName, eventType, eventTarget]) => {
    events[eventType] = events[eventType] || {};
    /** @suppress {checkTypes} */

    events[eventType][eventTarget] = comp[methodName];
  });
  prototype.__events = events;
}

const createElement = (() => {
  const tempDiv = document.createElement('div');
  return htmlString => {
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.removeChild(tempDiv.firstChild);
  };
})();

class ComponentManager {
  constructor() {
    this.componentRegistry = {};
    this.componentsToRender = {};
    this.gestureHandler = undefined;
    if (document.body) this.onLoad();else document.addEventListener('DOMContentLoaded', () => this.onLoad());
    this.getUid = _uid.default;
    this.createElement = createElement;
  }

  handleEvent(e) {
    e.targetEl = e.target;
    let comps = this.getParentComps(e.target),
        broken = false;

    do {
      if (broken) break;
      e['targetEl'] = e.targetEl;
      broken = this.callHandlers(comps, e);
    } while ((e.targetEl = e.targetEl.parentNode) && e.targetEl != document.body);
  }

  onLoad() {
    events.forEach(type => document.body.addEventListener(type, this.handleEvent.bind(this)));
    this.gestureHandler = new _gestureHandler.default();
    new MutationObserver(mutations => {
      for (let cmpId in this.componentsToRender) {
        const rendered = this.componentsToRender[cmpId].render();
        if (rendered) delete this.componentsToRender[cmpId];
      }
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  getParentComps(child) {
    let node = child,
        parentComps = [],
        comp,
        ids;

    if (ids = node.parentComps) {
      ids.split(',').forEach(id => parentComps.push(this.componentRegistry[id]));
      return parentComps;
    }

    ids = [];

    do {
      if (comp = this.componentRegistry[node.id]) {
        parentComps.push(comp);
        ids.push(node.id);
      }
    } while (node = node.parentNode);

    child.parentComps = ids.join(',');
    return parentComps;
  }
  /**
  * Given a list of componentsRegistry, checks whether any component would
  * respond to the given event and if so, executes the event handler
  * defined in the component.
  */


  callHandlers(comps, e) {
    let broken = false;

    for (let i = 0; i < comps.length; i++) {
      let comp = comps[i];
      const events = comp && comp.__events;
      let handlers = events[e.type];
      if (!handlers) continue;
      let selectors = Object.keys(handlers);

      if (this.callHandler(comp, e, handlers, selectors) === false) {
        broken = true;
        break;
      }
    }

    return broken;
  }

  callHandler(comp, e, handlers, selectors) {
    let rv = true;
    selectors.forEach(selector => {
      if (e.targetEl.matches && e.targetEl.matches(selector)) {
        let targetComponent = this.getComponent(e.targetEl.id);
        rv = handlers[selector].call(comp, e, targetComponent);
      }
    });
    return rv;
  }
  /**
  * Given an id, returns a component in the registry.
  *
  * @param {string} id Id for the component instance.
  */


  getComponent(id) {
    return this.componentRegistry[id];
  }
  /**
  * Registers a component to the component registry, setting it up for render if it hasn't already
  * been rendered.
  *
  * Also, if this is the first time this type of component is registered, it checks and decomposes
  * the event handler declaration syntax sugar.
  *
  * @param {!Component} comp Component instance to register.
  */


  setComponent(comp) {
    this.componentRegistry[comp.id] = comp;
    if (!comp.rendered) this.componentsToRender[comp.id] = comp;
    if (!comp.__events) decorateEvents(comp);
  }
  /**
  * Given an id, removes a component from the registry.
  *
  * @param {!Component} comp Component instance to remove.
  */


  removeComponent(comp) {
    delete this.componentRegistry[comp.id];
    delete this.componentsToRender[comp.id];
  }
  /**
  * Given an id, marks a component as rendered, removing it from the render queue.
  *
  * @param {!Component} comp Component instance to mark as rendered.
  */


  markComponentRendered(comp) {
    delete this.componentsToRender[comp.id];
  }

  static getInstance() {
    if (!ComponentManager.instance) ComponentManager.instance = new ComponentManager();
    return ComponentManager.instance;
  }

}

exports.default = ComponentManager;
},{"./gesture-handler":"../node_modules/erste/src/lib/base/gesture-handler.js","./uid":"../node_modules/erste/src/lib/base/uid.js","./component":"../node_modules/erste/src/lib/base/component.js"}],"../node_modules/erste/src/lib/base/eventemitter3.js":[function(require,module,exports) {
// @ts-nocheck
/*!
 * EventEmitter3
 *
 * https://www.github.com/primus/eventemitter3
 *
 * Copyright (c) 2014 Arnout Kazemier
 */

/**
 * Forked/adapted from https://www.github.com/primus/eventemitter3
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Arnout Kazemier
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

var has = Object.prototype.hasOwnProperty
    , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() { }

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    Events.prototype = Object.create(null);

    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(string|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
    }

    var listener = new EE(fn, context || emitter, once)
        , evt = prefix ? prefix + event : event;

    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [emitter._events[evt], listener];

    return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(string|Symbol|number)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
    var names = []
        , events
        , name;

    if (this._eventsCount === 0) return names;

    for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }

    if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event
        , handlers = this._events[evt];

    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
    }

    return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @returns {number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event
        , listeners = this._events[evt];

    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @param {*=} a1
 * @param {*=} a2
 * @param {*=} a3
 * @param {*=} a4
 * @param {*=} a5
 * @returns {boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return false;

    var listeners = this._events[evt]
        , len = arguments.length
        , args
        , i;

    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
        case 1: return listeners.fn.call(listeners.context), true;
        case 2: return listeners.fn.call(listeners.context, a1), true;
        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length
            , j;

        for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

            switch (len) {
            case 1: listeners[i].fn.call(listeners[i].context); break;
            case 2: listeners[i].fn.call(listeners[i].context, a1); break;
            case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
            case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
            default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                }

                listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }

    return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(string|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return this;
    if (!fn) {
        clearEvent(this, evt);
        return this;
    }

    var listeners = this._events[evt];

    if (listeners.fn) {
        if (
            listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
        ) {
            clearEvent(this, evt);
        }
    } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (
                listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
            ) {
                events.push(listeners[i]);
            }
        }

        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
    }

    return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(string|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;

    if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
    } else {
        this._events = new Events();
        this._eventsCount = 0;
    }

    return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
    module.exports = EventEmitter;
}

},{}],"../node_modules/erste/src/lib/base/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentManager = _interopRequireDefault(require("./component-manager"));

var _eventemitter = _interopRequireDefault(require("./eventemitter3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * {@link Component} is a role that determines an aspect of your user interface.
 * It defines what your users see on the page. Every {@link Component} includes
 * a set of behaviors, like what happens when a user clicks on a button.
 *
 * {@link Component}s should be dummy, in that they should have no memory,
 * or state, of their own. {@link Component}s know how to draw a user interface
 * and how to handle user input; whose business logic should be delegated to
 * other classes in the system.
 *
 * @extends {EventEmitter}
 */
class Component extends _eventemitter.default {
  /**
   * Creates a new {@link View} instance. Users should subclass this class
   * to incorporate their own functionality, as the default View instance
   * doesn't provide anything out of the box.
   *
   * @example
   *
   * import {Component} from 'erste';
   *
   * class ButtonWithLabel extends Component {
   *     template() {
   *         return `
   *         <button-with-label>
   *             <h1>Hello world!</h1>
   *             <button>Tap me!</button>
   *         </button-with-label>
   *         `;
   *     }
   *
   *     onTapButton() {
   *         this.$('h1').innerText = 'Thanks for the tap!';
   *     }
   *
   *     get events() {
   *         return {
   *             'tap': {
   *                 'button': this.onTapButton
   *             }
   *         }
   *     }
   * }
   *
   * @param {Object!} props Properties that will be saved as `this.props`.
   */
  constructor(props = {}) {
    super();
    /**
     * @type {string}
     *
     * @private
     * @const
     */

    this.id_ = _componentManager.default.getInstance().getUid();
    /**
     * @type {?HTMLElement}
     *
     * @private
     */

    this.element_ = null;
    /**
     * The HTML template of a {@link Component}.
     *
     * @type {?string}
     *
     * @private
     */

    this.template_ = null;
    /**
     * Whether the {@link Component} has been rendered into the DOM.
     *
     * @type {boolean}
     *
     * @private
     */

    this.rendered_ = false;
    /**
     * @export
     *
     * An object that holds the properties passed to the constructor at instantiation.
     *
     * @type {!Object}
     */

    this.props = props;

    _componentManager.default.getInstance().setComponent(this);

    this.created(this.props);
    this.createdHooks(this.props);
  }
  /**
   * @export
   *
   * This method is called after a {@link Component} is created, but before it's
   * rendered into the DOM.
   *
   * Subclasses should override this method for tasks that should be done
   * when the {@link Component} is created. It's a convenient method that can be
   * used instead of overriding the constructor.
   *
   * @param {!Object} props The properties passed onto this {@link Component}
   * at instantiation.
   */


  created(props) {}
  /**
   * @export
   *
   * This method is called after a {@link Component} is created, but before it's
   * rendered into the DOM.
   *
   * Plugins should override this method for tasks that should be done
   * when the {@link Component} is created. It's a convenient method that can be
   * used instead of overriding the constructor.
   *
   * @param {!Object} props The properties passed onto this {@link Component}
   * at instantiation.
   */


  createdHooks(props) {}
  /**
   * @export
   *
   * The auto-generated, unique id of the {@link Component}.
   *
   * @return {string}
   */


  get id() {
    return this.id_;
  }
  /**
   * @export
   *
   * The DOM element of the {@link Component}. This is a getter that first
   * checks whether the component has been rendered as a DOM element, and
   * returns the `HTMLElement` if so. If the component hasn't been rendered
   * yet, it looks for the element in the DOM. If it's still not yet in the
   * DOM, it renders the element to a DOM element and returns it accordingly.
   *
   * @return {!HTMLElement}
   */


  get el() {
    let rv = this.element_;

    if (!rv) {
      rv = this.element_ =
      /** @type {!HTMLElement} */
      document.getElementById(this.id) || _componentManager.default.getInstance().createElement(this.toString());
    }

    return rv;
  }
  /**
   * Provides template for populating the `id` field of a component.
   *
   * Should not be overridden.
   *
   * @protected
   */


  tagExtension_() {
    return `$1 id="${this.id}"`;
  }
  /**
   * @export
   *
   * This method makes sure that users can conveniently include
   * {@link Component}s in the template of an owner component. Whenever a
   * {@link Component} is cast to a string, we calculate the template and
   * return it.
   *
   * Notice that this is only a template, and does not correspond to the
   * actual {@link Component} instance. In other words, one can't move a
   * {@link Component} instance from a parent to a new parent simply by using
   * its template in the new parent.
   *
   * @override
   */


  toString() {
    if (this.template_) return this.template_;
    var tagRegex = /^(<[^>]+)/;
    var template = this.template(this.props).trim();
    if (!template.match(tagRegex)) throw Error('Template needs to start with a valid tag.');
    template = template.replace(/\s+/, ' ').replace(tagRegex, this.tagExtension_());
    this.template_ = template;
    return this.template_;
  }
  /**
   * @export
   *
   * Given a query selector, returns an array of child `Element`s of this
   * {@link Component} or an empty array if no results are found. This is a
   * wrapper around `el.querySelectorAll`, and conveniently returns an array
   * instead of a `NodeList`, so all array operations work.
   *
   * @param {string} selector Selector to retrieve child `Element`s
   * @return {!Array.<!Element>} The list of child `Element`s or an empty list
   */


  $$(selector) {
    let rv = [],
        el = this.el;
    if (el) rv = [...el.querySelectorAll(selector)];
    return rv;
  }
  /**
   * @export
   *
   * Given a query selector, returns the first child `Element` of this
   * {@link Component} or null if no results are found or the
   * {@link Component} hasn't been rendered yet. This is a wrapper around
   * `el.querySelector`.
   *
   * @param {string} selector Selector
   * @return {?HTMLElement}
   */


  $(selector) {
    let rv = null,
        el = this.element_;
    if (el) rv = selector == undefined ? el :
    /** @type {HTMLElement} */
    el.querySelector(selector);
    return rv;
  }
  /**
   * @export
   *
   * Renders the {@link Component} into a given parent DOM element and returns
   * the result. May be called with an optional index to indicate where the
   * DOM element of this {@link Component} should be inserted in the parent.
   *
   * @param {!HTMLElement} rootEl Root element to render this component in.
   * @param {number=} opt_index The index of this component within the parent
   * component. This may be used to render a new child before an existing
   * child in the parent.
   *
   * @return {boolean} Whether the component is rendered. Note that it might
   * have already been rendered, not as a direct result of this call to
   * {@link #Component+render|component.render()}.
   */


  render(rootEl, opt_index) {
    if (this.rendered_) return true;

    if (!this.element_) {
      var el =
      /** @type {HTMLElement} */
      document.getElementById(this.id);
      if (!el && !rootEl) return false;

      if (el) {
        rootEl =
        /** @type {!HTMLElement} */
        el.parentElement;

        if (!opt_index) {
          this.element_ = el;
          this.rendered_ = true;
          this.onAfterRender();
          this.onAfterRenderHooks();
          setTimeout(() => requestAnimationFrame(() => this.onAfterRenderAsync()));
          return true;
        }
      }

      var index = opt_index ? opt_index : rootEl && rootEl.children.length - 1 || -1;
      var child = rootEl && rootEl.children[index];
      rootEl && rootEl.insertBefore(this.el, child || null);
      this.rendered_ = true;
    }

    this.onAfterRender();
    this.onAfterRenderHooks();
    setTimeout(() => requestAnimationFrame(() => this.onAfterRenderAsync()));
    return true;
  }
  /**
   * @export
   */


  get rendered() {
    if (!this.rendered_) {
      var el = document.getElementById(this.id);

      if (el) {
        this.element_ =
        /** @type {HTMLElement} */
        el;
        this.rendered_ = true;
        this.onAfterRender();
        this.onAfterRenderHooks();
      }
    }

    return this.rendered_;
  }
  /**
   * @export
   *
   * This method is called after a render process either as a direct result
   * of a {@link #Component+render|component.render()} call or after the
   * template of this component is inserted into the DOM.
   *
   * Subclasses should override this method for tasks that should be done
   * when the {@link Component} is in the document.
   */


  onAfterRender() {}
  /**
   * @export
   *
   * This method is called after a render process either as a direct result
   * of a {@link #Component+render|component.render()} call or after the
   * template of this component is inserted into the DOM. The main difference
   * with {@link #Component+onAfterRender|component.onAfterRender()} is that
   * this method is for operations that need to be implemented
   * asynchronously — such as CSS transitions. Effectively, this saves you
   * from calling requestAnimationFrame or setTimeout yourself.
   *
   * Subclasses should override this method for tasks that should be done
   * asynchronously after the {@link Component} is rendered in the document.
   */


  onAfterRenderAsync() {}
  /**
   * @export
   *
   * This method is called after a {@link Component} is rendered.
   *
   * Plugins should override this method for tasks that should be done
   * when the {@link Component} is rendered. It's a convenient method that
   * can be used instead of overriding `onAfterRender`.
   */


  onAfterRenderHooks() {
    const attachEvents = eventName => {
      if (!this.__events[eventName]) return;
      Object.keys(this.__events[eventName]).forEach(selector => {
        const els = this.$$(selector);

        const fn = this.__events[eventName][selector].bind(this);

        els.forEach(el => {
          el['__ersteEventHandlers'] = el['__ersteEventHandlers'] || {};
          el['__ersteEventHandlers'][eventName] = fn;
          el.addEventListener(eventName, fn);
        });
      });
    };

    attachEvents('focus');
    attachEvents('blur');
  }
  /**
   * @export
   *
   * Default template for {@link Component}s. Returns an empty `<div>` by
   * default and should be overridden to provide actual HTML templates.
   *
   * A template can also contain another {@link Component} directly, as in the
   * example below. This is a very handy way of rendering component
   * hierarchies.
   *
   * @example
   *
   * template() {
   *     this.buttonWithLabel = new ButtonWithLabel();
   *
   *     return `
   *     <div>
   *         <h1>Label</h1>
   *         ${this.buttonWithLabel}
   *     </div>
   *     `;
   * }
   *
   * @param {!Object} props The properties passed onto this {@link Component}
   * at instantiation.
   * @return {string}
   */


  template(props) {
    return `<div></div>`;
  }
  /**
   * @export
   *
   * This method should be called when this {@link Component} is being
   * removed.
   *
   * Make sure to override this method in your {@link Component}s if
   * they have side effects that should be cleared, e.g. removing event
   * listeners, and make sure to call `super()`.
   *
   * The base implementation here removes all event listeners attached to this
   * {@link Component} and also removes the {@link Component} from the
   * {@link ComponentManager}. Finally, it removes the DOM element from the
   * document.
   */


  dispose() {
    _componentManager.default.getInstance().removeComponent(this);

    this.removeAllListeners();

    const detachEvents = eventName => {
      if (!this.__events[eventName]) return;
      Object.keys(this.__events[eventName]).forEach(selector => {
        const els = this.$$(selector);
        els.forEach(el => {
          const fn = el['__ersteEventHandlers'][eventName];
          el.removeEventListener(eventName, fn);
        });
      });
    };

    detachEvents('focus');
    detachEvents('blur');
    this.element_ && this.element_.parentNode && this.element_.parentNode.removeChild(this.element_);
    this.element_ = null;
  }

}
/**
 * @export
 *
 * @type {Object|undefined}
 */


exports.default = Component;
Component.prototype.events = undefined;
/**
 * @type {Object|undefined}
 */

Component.prototype.__events = undefined;
},{"./component-manager":"../node_modules/erste/src/lib/base/component-manager.js","./eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js"}],"../node_modules/erste/src/lib/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./base/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The default view class for all the views in an erste application. A
 * {@link View} is simply a {@link Component} with additional
 * convenience features. For example, a {@link View} renders to `document.body`
 * by default, whereas a {@link Component} silently ignores the call if no root
 * is provided. Also, regardless of the template, a `view` attribute is added
 * to the root DOM elements of each {@link View}, so that uniform styling
 * across all views is possible without much heavy-lifting.
 *
 * For implementing full-screen, navigable views, users should subclass
 * {@link View}.
 *
 * erste requires you to manually instantiate
 * all the views in your application.
 *
 * @extends {Component}
 */
class View extends _component.default {
  /**
   * Creates a new {@link View} instance. Users should subclass this class
   * to incorporate their own functionality, as the default View instance
   * doesn't provide anything out of the box.
   *
   * @example
   *
   * class RootView extends erste.View {
   *     template() {
   *         return `
   *         <root-view>
   *             <h1>Hello world!</h1>
   *             <button>Click me!</button>
   *         </root-view>
   *         `;
   *     }
   *
   *     onTapButton() {
   *         this.$('h1').innerText = 'Thanks for the tap!';
   *     }
   *
   *     get events() {
   *         return {
   *             'tap': {
   *                 'button': this.onTapButton
   *             }
   *         }
   *     }
   * }
   *
   * new RootView().render(); // renders into body.
   *
   * @param {!Object} props Properties that will be saved as `this.props`.
   */
  constructor(props = {}) {
    super(props);
  }
  /**
   * Renders the view into a parent DOM element. The default root element
   * is `document.body`, so for the sake of simplicity, one can just call
   * `view.render()` to render the view into the DOM.
   *
   * @override
   *
   * @param {?HTMLElement=} opt_rootEl=document.body Root element
   * to render this view in.
   * @param {number=} opt_index The index of this view in z-axis.
   */


  render(opt_rootEl = document.body, opt_index = 0) {
    this.index = opt_index;
    return super.render(
    /** @type {!HTMLElement} */
    opt_rootEl);
  }
  /**
   * This method is similar to `viewDidAppear` or `componentDidMount` methods
   * found in other frameworks. It's called automatically when the view is
   * rendered into the DOM. This method already sets the`z-index` property
   * and accompanying CSS transforms appropriately, positioning the view to
   * its correct place.
   *
   * Override to provide custom functionality after the view's root element
   * enters the DOM. This can be listening to additional DOM events or
   * manipulating element properties.
   *
   * Make sure to call `super.onAfterRender()` when you override this method.
   *
   * @override
   */


  onAfterRender() {
    super.onAfterRender();
    this.el.style.zIndex = String(this.index);
    this.el.style.transform = `translate3d(0, 0, ${this.index}px)`;
  }
  /**
   * @export
   *
   * This method is called after the view is activated by a ViewManager, i.e.,
   * either `pull`ed or set as the current view using
   * {@link ViewManager#setCurrentView|setCurrentView}.
   *
   * Subclasses should override this method for tasks that should be done
   * when the View is in viewport, such as updating information, etc.
   */


  onActivation() {}
  /**
   * @export
   * 
   * This method is called to animate in a view.
   *
   * Subclasses should override this method to take controll over the way
   * the `currentView` ot the `lastView` is animated in when `pull`ed or `push`ed.
   * 
   * @param {boolean} isTheViewBeingPulled Whether the view is being `pull`ed or `push`ed
   */


  panIn(isTheViewBeingPulled) {
    if (isTheViewBeingPulled) {
      this.el.style.transitionDuration = '0s';
      this.el.style.transform = `translate3d(100%, 0, ${this.index}px)`;
      requestAnimationFrame(() => {
        this.el.style.transitionDuration = '0.35s';
        requestAnimationFrame(() => {
          this.el.style.transform = `translate3d(0, 0, ${this.index}px)`;
          this.el.style['boxShadow'] = '0 0 24px black';
        });
      });
    } else {
      window.requestAnimationFrame(() => {
        this.el.style.transitionDuration = '0s';
        this.el.style.transform = 'translate3d(-30%,0,0)';
        window.requestAnimationFrame(() => {
          this.el.style.transitionDuration = '0.35s';
          this.el.style.transform = `translate3d(0, 0, ${this.index}px)`;
        });
      });
    }
  }
  /**
   * @export
   * 
   * This method is called to animate out a view.
   *
   * Subclasses should override this method to take controll over the way
   * the `currentView` ot the `lastView` is animated out when `pull`ed or `push`ed.
   * 
   * @param {boolean} isTheViewBeingPulled Whether the view is being `pull`ed or `push`ed.
   */


  panOut(isTheViewBeingPulled) {
    const fn = () => {
      this.el.style.transitionDuration = '0s';
      this.el.style.transform = 'translate3d(-100%,-100%,0)';
      this.el.removeEventListener('transitionend', fn);
    };

    this.el.addEventListener('transitionend', fn);

    if (isTheViewBeingPulled) {
      requestAnimationFrame(() => {
        this.el.style.transitionDuration = '0.35s';
        requestAnimationFrame(() => {
          this.el.style.transform = `translate3d(-30%, 0, ${this.index}px)`;
        });
      });
    } else {
      window.requestAnimationFrame(() => {
        this.el.style.transitionDuration = '0s';
        window.requestAnimationFrame(() => {
          this.el.style.transitionDuration = '0.35s';
          this.el.style.transform = `translate3d(100%, 0, ${this.index}px)`;
          this.el.style['boxShadow'] = '0 0 0 black';
        });
      });
    }
  }

  backGestureTouchMoveLastViewAnimation({
    lastViewDiff,
    currentViewIndex
  }) {
    window.requestAnimationFrame(() => {
      this.el.style.transitionDuration = '0s';
      this.el.style.transform = `translate3d(${lastViewDiff}px, 0, ${currentViewIndex - 1}px)`;
    });
  }

  backGestureTouchMoveCurrentViewAnimation({
    currentViewDiff,
    boxShadow
  }) {
    window.requestAnimationFrame(() => {
      this.el.style.transitionDuration = '0s';
      this.el.style.transform = `translate3d(${currentViewDiff}px, 0, ${this.index}px)`;
      this.el.style['boxShadow'] = `0px 0 24px rgba(0, 0, 0, ${boxShadow})`;
    });
  }
  /**
   * Default template for views. Uses a custom element `<view>`, which should
   * be set to `display: block` for proper looks.
   *
   * @example
   * You can use the following CSS rule in your implementation:
   *
   * ```css
   * [view] {
   *     position: absolute;
   *     transition: transform .35s;
   *     z-index: 0;
   *     top: 0px;
   *     bottom: 0px;
   *     width: 100%;
   *     overflow: hidden;
   *     -webkit-overflow-scrolling: touch;
   * }
   * ```
   * @override
   */


  template() {
    return `
<view></view>
`;
  }
  /**
   * Provides template for populating the `id` field and adding the `view`
   * attribute.
   *
   * Should not be overridden.
   *
   * @override
   *
   * @protected
   */


  tagExtension_() {
    return `$1 id="${this.id}" view`;
  }
  /**
   * @export
   *
   * Returns the width of the viewport in pixels.
   *
   * @return {number} The device width.
   */


  static get WIDTH() {
    if (!View.width_) {
      var bodyStyle = window.getComputedStyle(document.body, null);
      var width = parseInt(bodyStyle && bodyStyle.width || '0', 10);
      View.width_ = width;
      return View.width_;
    } else {
      return View.width_;
    }
  }

}
/**
 * @static @type {?number} */


exports.default = View;
View.width_ = null;
/**
 * @export
 *
 * View index in z-axis. This is used as the Z-value for initial translate3d
 * CSS declaration.
 *
 * @type {number}
 */

View.prototype.index = 0;
/**
 * @export
 *
 * Determines whether the view should support back gestures to
 * go back in history of a {@link ViewManager}.
 *
 * @type {boolean}
 */

View.prototype.supportsBackGesture = false;
/**
 * @export
 *
 * Determines the touch area width of the back gesture
 *
 * @type {number}
 */

View.prototype.backGestureTouchTargetWidth = 50;
/**
 * @export
 *
 * Determines whether the view allows swipe / drag gestures to reveal an
 * associated sidebar. This lets the view manager orchestrate the touch gestures
 * for revealing the sidebar menu.
 *
 * @type {boolean}
 */

View.prototype.hasSidebar = false;
},{"./base/component":"../node_modules/erste/src/lib/base/component.js"}],"../node_modules/erste/src/lib/view-manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

var _componentManager = _interopRequireDefault(require("../lib/base/component-manager"));

var _math = _interopRequireDefault(require("../lib/base/math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This class handles view transitions and view history in a consistent
 * manner similar to `NavigationController`s in other frameworks.
 * An instance of this class should be used by views that will contain other
 * views, and will allow navigation in between them.
 *
 * Also, each multi-view application should have at least one root
 * {@link ViewManager}.
 */
class ViewManager {
  /**
   * {@link ViewManager} constructor. At least one {@link ViewManager} should
   * be present in all multi-view erste applications.
   *
   * @param {(!Element|!View)=} opt_root Root element for this
   * {@link ViewManager}.
   *
   * Default is `document.body`. Can also be a {@link View}, in which case the
   * root element will be the {@link View#el} of the aforementioned View. In
   * this case, the View instance should be rendered before any
   * view interactions are done via {@link #ViewManager+pull|viewManager.pull}
   * or other {@link ViewManager} methods.
   */
  constructor(opt_root) {
    /**
     * @export
     *
     * Array of views stored in memory. When
     * {@link #ViewManager+pull|viewManager.pull} is called with the second
     * argument set to `true`, meaning the user should be able to go back,
     * the current view is pushed to this array.
     *
     * When it's time to reset the history, all views in history are
     * disposed.
     *
     * @type {!Array.<!View>}
     */
    this.history = [];
    /**
     * @private
     *
     * @type {!Array.<number>}
     */

    this.lastTouches_ = [];
    /**
     * Initial state of the `viewManager`. Indicates the sidebar is off and
     * there are no active gestures on the root element.
     *
     * @private
     *
     * @type {ViewManager.State}
     */

    this.state_ = ViewManager.State.DEFAULT;
    /**
     * @private
     *
     * @type {?HTMLElement}
     */

    this.rootEl_ = null;
    /**
     * @export
     *
     * Current active view.
     *
     * @type {?View}
     */

    this.currentView = null;
    /**
     * @private
     */

    this.hideSidebarTimeout_ = null;
    /**
     * @private
     *
     * @type {number}
     */

    this.firstX_ = 0;
    /**
     * @private
     *
     * @type {boolean}
     */

    this.initialized_ = false;
    /**
     * @private
     *
     * @type {(!Element|!View|undefined)}
     */

    this.root_ = undefined;

    if (opt_root) {
      this.root_ = opt_root;
    }
  }
  /**
   * @private
   */


  init_() {
    this.initialized_ = true;

    if (this.root_ instanceof _view.default) {
      var rootView =
      /** @type {!View} */
      this.root_;
      if (!rootView.rendered) throw new Error(`View Manager's root is not rendered yet`);else this.rootEl_ = rootView.el;
    } else this.rootEl_ =
    /** @type {?HTMLElement} */
    this.root_ || document.body;

    this.initTouchEvents_();
  }
  /**
   * @export
   *
   * Returns the last view in this {@link ViewManager}'s
   * {@link #ViewManager+history|history}, and null if the
   * {@link #ViewManager+history|history} is empty.
   *
   * This may be used to send messages to whatever the previous {@link View}
   * is in the history right before a
   * {@link #ViewManager+pull|viewManager.push()} call.
   *
   * @return {?View}
   */


  getLastViewInHistory() {
    return this.history[this.history.length - 1] || null;
  }
  /**
   * @export
   *
   * @param {!View} view {@link View} instance to pull into the scene.
   * @param {boolean=} opt_canGoBack Whether the {@link ViewManager} should
   * keep history so that one can go back to the previous {@link View}.
   *
   * Has a hard-coded transition effect similar to iOS7+.
   */


  pull(view, opt_canGoBack) {
    if (!this.initialized_) this.init_();
    if (!view.rendered && this.rootEl_) view.render(this.rootEl_, this.topIndex_ += 2);
    var currentView = this.currentView;
    if (!currentView) return this.setCurrentView(view);

    if (opt_canGoBack) {
      this.history.push(currentView);
    } else {
      var history = this.history.slice(0);
      this.history = [];
      setTimeout(() => {
        currentView.dispose(); // Dispose all views in history.

        history.forEach(historicView => historicView.dispose());
      }, 1000);
    }

    view.panIn(true);
    currentView.panOut(true);
    this.currentView = view;
    this.currentView.onActivation && this.currentView.onActivation();
    this.state_ = ViewManager.State.DEFAULT;
  }
  /**
   * @export
   *
   * Returns true if there is one or more views in history,
   * returns false otherwise.
   *
   * @return {boolean} Whether the view manager can push current view.
   */


  canGoBack() {
    return this.history && this.history.length > 0;
  }
  /**
   * @export
   *
   * Switches to the previous view if there's one, and ignores the call if
   * the {@link #ViewManager+history|history} is empty.
   *
   * Has a hard-coded transition effect similar to iOS7+.
   */


  push() {
    var lastView = this.history.pop(),
        currentView = this.currentView;
    if (!lastView) return;
    if (!this.initialized_) this.init_();
    lastView.panIn(false);
    currentView.panOut(false);
    this.currentView = lastView;
    lastView.onActivation && lastView.onActivation();
    setTimeout(() => currentView.dispose(), 1000);
    this.state_ = ViewManager.State.DEFAULT;
  }
  /**
   * @export
   *
   * Makes a given view the foremost view without animations and with
   * disposing previous views in history.
   *
   * @param {!View} view The view to set as the foremost view.
   * @param {boolean=} opt_noDispose Whether to dispose the current view.
   */


  setCurrentView(view, opt_noDispose) {
    if (!this.initialized_) this.init_();
    if (!view.rendered && this.rootEl_) view.render(this.rootEl_, this.topIndex_ += 2);
    var currentView = this.currentView;

    if (!opt_noDispose) {
      setTimeout(() => currentView && currentView.dispose(), 1000);
    } else if (currentView) {
      currentView.el.style.transitionDuration = '0s';
      currentView.el.style.transform = `translate3d(100%, 0, ${currentView.index}px)`;
    }

    view.index = this.topIndex_ += 2;
    this.currentView = view;
    this.currentView.onActivation && this.currentView.onActivation(); // Dispose all views in history.

    this.history.forEach(historicView => historicView.dispose());
    this.history = [];
    var translation = `translate3d(0, 0, ${view.index}px)`;
    view.el.style.transitionDuration = '0s';

    if (this.state_ == ViewManager.State.SIDEBAR_OPEN) {
      translation = `translate3d(${128 - _view.default.WIDTH}px, 0, ${view.index}px)`;
      view.el.style.transform = translation;
      this.toggleSidebar_(false);
      return;
    }

    view.el.style.zIndex = String(view.index);
    view.el.style.transform = translation;
    this.state_ = ViewManager.State.DEFAULT;
  }
  /**
   * @export
   *
   * Toggles the sidebar on or off according to its current state.
   * This is to be used for a menu button, for example.
   */


  toggleSidebar() {
    if (!this.initialized_) this.init_();
    this.toggleSidebar_(this.state_ == ViewManager.State.DEFAULT);
  }
  /**
   * Initializes touch event handlers for all touch end and touch move
   * events ocurring on the root element.
   *
   * @private
   */


  initTouchEvents_() {
    if (!this.rootEl_) return;
    this.rootEl_.addEventListener('touchmove', this.onTouchMove_.bind(this), false);
    this.rootEl_.addEventListener('touchend', this.onTouchEnd_.bind(this), false);
  }
  /**
   * Handles touch move events and decides how the view transitions should
   * occur.
   *
   * @private
   */


  onTouchMove_(e) {
    var clientX = e.changedTouches && e.changedTouches[0].clientX || 0;
    clearTimeout(this.hideSidebarTimeout_);
    if (this.state_ == ViewManager.State.DEFAULT || this.state_ == ViewManager.State.SIDEBAR_OPEN) this.firstX_ = clientX;

    if (this.state_ == ViewManager.State.DEFAULT) {
      this.lastTouches_ = [];
      this.state_ = ViewManager.State.STARTED_GESTURE;
    }

    if (this.state_ == ViewManager.State.STARTED_GESTURE) {
      if (clientX <= this.currentView.backGestureTouchTargetWidth) {
        if (this.history.length && this.currentView && this.currentView.supportsBackGesture) this.state_ = ViewManager.State.GOING_TO_BACK_VIEW;
      } else if (this.currentView && this.currentView.hasSidebar) {
        this.lastTouches_.push(this.firstX_ - clientX);
        if (this.lastTouches_.length == 4) this.lastTouches_.shift();
        if (this.lastTouches_[2] - this.lastTouches_[0] > 40) this.state_ = ViewManager.State.OPENING_SIDEBAR;
      }
    }

    if (this.state_ == ViewManager.State.SIDEBAR_OPEN) this.state_ = ViewManager.State.CLOSING_SIDEBAR;

    switch (this.state_) {
      case ViewManager.State.GOING_TO_BACK_VIEW:
        this.backGestureTouchMove_(e);
        break;

      case ViewManager.State.CLOSING_SIDEBAR:
        this.closeSidebarTouchMove_(e);
        break;

      case ViewManager.State.OPENING_SIDEBAR:
        this.openSidebarTouchMove_(e);
        break;
    }
  }
  /**
   * Handles touch end events and decides how the view transitions should
   * follow.
   *
   * @private
   */


  onTouchEnd_(e) {
    var state;

    switch (this.state_) {
      case ViewManager.State.GOING_TO_BACK_VIEW:
        this.backGestureTouchEnd_(e);
        break;

      case ViewManager.State.OPENING_SIDEBAR:
        state = true;
        if (this.lastTouches_[2] - this.lastTouches_[0] < 3) state = false;
        this.toggleSidebar_(state);
        break;

      case ViewManager.State.CLOSING_SIDEBAR:
        state = true;
        if (this.lastTouches_[2] - this.lastTouches_[0] < -3) state = false;
        this.toggleSidebar_(state);
        break;

      case ViewManager.State.SIDEBAR_OPEN:
        if (_componentManager.default.getInstance().gestureHandler.canTap) return;
        this.toggleSidebar_(false);
        break;

      default:
        this.state_ = ViewManager.State.DEFAULT;
    }
  }
  /**
   * Handles touch end event when they occur in a back gesture.
   *
   * @private
   * @param {!TouchEvent} e Touch end event.
   */


  backGestureTouchEnd_(e) {
    if (!this.firstX_) return;

    var history = this.history,
        lastView = this.getLastViewInHistory(),
        currentView = this.currentView,
        clientX = e.changedTouches && e.changedTouches[0].clientX || 0,
        duration = _math.default.lerp(0.15, 0.35, (_view.default.WIDTH - clientX) / _view.default.WIDTH);

    window.requestAnimationFrame(() => {
      currentView.el.style.transitionDuration = duration + 's';
      lastView.el.style.transitionDuration = duration + 's';
      var currentViewX = '100%',
          lastViewX = '0';

      if (clientX < _view.default.WIDTH / 2) {
        currentViewX = '0';
        lastViewX = '-30%';

        const fn = () => {
          lastView.el.style.transitionDuration = '0s';
          lastView.el.style.transform = 'translate3d(-100%,-100%,0)';
          lastView.el.removeEventListener('transitionend', fn);
        };

        lastView.el.addEventListener('transitionend', fn);
      } else {
        this.currentView =
        /** View */
        this.getLastViewInHistory();
        history.pop();
        lastView.onActivation && lastView.onActivation();
        setTimeout(() => {
          currentView.dispose();
        }, 1000);
      }

      currentView.el.style.transform = `translate3d(${currentViewX}, 0, ${currentView.index}px)`;
      lastView.el.style.transform = `translate3d(${lastViewX}, 0, ${currentView.index - 1}px)`;
      currentView.el.style['boxShadow'] = '0px 0 0px black';
    });
    this.state_ = ViewManager.State.DEFAULT;
  }
  /**
   * Handle touch move events when they occur in a back gesture.
   *
   * @private
   * @param {!TouchEvent} e Touch end event.
   */


  backGestureTouchMove_(e) {
    if (!this.history.length) return;
    /* Google Chrome will fire a touchcancel event about 200 milliseconds
     after touchstart if it thinks the user is panning/scrolling and you
     do not call event.preventDefault(). */

    e.preventDefault();
    var clientX = e.changedTouches && e.changedTouches[0].clientX || 0;
    var lastView = this.history[this.history.length - 1];
    var currentView = this.currentView;
    var currentViewDiff = clientX - this.firstX_;
    var viewWidth = _view.default.WIDTH;
    var lastViewDiff = Math.floor(_math.default.lerp(-viewWidth * 0.3, 0, currentViewDiff / (viewWidth - this.firstX_)));
    var boxShadow = Math.floor(_math.default.lerp(1, 0, currentViewDiff / (viewWidth - this.firstX_)) * 5) / 5;
    var currentViewIndex = currentView.index;
    if (currentViewDiff < 0) return;
    lastView.backGestureTouchMoveLastViewAnimation({
      lastViewDiff,
      currentViewIndex
    });
    currentView.backGestureTouchMoveCurrentViewAnimation({
      currentViewDiff,
      boxShadow
    });
  }
  /**
   * Close sidebar touch move functionality.
   *
   * @private
   * @param {!TouchEvent} e
   */


  closeSidebarTouchMove_(e) {
    var clientX = e.changedTouches && e.changedTouches[0].clientX || 0;
    this.lastTouches_.push(this.firstX_ - clientX);
    if (this.lastTouches_.length == 4) this.lastTouches_.shift();
    /* Google Chrome will fire a touchcancel event about 200 milliseconds
     after touchstart if it thinks the user is panning/scrolling and you
     do not call event.preventDefault(). */

    e.preventDefault();
    var currentView = this.currentView;
    var viewWidth = _view.default.WIDTH;
    var currentViewDiff = clientX - this.firstX_ - viewWidth * 4 / 5;
    window.requestAnimationFrame(() => {
      currentView.el.style.transitionDuration = '0s';
      currentView.el.style.transform = `translate3d(${currentViewDiff}px, 0, ${currentView.index}px)`;
    });
  }
  /**
   * Toggles the sidebar on or off according to a given state.
   *
   * @private
   * @param {boolean} state Whether to open or close the sidebar.
   */


  toggleSidebar_(state) {
    var currentView = this.currentView,
        sidebar =
    /** @type {HTMLElement} */
    document.querySelector('sidebar');
    requestAnimationFrame(() => {
      currentView.el.style.transitionDuration = '0.35s';
      var currentViewX = `${128 - _view.default.WIDTH}px`,
          sidebarX = '0',
          sidebarZ = `${currentView.index - 1}px`;

      if (!state) {
        currentViewX = '0';
        sidebarX = '100%';
        sidebarZ = '0';
        this.hideSidebarTimeout_ = setTimeout(() => {
          if (this.state_ == ViewManager.State.DEFAULT) sidebar.style.transform = `translate3d(${sidebarX}, 0, ${sidebarZ})`;
        }, 1000);
      } else {
        sidebar.style.transform = `translate3d(${sidebarX}, 0, ${sidebarZ})`;
      }

      currentView.el.style.transform = `translate3d(${currentViewX}, 0, ${currentView.index}px)`;
    });
    if (state) this.state_ = ViewManager.State.SIDEBAR_OPEN;else this.state_ = ViewManager.State.DEFAULT;
  }
  /**
   * Close sidebar touch move functionality.
   *
   * @private
   * @param {!TouchEvent} e
   */


  openSidebarTouchMove_(e) {
    if (_componentManager.default.getInstance().gestureHandler.canTap) return;
    var clientX = e.changedTouches && e.changedTouches[0].clientX || 0;
    this.lastTouches_.push(this.firstX_ - clientX);
    if (this.lastTouches_.length == 4) this.lastTouches_.shift();
    /* Google Chrome will fire a touchcancel event about 200 milliseconds
     after touchstart if it thinks the user is panning/scrolling and you
     do not call event.preventDefault(). */

    e.preventDefault();
    var sidebar =
    /** @type {HTMLElement} */
    document.querySelector('sidebar');
    var currentView = this.currentView;
    var currentViewDiff = clientX - this.firstX_;
    if (currentViewDiff >= 0) return;
    this.state_ = ViewManager.State.OPENING_SIDEBAR;
    window.requestAnimationFrame(() => {
      sidebar.style.transform = `translate3d(0, 0, ${currentView.index - 1}px)`;
      sidebar.style.transitionDuration = '0s';
      currentView.el.style.transitionDuration = '0s';
      currentView.el.style.transform = `translate3d(${currentViewDiff}px, 0, ${currentView.index}px)`;
    });
  }

}
/**
 * @export
 *
 * View manager states.
 *
 * @enum {string}
 */


ViewManager.State = {
  DEFAULT: 'default',
  STARTED_GESTURE: 'started',
  CLOSING_SIDEBAR: 'closingSidebar',
  OPENING_SIDEBAR: 'openingSidebar',
  SIDEBAR_OPEN: 'sidebarOpen',
  GOING_TO_BACK_VIEW: 'going'
};
/**
 * 3d transform Z position for the uppermost view.
 * Used to set the right view on top.
 *
 * @private
 *
 * @type {number}
 */

ViewManager.prototype.topIndex_ = 1;

window.requestAnimationFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || // @ts-ignore
  window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var _default = ViewManager;
exports.default = _default;
},{"./view":"../node_modules/erste/src/lib/view.js","../lib/base/component-manager":"../node_modules/erste/src/lib/base/component-manager.js","../lib/base/math":"../node_modules/erste/src/lib/base/math.js"}],"../node_modules/erste/src/lib/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * The default language
 *
 * @type {string}
 */
var defaultLang_ = 'en';
var dictionaries_ = {
  'en': {
    '__name': 'English'
  }
};
var dictionary_ = dictionaries_[defaultLang_];

const setDictionary = (lang, dict) => {
  dictionaries_[lang] = dict;
};
/**
 * Change the active dictionary
 *
 * @param {string} lang Language code.
 */


const setLanguage = lang => {
  dictionary_ = dictionaries_[lang];
};
/**
 * Return translation of the given text
 *
 * Look for a translation from goog.require()'d scripts.
 * Replace the variables inside the translation.
 * Return the same text if no translation found.
 *
 * Pass in variables as integers inside curly brackets.
 * {0} will be replaced by first argument and so on.
 *
 * @param  {string}    text    Text to be translated.
 * @param  {...*}      args    Translation arguments.
 * @return {string}    Localized string.
 */


const getLocalizedString = (text, ...args) => {
  var translation = dictionary_[text] || text;
  return translation.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

var _default = {
  /**
   * @export
   */
  setDictionary,

  /**
   * @export
   */
  setLanguage,

  /**
   * @export
   */
  getLocalizedString,

  /**
   * @export
   */
  __: getLocalizedString
};
exports.default = _default;
},{}],"../node_modules/erste/src/components/sidebar/sidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../lib/base/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
class Sidebar extends _component.default {
  constructor() {
    super();
    /**
     * @export
     */

    this.vm = null;
  }
  /**
   * @export
   *
   * Dispatches a switch view event to listeners and toggles the sidebar of the view manager that
   * is responsible for this sidebar.
   *
   * @param {!{targetEl: !Element}} e Tap event.
   */


  onSidebarItemTap(e) {
    var view = e.targetEl && e.targetEl.getAttribute && e.targetEl.getAttribute('data-view');
    if (!view) return;
    this.emit(Sidebar.EventType.SWITCH_VIEW, {
      view: view
    });
    this.vm && this.vm.toggleSidebar();
  }
  /**
   * @override
   */


  template() {
    return `
<sidebar>
    <sidebar-items>${this.template_items()}</sidebar-items>
</sidebar>
`;
  }
  /**
   * @export
   *
   * @return {string} Returns the items for the sidebar.
   */


  template_items() {
    return '';
  }
  /**
   * @enum {string} Dom mapping.
   */


  get mappings() {
    return {
      ITEM: 'sidebar-item'
    };
  }
  /**
   * @override
   */


  get events() {
    return {
      'tap': {
        [this.mappings.ITEM]: this.onSidebarItemTap
      }
    };
  }
  /**
   * @export
   */


  static get EventType() {
    return {
      SWITCH_VIEW: 'switchView'
    };
  }

}

var _default = Sidebar;
exports.default = _default;
},{"../../lib/base/component":"../node_modules/erste/src/lib/base/component.js"}],"../node_modules/erste/src/components/tab-view/tab-view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("../../lib/view"));

var _viewManager = _interopRequireDefault(require("../../lib/view-manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {View}
 */
class TabView extends _view.default {
  constructor() {
    super();
    /**
     * @export
     */

    this.vm = null;
    /**
     * @export
     *
     * @type {!Array.<!View>}
     */

    this.views = [];
    /**
     * @export
     */

    this.activeItemIndex = null;
  }
  /**
   * @override
   */


  onAfterRender() {
    super.onAfterRender();
    var $views = this.$(this.mappings.VIEWS);
    if (!$views) throw new Error('TabView template must have <views>');
    this.vm = new _viewManager.default($views);
    this.activateItem(0);
  }
  /**
   * @export
   *
   * @param {!{targetEl: !Element}} e Item touch event handler.
   */


  onItemTap(e) {
    var activeItem = this.$(this.mappings.ACTIVE_ITEM);
    if (activeItem && activeItem == e.targetEl) return;
    var items = this.$(this.mappings.ITEMS);
    var itemIndex = [].indexOf.call(items && items.children, e.targetEl);
    this.activateItem(itemIndex);
  }
  /**
   * @export
   *
   * Adds active class to item.
   * @param {number} index Index of the item to be active.
   */


  activateItem(index) {
    if (index < 0) return;
    this.deactivateActiveItem();
    var item = this.$$(this.mappings.ITEM)[index];
    item && item.classList.add('active');

    if (this.views && this.views[index]) {
      this.vm.setCurrentView(this.views[index], true);
      this.views[index].el.classList.add('active');
    }

    this.activeItemIndex = index;
  }
  /**
   * @export
   *
   * Activates a tab bar item with a given name. If an item for the given the name isn't found, does nothing.
   *
   * @param {string} name Name for the tab bar item.
   */


  activateItemByName(name) {
    var child = this.$(this.mappings.ITEM + '[data-view=' + name + ']');
    if (!child) return;
    var items = this.$(this.mappings.ITEMS);
    var itemIndex = [].indexOf.call(items && items.children, child);
    this.activateItem(itemIndex);
  }
  /**
   * @export
   *
   * Removes active class of active item.
   */


  deactivateActiveItem() {
    var activeThings = this.$$(this.mappings.ACTIVE);
    activeThings.forEach(el => el.classList.remove('active'));
  }
  /**
   * @override
   * @return {string} Base template of NavigationBar component.
   */


  template() {
    return `
<tab-view>
    ${this.template_views()}
    <tab-bar>
        <tab-items>
            ${this.template_items()}
        </tab-items>
    </tab-bar>
</tab-view>
`;
  }
  /**
   * @export
   *
   */


  template_views() {
    return `<views>${this.views.join('')}</views>`;
  }
  /**
   * @export
   *
   * @return {string} Template for tab bar items.
   */


  template_items() {
    return '';
  }
  /**
   * @enum {string} Dom mappings.
   */


  get mappings() {
    return {
      ITEM: 'tab-item',
      ITEMS: 'tab-items',
      ACTIVE: '.active',
      ACTIVE_ITEM: 'tab-items .active',
      ACTIVE_VIEW: 'views .active',
      VIEWS: 'views'
    };
  }
  /**
   * @override
   */


  get events() {
    return {
      'touchend': {
        [this.mappings.ITEM]: this.onItemTap.bind(this)
      }
    };
  }

}

exports.default = TabView;
},{"../../lib/view":"../node_modules/erste/src/lib/view.js","../../lib/view-manager":"../node_modules/erste/src/lib/view-manager.js"}],"../node_modules/erste/src/components/navbar/navbar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../lib/base/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
class NavBar extends _component.default {
  /**
   * Includes back button for back navigation.
   *
   * @param {NavBar.NavBarOptions=} opt_config Config parameters to
   *        include things like title.
   */
  constructor(opt_config = {
    hasBackButton: false,
    hasMenuButton: false,
    title: ''
  }) {
    super();
    /**
     * @export
     */

    this.vm = null;
    /**
     * @export
     */

    this.config = opt_config;
  }
  /**
   * @export
   *
   * Back button tap event handler.
   */


  onBackButtonTap() {
    this.vm && this.vm.push();
  }
  /**
   * @export
   */


  onMenuButtonTap() {
    this.vm && this.vm.toggleSidebar();
  }
  /**
   * @override
   */


  template() {
    var config = this.config,
        backButton = '',
        menuButton = '';
    if (config.hasBackButton) backButton = `<back-button></back-button>`;
    if (config.hasMenuButton) menuButton = `<menu-button></menu-button>`;
    return `
<nav-bar>${backButton}${menuButton}${config.title}</nav-bar>
`;
  }

  get mappings() {
    return {
      BACK_BUTTON: 'back-button',
      MENU_BUTTON: 'menu-button'
    };
  }
  /** @override */


  get events() {
    return {
      'tap': {
        [this.mappings.BACK_BUTTON]: this.onBackButtonTap,
        [this.mappings.MENU_BUTTON]: this.onMenuButtonTap
      }
    };
  }

}
/**
* @typedef {{hasBackButton: boolean, hasMenuButton: boolean, title: string}}
*/


NavBar.NavBarOptions = null;
var _default = NavBar;
exports.default = _default;
},{"../../lib/base/component":"../node_modules/erste/src/lib/base/component.js"}],"../node_modules/erste/src/components/pull-to-refresh/pull-to-refresh-model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventemitter = _interopRequireDefault(require("../../lib/base/eventemitter3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Model for the pull to refresh component. Manages refreshing states to prevent
 * performance problems like double actions.
 *
 * @extends {EventEmitter}
 */
class P2RComponentModel extends _eventemitter.default {
  constructor() {
    super();
    this.reset();
    this.state_ = this.State.DEFAULT;
  }

  reset() {
    this.state_ = this.State.DEFAULT;
  }
  /**
   * If the component is not in REFRESHING state, it should check to see if it
   * should refresh. This method will be triggered on every scroll event.
   */


  triggerShouldCheckState() {
    if (this.state_ != this.State.REFRESHING) this.state_ = this.State.SHOULD_CHECK;
  }
  /**
   * Informs the caller if this model is in an appropriate state for checking
   * the right (scroll) position.
   *
   * @return {boolean} Whether the component should check for the right
   *                   (scroll) position.
   */


  shouldCheck() {
    return this.state_ == this.State.SHOULD_CHECK;
  }
  /**
   * Dispatches a refresh event to inform the parent component that it's at the appropriate
   * position for refresh.
   */


  refresh() {
    if (!this.shouldCheck()) return;
    this.state_ = this.State.REFRESHING;
    this.emit(this.EventType.SHOULD_REFRESH);
  }
  /**
   * Pull to refresh states.
   *
   * @enum {string}
   */


  get State() {
    return {
      DEFAULT: 'default',
      SHOULD_CHECK: 'shouldCheck',
      REFRESHING: 'refreshing'
    };
  }
  /**
   * Event types for this model.
   *
   * @enum {string}
   */


  get EventType() {
    return {
      SHOULD_REFRESH: 'refresh'
    };
  }

}

exports.default = P2RComponentModel;
},{"../../lib/base/eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js"}],"../node_modules/erste/src/components/pull-to-refresh/pull-to-refresh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../lib/base/component"));

var _pullToRefreshModel = _interopRequireDefault(require("./pull-to-refresh-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
class PullToRefresh extends _component.default {
  /**
   * P2RComponent is a small component which checks the scroll position of a
   * given DOM element, and if it's in
   * an appropriate position, fires a REFRESH event for the parent component
   * to act upon. When the parent component is
   * done with refreshing, it should reset this P2RComponent with the
   * reset() method.
   *
   * @param {!HTMLElement=} opt_el Optional element to track its scroll.
   */
  constructor(opt_el) {
    super();
    this.model = new _pullToRefreshModel.default();
    /**
     * @export
     */

    this.EventType = this.model.EventType;
    this.scrollEl = null;
    this.containerEl = null;
    this.scrollListener_ = null;
    this.releaseListener_ = null;
    if (opt_el) this.register(opt_el);
    this.bindModelEvents();
  }

  bindModelEvents() {
    this.model.on(this.model.EventType.SHOULD_REFRESH, this.onShouldRefresh.bind(this));
  }
  /**
   * @export
   *
   * Triggered when the components decides a refresh action. This method should be overridden
   * to, for example, display a spinner animation during refresh.
   */


  onShouldRefresh() {
    var spinner = this.$(this.mappings.SPINNER);
    var arrow = this.$(this.mappings.ARROW);
    window.requestAnimationFrame(() => {
      this.containerEl.style.transform = `translateY(${this.height}px)`;
      this.containerEl.style.transition = '800ms cubic-bezier(.41,1,.1,1)';
      if (spinner) spinner.style.opacity = '1';
      if (arrow) arrow.style.opacity = '0';
      this.emit(this.model.EventType.SHOULD_REFRESH);
    });
  }
  /**
   * @override
   */


  onAfterRender() {
    super.onAfterRender();
    if (!this.scrollEl) this.register(
    /** @type {HTMLElement} */
    this.el.parentElement);
  }
  /**
   * @export
   *
   * Resets the component state to default. This should be used to signal the
   * end of refreshing so that this component
   * can again check for pull to refresh.
   */


  reset() {
    if (this.scrollEl) {
      this.containerEl.style.transform = 'translateY(0)';
      this.containerEl.style.transition = '300ms ease-out';
    }

    var spinner = this.$(this.mappings.SPINNER);
    var arrow = this.$(this.mappings.ARROW);
    if (spinner) spinner.style.opacity = '0';
    setTimeout(() => {
      if (arrow) arrow.style.opacity = '1';
    }, 500);
    this.model.reset();
  }
  /**
   * @export
   *
   * Registers an element to track its scroll. This can be used for lazily introducing an element to track.
   *
   * @param {?HTMLElement} scrollEl Element to track.
   * @param {?HTMLElement=} containerEl Element to offset during activity.
   */


  register(scrollEl, containerEl) {
    if (!scrollEl) return;
    if (this.scrollListener_) this.scrollEl.removeEventListener('scroll', this.scrollListener_);
    if (this.releaseListener_) document.body.removeEventListener('touchend', this.releaseListener_);
    this.scrollEl = scrollEl;
    if (containerEl) this.containerEl = containerEl;else this.containerEl = scrollEl;
    this.reset();
    this.scrollListener_ = this.onScroll_.bind(this);
    this.releaseListener_ = this.onRelease_.bind(this);
    this.scrollEl.addEventListener('scroll', this.scrollListener_);
    document.body.addEventListener('touchend', this.releaseListener_);
  }
  /**
   * Scroll event handler for pull to refresh.
   *
   * @private
   *
   * @param {!Event} e Scroll event object.
   */


  onScroll_(e) {
    this.checkShouldRefresh();
    var rot = 0,
        scroll = -(e.target &&
    /** @type {HTMLElement} */
    e.target.scrollTop || 0),
        pos = this.arrowOffset + Math.pow(scroll, 0.75),
        rotationThreshold = this.threshold - 60;
    if (scroll >= rotationThreshold) rot = Math.min(180, (scroll - rotationThreshold) * 3);
    var arrow = this.$(this.mappings.ARROW);
    if (arrow) arrow.style.transform = `translateY(${pos}px) rotate(${rot}deg)`;
  }
  /**
   * Fires when the user lifts her finger to finish the scroll.
   * If the user scrolled enough, inform the model to refresh
   *
   * @private
   */


  onRelease_() {
    if (this.scrollEl.scrollTop < -this.threshold) this.model.refresh();
  }
  /**
   * If in an appropriate state, checks if the scroll position is right
   * and if so triggers a refresh event.
   */


  checkShouldRefresh() {
    this.model.triggerShouldCheckState();
  }
  /**
   * @override
   */


  template() {
    return `
<pull-to-refresh>
    <pull-to-refresh-arrow></pull-to-refresh-arrow>
    <div class="spinner"></div>
</pull-to-refresh>
`;
  }
  /**
   * @override
   */


  dispose() {
    this.model.removeAllListeners();
    this.el && this.el.removeEventListener('scroll', this.scrollListener_);
    document.body.removeEventListener('touchend', this.releaseListener_);
    super.dispose();
  }
  /**
   * @enum {string}
   */


  get mappings() {
    return {
      ARROW: 'pull-to-refresh-arrow',
      SPINNER: '.spinner'
    };
  }

}
/**
 * @export
 *
 * Threshold value for the release action. Releases after this threshold will trigger a refresh.
 *
 * @type {number}
 */


exports.default = PullToRefresh;
PullToRefresh.prototype.threshold = 135;
/**
 * @export
 *
 * Height of this component. This setting is used to offset the scroll view while refreshing.
 *
 * @type {number}
 */

PullToRefresh.prototype.height = 96;
/**
 * @export
 *
 * Start position of the arrow. This is adjusted for a spring-like effect.
 *
 * @type {number}
 */

PullToRefresh.prototype.arrowOffset = 0;
},{"../../lib/base/component":"../node_modules/erste/src/lib/base/component.js","./pull-to-refresh-model":"../node_modules/erste/src/components/pull-to-refresh/pull-to-refresh-model.js"}],"../node_modules/erste/src/components/infinite-scroll/infinite-scroll-model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventemitter = _interopRequireDefault(require("../../lib/base/eventemitter3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Model for the infinite scroll component. Manages loading states to prevent
 * performance problems like double actions.
 *
 * @extends {EventEmitter}
 */
class InfiniteScrollModel extends _eventemitter.default {
  constructor() {
    super();
    this.state_ = this.State.DEFAULT;
  }
  /**
   * Resets the component state to default state.
   */


  reset() {
    this.state_ = this.State.DEFAULT;
  }
  /**
   * If the component is not in LOADING state, it should check to see if it
   * should load. This method will be triggered on every scroll event.
   */


  triggerShouldCheckState() {
    if (this.state_ != this.State.LOADING) this.state_ = this.State.SHOULD_CHECK;
  }
  /**
   * Informs the caller if this model is in an appropriate state for checking
   * the right (scroll) position.
   *
   * @return {boolean} Whether the component should check for the right
   *                   (scroll) position.
   */


  shouldCheck() {
    return this.state_ == this.State.SHOULD_CHECK;
  }
  /**
   * Emits a load event to inform the parent component that it's at the
   * end of a scroll and should load more items.
   */


  load() {
    if (!this.shouldCheck()) return;
    this.state_ = this.State.LOADING;
    this.emit(this.EventType.SHOULD_LOAD);
  }
  /**
   * Load more states.
   *
   * @enum {string}
   */


  get State() {
    return {
      DEFAULT: 'default',
      SHOULD_CHECK: 'shouldCheck',
      LOADING: 'loading'
    };
  }
  /**
   * Event types for this model.
   *
   * @enum {string}
   */


  get EventType() {
    return {
      SHOULD_LOAD: 'load'
    };
  }

}

exports.default = InfiniteScrollModel;
},{"../../lib/base/eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js"}],"../node_modules/erste/src/lib/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Throttle function
 *
 * https://remysharp.com/2010/07/21/throttling-function-calls
 *
 * Copyright (c) 2010 Remy Sharp
 */

/**
 * @param {!Function} fn
 * @param {number} threshhold
 * @param {?Object=} scope
 */
var _default = (fn, threshhold, scope) => {
  var last = 0,
      deferTimer;
  /**
   * @param {...*} args
   */

  var rv = (...args) => {
    /** @type {number} */
    var now = +new Date();

    if (last && now < add(last, threshhold)) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(scope, args);
      }, threshhold + last - now);
    } else {
      last = now;
      fn.apply(scope, args);
    }
  };

  return rv;
};

exports.default = _default;

function add(a, b) {
  return a + b;
}
},{}],"../node_modules/erste/src/components/infinite-scroll/infinite-scroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("../../lib/base/component"));

var _infiniteScrollModel = _interopRequireDefault(require("./infinite-scroll-model"));

var _throttle = _interopRequireDefault(require("../../lib/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
class InfiniteScroll extends _component.default {
  /**
   * InfiniteScrollComponent is a small component which checks the scroll
   * position of a given DOM element, and if it's in
   * an appropriate position, fires a LOAD event for the parent component
   * to act upon. When the parent component is
   * done loading new items, it should reset this InfiniteScrollComponent
   * with the reset() method.
   *
   * @param {!HTMLElement=} opt_el Optional element to track its scroll.
   */
  constructor(opt_el) {
    super();
    this.model = new _infiniteScrollModel.default();
    /**
     * @export
     */

    this.EventType = this.model.EventType;
    this.scrollListener_ = null;
    /** @type {HTMLElement} */

    this.scrollEl = null;
    /**
     * Message to show when no more items are available to load.
     *
     * @type {string}
     */

    this.endOfListText = '';
    this.throttle = (0, _throttle.default)(this.checkShouldLoadMore_, 100, this);
    if (opt_el) this.register(opt_el);
    this.bindModelEvents();
  }

  bindModelEvents() {
    this.model.on(this.model.EventType.SHOULD_LOAD, this.onShouldLoad.bind(this));
  }

  onShouldLoad() {
    this.emit(this.EventType.SHOULD_LOAD);
  }
  /**
   * @override
   */


  render(opt_base, opt_index) {
    var rv = super.render(opt_base, opt_index);
    if (!this.el) this.register(this.el.parentElement);
    return rv;
  }
  /**
   * @export
   *
   * Resets the component state to default. This should be used to signal
   * the end of loading so that this component
   * can again check for loading.
   */


  reset() {
    this.model.reset();
  }
  /**
   * @export
   *
   * Registers an element to track its scroll. This can be used for lazily introducing an element to track.
   *
   * @param {?HTMLElement} el Element to track.
   */


  register(el) {
    if (!el) return;
    this.reset();
    this.scrollEl && this.scrollEl.removeEventListener('scroll', this.scrollListener_);
    this.scrollEl = el;
    this.scrollListener_ = this.onScroll_.bind(this);
    this.scrollEl.addEventListener('scroll', this.scrollListener_);
  }
  /**
   * Scroll event handler for infinite scroll. Fires the throttle to check for
   * the correct load more position.
   *
   * @private
   */


  onScroll_() {
    this.throttle();
  }
  /**
   * If in an appropriate state, checks if the scroll position is right and if so triggers a load more event.
   *
   * @private
   */


  checkShouldLoadMore_() {
    this.model.triggerShouldCheckState();
    if (!this.model.shouldCheck()) return;
    var el = this.scrollEl;
    if (!el) return;
    if (el.scrollHeight > el.offsetHeight && // the element can actually scroll
    el.scrollTop > el.scrollHeight - el.offsetHeight - 400) // and we're in a good position to load more
      this.model.load();
  }
  /**
   * @export
   *
   * Shows spinner during load.
   */


  showSpinner() {
    this.el.classList.add('spinner');
    this.el.innerText = '';
    this.reset();
  }
  /**
   * @export
   *
   * Shows end of list message if no more items are available.
   */


  showEndOfList() {
    this.el.innerText = this.endOfListText;
    this.el.classList.remove('spinner');
  }
  /**
   * @override
   */


  template() {
    return `<inf-scroll></inf-scroll>`;
  }
  /**
   * @override
   */


  dispose() {
    this.model.removeAllListeners();
    this.scrollEl.removeEventListener('scroll', this.scrollListener_);
    super.dispose();
  }

}

var _default = InfiniteScroll;
exports.default = _default;
},{"../../lib/base/component":"../node_modules/erste/src/lib/base/component.js","./infinite-scroll-model":"../node_modules/erste/src/components/infinite-scroll/infinite-scroll-model.js","../../lib/throttle":"../node_modules/erste/src/lib/throttle.js"}],"../node_modules/erste/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "use", {
  enumerable: true,
  get: function () {
    return _use.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _component.default;
  }
});
Object.defineProperty(exports, "ViewManager", {
  enumerable: true,
  get: function () {
    return _viewManager.default;
  }
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function () {
    return _view.default;
  }
});
Object.defineProperty(exports, "locale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "Sidebar", {
  enumerable: true,
  get: function () {
    return _sidebar.default;
  }
});
Object.defineProperty(exports, "TabView", {
  enumerable: true,
  get: function () {
    return _tabView.default;
  }
});
Object.defineProperty(exports, "NavBar", {
  enumerable: true,
  get: function () {
    return _navbar.default;
  }
});
Object.defineProperty(exports, "PullToRefresh", {
  enumerable: true,
  get: function () {
    return _pullToRefresh.default;
  }
});
Object.defineProperty(exports, "InfiniteScroll", {
  enumerable: true,
  get: function () {
    return _infiniteScroll.default;
  }
});
exports.__ = exports.default = void 0;

var _use = _interopRequireDefault(require("./lib/base/use"));

var _component = _interopRequireDefault(require("./lib/base/component"));

var _viewManager = _interopRequireDefault(require("./lib/view-manager"));

var _view = _interopRequireDefault(require("./lib/view"));

var _locale = _interopRequireDefault(require("./lib/locale"));

var _sidebar = _interopRequireDefault(require("./components/sidebar/sidebar"));

var _tabView = _interopRequireDefault(require("./components/tab-view/tab-view"));

var _navbar = _interopRequireDefault(require("./components/navbar/navbar"));

var _pullToRefresh = _interopRequireDefault(require("./components/pull-to-refresh/pull-to-refresh"));

var _infiniteScroll = _interopRequireDefault(require("./components/infinite-scroll/infinite-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @export */
const erste = {
  /** @export */
  Component: _component.default,

  /** @export */
  ViewManager: _viewManager.default,

  /** @export */
  View: _view.default,

  /** @export */
  locale: _locale.default,

  /** @export */
  Sidebar: _sidebar.default,

  /** @export */
  TabView: _tabView.default,

  /** @export */
  NavBar: _navbar.default,

  /** @export */
  PullToRefresh: _pullToRefresh.default,

  /** @export */
  InfiniteScroll: _infiniteScroll.default,

  /** @export */
  __: _locale.default.__
};
/** @export */

erste.use = _use.default.bind(erste);
var _default = erste;
exports.default = _default;
const __ = _locale.default.__;
exports.__ = __;
},{"./lib/base/use":"../node_modules/erste/src/lib/base/use.js","./lib/base/component":"../node_modules/erste/src/lib/base/component.js","./lib/view-manager":"../node_modules/erste/src/lib/view-manager.js","./lib/view":"../node_modules/erste/src/lib/view.js","./lib/locale":"../node_modules/erste/src/lib/locale.js","./components/sidebar/sidebar":"../node_modules/erste/src/components/sidebar/sidebar.js","./components/tab-view/tab-view":"../node_modules/erste/src/components/tab-view/tab-view.js","./components/navbar/navbar":"../node_modules/erste/src/components/navbar/navbar.js","./components/pull-to-refresh/pull-to-refresh":"../node_modules/erste/src/components/pull-to-refresh/pull-to-refresh.js","./components/infinite-scroll/infinite-scroll":"../node_modules/erste/src/components/infinite-scroll/infinite-scroll.js"}],"ui/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _erste = require("erste");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component is from ersteJS.
 * 
 * @extends {ErsteComponent}
 */
var Component = /*#__PURE__*/function (_ErsteComponent) {
  _inherits(Component, _ErsteComponent);

  var _super = _createSuper(Component);

  function Component() {
    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this);
    _this.model = null;
    _this.children = [];
    return _this;
  }
  /**
   * Listens to the model's events. This method should be overridden by the implementer, and should keep the model's event
   * listeners.
   * @protected
   */


  _createClass(Component, [{
    key: "bindModelEvents",
    value: function bindModelEvents() {}
  }, {
    key: "setModel",
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: "getChild",
    value: function getChild(id) {
      return this.children[id].content;
    }
  }, {
    key: "getChildIds",
    value: function getChildIds() {
      return this.children.map(function (child) {
        return child.id;
      });
    }
    /**
     * Returns the child components of this component (if any).
     * @return {Array.<Component>} Child components.
     */

  }, {
    key: "getChildren",
    value: function getChildren() {
      var ids = this.getChildIds(),
          that = this;
      return ids.map(function (id) {
        return that.getChild(id);
      });
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      var opt_render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (opt_render != false) {
        opt_render = true;
        this.el.appendChild(child);
      }

      this.children.push({
        id: child.id,
        content: child,
        render: opt_render
      });
    }
  }, {
    key: "addChildAt",
    value: function addChildAt(child, index) {
      var opt_render = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.children.splice(index, 0, {
        id: child.id,
        content: child,
        render: opt_render
      });

      if (opt_render != false) {
        opt_render = true;
        this.el.appendChild(child);
      }
    }
    /**
     * Adds the specified children to this component, appending at the end.
     * 
     * @param {Array.<Component>} children The new child components.
     * @param {boolean=} opt_render If false, the child component will not be rendered into the parent.
     */

  }, {
    key: "addChildren",
    value: function addChildren(children) {
      var opt_render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var that = this;
      children.forEach(function (child) {
        that.addChild(child, opt_render);
      }, this);
    }
  }, {
    key: "remove_child",
    value: function remove_child(child, opt_unrender) {
      this.children.filter(function (item) {
        return item.id !== child.id;
      });
      this.el.removeChild(child);
    }
  }, {
    key: "disposeInternal",
    value: function disposeInternal() {
      _get(_getPrototypeOf(Component.prototype), "dispose", this).call(this);

      this.model && this.model.dispose && this.model.dispose();
      this.model = null;
    }
  }]);

  return Component;
}(_erste.Component);

var _default = Component;
exports.default = _default;
},{"erste":"../node_modules/erste/src/index.js"}],"IConnectableModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var IConnectableModel = /*#__PURE__*/function () {
  function IConnectableModel() {
    _classCallCheck(this, IConnectableModel);
  }

  _createClass(IConnectableModel, [{
    key: "connect",

    /**
     * Connects the output of this IConnectableModel to a node.
     * 
     * @param {AudioNode} destination Destination node to connect the output of this IConnectableModel.
     */
    value: function connect(destination) {}
    /**
     * Disconnects the output of this IConnectableModel
     */

  }, {
    key: "disconnect",
    value: function disconnect() {}
    /**
     * Sets the previous node of this IConnectableModel.
     * 
     * @param {AudioNode} prev The node that will be connected to the input of this IConnectableModel.
     */

  }, {
    key: "setPrev",
    value: function setPrev(prev) {}
    /**
     * Gets the input of a IConnectableModel.
     * 
     * @return {!(AudioNode|AudioParam)} The input of this IConnectableModel.
     */

  }, {
    key: "getInput",
    value: function getInput() {}
    /**
     * Gets the output of a IConnectableModel.
     * 
     * @return {!(AudioNode|AudioParam)} The output of this IConnectableModel.
     */

  }, {
    key: "getOutput",
    value: function getOutput() {}
  }]);

  return IConnectableModel;
}();

var _default = IConnectableModel;
exports.default = _default;
},{}],"Connectable/ConnectableModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IConnectableModel = _interopRequireDefault(require("../IConnectableModel"));

var _Component2 = _interopRequireDefault(require("../ui/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for base connectables.
 * 
 * @implements {IConnectableModel}
 * @extends {Component}
 */
var ConnectableModel = /*#__PURE__*/function (_Component) {
  _inherits(ConnectableModel, _Component);

  var _super = _createSuper(ConnectableModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function ConnectableModel(context) {
    var _this;

    _classCallCheck(this, ConnectableModel);

    _this = _super.call(this);
    _this.context = context;
    _this.prev = null;
    _this.next = null;
    /**
     * @type {Array.<!AudioNode>}
     */

    _this.chain = [];
    /**
     * @type {Array.<AudioNode>}
     */

    _this.effects = [];
    /**
     * @type {!GainNode}
     * @protected
     */

    _this.inputBuffer = _this.context.createGain();
    /**
     * @type {!GainNode}
     * @protected
     */

    _this.outputBuffer = _this.context.createGain();
    return _this;
  }
  /**
   * Connects the output of the audio node of this model to another audio node.
   * @override
   * @param {AudioNode} destination Next audio node where the output of this model's node will connect to. 
   */


  _createClass(ConnectableModel, [{
    key: "connect",
    value: function connect(destination) {
      this.next = destination;
      this.chain = [].concat(this.inputBuffer, this.effects, this.outputBuffer, this.next);
      this.routeInternal();
    }
    /**
     * Gets the input buffer of a pedal.
     * @override
     * @return {!(AudioNode|AudioParam)} The input buffer of this component.
     */

  }, {
    key: "getInput",
    value: function getInput() {
      return this.inputBuffer;
    }
    /**
     * Gets the output buffer of a pedal.
     * @override
     * @return {!(AudioNode|AudioParam)} The output buffer of this component.
     */

  }, {
    key: "getOutput",
    value: function getOutput() {
      return this.outputBuffer;
    }
    /**
     * Lets the model know who is connected to its effects node.
     * @override
     * @param {AudioNode} prev Previous node who is connected to this model's effects node.
     */

  }, {
    key: "setPrev",
    value: function setPrev(prev) {
      this.prev = prev;
    }
    /**
     * Routes the internal effects chain.
     */

  }, {
    key: "routeInternal",
    value: function routeInternal() {
      var chain = this.chain;

      for (var i = 0, len = chain.length - 1; i < len; i++) {
        chain[i].connect(chain[i + 1]);
      }
    }
    /**
     * Disconnects the output buffer of this pedal.
     * @override
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      this.outputBuffer.disconnect();
    }
    /**
     * @override
     */

  }, {
    key: "disposeInternal",
    value: function disposeInternal() {
      _get(_getPrototypeOf(ConnectableModel.prototype), "disposeInternal", this).call(this);

      this.disconnect();
    }
  }]);

  return ConnectableModel;
}(_Component2.default);

var _default = ConnectableModel;
exports.default = _default;
},{"../IConnectableModel":"IConnectableModel.js","../ui/Component":"ui/Component.js"}],"IConnectable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
 * @fileoverview IConnectable interface for consistent routing between higher level stomp box components.
 * All the connectable pedal components and IO should implement this interface.
 */

/**
 * IConnectable interface. Sports connect method for output and setInput method for input.
 * @interface
 */
var IConnectable = /*#__PURE__*/function () {
  function IConnectable() {
    _classCallCheck(this, IConnectable);
  }

  _createClass(IConnectable, [{
    key: "connect",

    /**
     * Connects the output of this IConnectable to a node.
     * 
     * @param {IConnectable} destination Destination node to connect the output of this IConnectable.
     */
    value: function connect(destination) {}
    /**
     * Disconnects the output of this IConnectable.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {}
    /**
     * Sets the input of this IConnectable to a node.
     * 
     */

  }, {
    key: "setPrev",
    value: function setPrev(prev) {}
    /**
     * Gets the main effects unit of a IConnectable, which is also the input node.
     * 
     * @return {!(AudioNode|AudioParam)} The effect node of the IConnectable.
     */

  }, {
    key: "getInput",
    value: function getInput() {}
    /**
     * Gets the output buffer of a pedal.
     *
     * @return {!(AudioNode|AudioParam)} The output buffer of this component.
     */

  }, {
    key: "getOutput",
    value: function getOutput() {}
  }]);

  return IConnectable;
}();

var _default = IConnectable;
exports.default = _default;
},{}],"io/Output.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IConnectable = _interopRequireDefault(require("../IConnectable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The output wrapper for an audio context.
 *
 * @implements {IConnectable}
 */
var Output = /*#__PURE__*/function () {
  /**
   * 
   * @param {AudioContext} context Audio context for this output.
   */
  function Output(context) {
    _classCallCheck(this, Output);

    this.source = context.destination; // creates a sound source

    this.prev = null;
  }
  /**
   * Gets the destination node.
   * @override
   * @return {!(AudioNode|AudioParam)} The final node in the signal chain.
   */


  _createClass(Output, [{
    key: "getInput",
    value: function getInput() {
      return this.source;
    }
    /**
     * Lets the output know who is connected to it.
     * @override
     * @param {IConnectable} prev Input node.
     */

  }, {
    key: "setPrev",
    value: function setPrev(prev) {
      this.prev = prev;
    }
    /**
     * Dummy method for the Connectable interface. It's meaningless for an output to be connected to another Connectable.
     * It's already the final node in the signal chain.
     * 
     * @override
     */

  }, {
    key: "connect",
    value: function connect(destination) {}
    /**
     * Dummy method for the Connectable interface. It's meaningless for an output to have an output.
     * @override
     */

  }, {
    key: "getOutput",
    value: function getOutput() {}
    /**
     * Dummy method for the Connectable interface. The output is never connected to anything else.
     * 
     * @override
     */

  }, {
    key: "disconnect",
    value: function disconnect() {}
  }]);

  return Output;
}();

var _default = Output;
exports.default = _default;
},{"../IConnectable":"IConnectable.js"}],"Connectable/Connectable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../ui/Component"));

var _ConnectableModel = _interopRequireDefault(require("./ConnectableModel"));

var _IConnectable = _interopRequireDefault(require("../IConnectable"));

var _Output = _interopRequireDefault(require("../io/Output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Base component.
 *
 * @extends {Component}
 * @implements {IConnectable}
 */
var Connectable = /*#__PURE__*/function (_Component) {
  _inherits(Connectable, _Component);

  var _super = _createSuper(Connectable);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Connectable(context) {
    var _this;

    _classCallCheck(this, Connectable);

    _this = _super.call(this);
    _this.modelClass = _ConnectableModel.default;

    _this.setModel(new _this.modelClass(context));

    _this.createChildComponents();

    _this.bindModelEvents();

    _this.components = null;
    return _this;
  }
  /**
   * Creates child components such as pots and switches.
   */


  _createClass(Connectable, [{
    key: "createChildComponents",
    value: function createChildComponents() {
      this.components = [];
    }
    /**
     * Gets the input buffer of a pedal.
     * @override
     * @return {!(AudioNode|AudioParam)} The input buffer of this component.
     */

  }, {
    key: "getInput",
    value: function getInput() {
      return this.model.getInput();
    }
    /**
     * Gets the output buffer of a pedal.
     * @override
     * @return {!(AudioNode|AudioParam)} The output buffer of this component.
     */

  }, {
    key: "getOutput",
    value: function getOutput() {
      return this.model.getOutput();
    }
    /**
     * Lets the pedal instance know who is connected to its input.
     * @override
     * @param {IConnectable} prev Previous pedal whose output will connect to this pedal's input.
     */

  }, {
    key: "setPrev",
    value: function setPrev(prev) {
      this.model.setPrev(prev.getOutput());
    }
    /**
     * Connects the output of this pedal to another pedal.
     * @override
     * @param {IConnectable|Output} destination Next pedal where the output of this pedal will connect to.
     */

  }, {
    key: "connect",
    value: function connect(destination) {
      destination.setPrev(this);
      this.model.connect(destination.getInput());
    }
    /**
     * Disconnects the output of this pedal.
     * @override
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      this.model.disconnect();
    }
  }]);

  return Connectable;
}(_Component2.default);

var _default = Connectable;
exports.default = _default;
},{"../ui/Component":"ui/Component.js","./ConnectableModel":"Connectable/ConnectableModel.js","../IConnectable":"IConnectable.js","../io/Output":"io/Output.js"}],"Connectable/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Connectable", {
  enumerable: true,
  get: function () {
    return _Connectable.default;
  }
});
Object.defineProperty(exports, "ConnectableModel", {
  enumerable: true,
  get: function () {
    return _ConnectableModel.default;
  }
});

var _Connectable = _interopRequireDefault(require("./Connectable"));

var _ConnectableModel = _interopRequireDefault(require("./ConnectableModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Connectable":"Connectable/Connectable.js","./ConnectableModel":"Connectable/ConnectableModel.js"}],"footswitch/Switch/SwitchModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventemitter = _interopRequireDefault(require("erste/src/lib/base/eventemitter3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @extends {EventEmitter}
 * 
 */
var SwitchModel = /*#__PURE__*/function (_EventEmitter) {
  _inherits(SwitchModel, _EventEmitter);

  var _super = _createSuper(SwitchModel);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function SwitchModel(opt_name) {
    var _this;

    _classCallCheck(this, SwitchModel);

    _this = _super.call(this);
    _this.name = opt_name;
    _this.nodes = [[], [], []];
    _this.state = false;
    return _this;
  }
  /**
   * Toggles the switch and fires an event accordingly.
   */


  _createClass(SwitchModel, [{
    key: "toggle",
    value: function toggle() {
      var oldState = this.state,
          eventType;
      this.state = !this.state;
      if (this.state) this.turnOn();else this.turnOff();
      eventType = this.state ? SwitchModel.EventType.ON : SwitchModel.EventType.OFF;
      this.emit(eventType, this.state, oldState);
    }
    /**
     * Fired when the switch should be toggled on. Toggles internal nodes; middle nodes are connected to the first.
     */

  }, {
    key: "turnOn",
    value: function turnOn() {
      var work = function work(nodes) {
        nodes[1].disconnect();
        if (nodes[0]) nodes[1].connect(nodes[0]);
      };

      this.nodes.forEach(function (nodes) {
        if (nodes) {
          (function (nodes) {
            work(nodes);
            setTimeout(function () {
              work(nodes);
            }, 10);
          })(nodes);
        }
      });
    }
    /**
     * Fired when the switch should be toggled off. Toggles internal nodes; middle nodes are connected to the third.
     */

  }, {
    key: "turnOff",
    value: function turnOff() {
      var work = function work(nodes) {
        nodes[1].disconnect();
        if (nodes[2]) nodes[1].connect(nodes[2]);
      };

      this.nodes.forEach(function (nodes) {
        (function (nodes) {
          work(nodes);
          setTimeout(function () {
            work(nodes);
          }, 10);
        })(nodes);
      });
    }
    /**
     * Sets the nodes this switch will toggle.
     * 
     * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
     */

  }, {
    key: "setNodes",
    value: function setNodes(nodes) {
      this.nodes = nodes; // Kick off toggling. Since this.toggle will invert the state and we just want to make an initial event dispatch,
      // we invert the state; so that toggle will correct it and dispatch the correct event.

      this.state = !this.state;
      this.toggle();
    }
  }]);

  return SwitchModel;
}(_eventemitter.default);

SwitchModel.EventType = {
  ON: 'on',
  OFF: 'off'
};
var _default = SwitchModel;
exports.default = _default;
},{"erste/src/lib/base/eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js"}],"footswitch/Momentary/MomentaryModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SwitchModel2 = _interopRequireDefault(require("../Switch/SwitchModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @extends {SwitchModel}
 * 
 */
var MomentaryModel = /*#__PURE__*/function (_SwitchModel) {
  _inherits(MomentaryModel, _SwitchModel);

  var _super = _createSuper(MomentaryModel);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function MomentaryModel(opt_name) {
    var _this;

    _classCallCheck(this, MomentaryModel);

    _this = _super.call(this, opt_name);
    _this.state = false;
    return _this;
  }

  return MomentaryModel;
}(_SwitchModel2.default);

var _default = MomentaryModel;
exports.default = _default;
},{"../Switch/SwitchModel":"footswitch/Switch/SwitchModel.js"}],"footswitch/Switch/Switch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SwitchModel = _interopRequireDefault(require("./SwitchModel"));

var _Component2 = _interopRequireDefault(require("../../ui/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import ComponentManager from "erste/src/lib/base/component-manager";

/**
 * Switch component models a footswitch. This base class is used to toggle stompbox nodes.
 *
 * @extends {Component}
 *
 */
var Switch = /*#__PURE__*/function (_Component) {
  _inherits(Switch, _Component);

  var _super = _createSuper(Switch);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function Switch(opt_name) {
    var _this;

    _classCallCheck(this, Switch);

    _this = _super.call(this);
    _this.model = new _this.modelClass(opt_name);
    _this.modelClass = _SwitchModel.default;
    _this.mappings = {
      BUTTON: ".button"
    }; // this.events = {
    //   [ComponentManager.events['mousedown']]: {
    //     [this.mappings.BUTTON]: this.toggle,
    //   },
    // };

    return _this;
  }
  /**
   * Sets the nodes this switch will toggle.
   *
   * @param {Array.<Array.<AudioNode>>} nodes Nodes of this switch.
   */


  _createClass(Switch, [{
    key: "setNodes",
    value: function setNodes(nodes) {
      this.model.setNodes(nodes);
    }
    /**
     * Returns the current state of the switch. Return value is true if the switch is on, and false if otherwise.
     *
     * @return {boolean} Whether the switch is on or off.
     */

  }, {
    key: "getState",
    value: function getState() {
      return this.model.state;
    }
    /**
     * Toggles the switch.
     */

  }, {
    key: "toggle",
    value: function toggle() {
      this.model.toggle();
    }
    /**
     * @override
     */

  }, {
    key: "template",
    value: function template() {
      return "<div class=\"switch\">\n                    <div class=\"button\"></div>\n                    ".concat(this.templates_name(), "\n                </div>");
    }
    /**
     * @return {string} Name template. Returns empty string if no name is given.
     */

  }, {
    key: "templates_name",
    value: function templates_name() {
      return this.model.name ? "<div class=\"name\">".concat(this.model.name, "</div>") : "";
    }
  }]);

  return Switch;
}(_Component2.default);

var _default = Switch;
exports.default = _default;
},{"./SwitchModel":"footswitch/Switch/SwitchModel.js","../../ui/Component":"ui/Component.js"}],"footswitch/Momentary/Momentary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MomentaryModel = _interopRequireDefault(require("./MomentaryModel"));

var _Switch2 = _interopRequireDefault(require("../Switch/Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import ComponentManager from "erste/src/lib/base/component-manager";

/**
 * Momentary switch component models a Momentary footswitch. It's on as long as you press it and turns off when you
 * release.
 * 
 * @extends {Switch}
 * 
 */
var Momentary = /*#__PURE__*/function (_Switch) {
  _inherits(Momentary, _Switch);

  var _super = _createSuper(Momentary);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function Momentary(opt_name) {
    var _this;

    _classCallCheck(this, Momentary);

    _this = _super.call(this, opt_name);
    _this.state = false;
    _this.modelClass = _MomentaryModel.default; // this.events = {
    //     [ComponentManager.events['mousedown']]: {
    //         [this.mappings.BUTTON]: this.toggle
    //     }
    // }

    return _this;
  }

  return Momentary;
}(_Switch2.default);

var _default = Momentary;
exports.default = _default;
},{"./MomentaryModel":"footswitch/Momentary/MomentaryModel.js","../Switch/Switch":"footswitch/Switch/Switch.js"}],"footswitch/toggle/ToggleModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SwitchModel2 = _interopRequireDefault(require("../Switch/SwitchModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @extends {SwitchModel}
 * 
 */
var ToggleModel = /*#__PURE__*/function (_SwitchModel) {
  _inherits(ToggleModel, _SwitchModel);

  var _super = _createSuper(ToggleModel);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function ToggleModel(opt_name) {
    var _this;

    _classCallCheck(this, ToggleModel);

    _this = _super.call(this, opt_name);
    _this.state = true;
    return _this;
  }

  return ToggleModel;
}(_SwitchModel2.default);

var _default = ToggleModel;
exports.default = _default;
},{"../Switch/SwitchModel":"footswitch/Switch/SwitchModel.js"}],"footswitch/toggle/Toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Switch2 = _interopRequireDefault(require("../Switch/Switch"));

var _ToggleModel = _interopRequireDefault(require("./ToggleModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Toggle switch component models a toggle footswitch. It's on after you press it once and stays on until you press it
 * a second time when it will then be off.
 *
 * @extends {Switch}
 *
 */
var Toggle = /*#__PURE__*/function (_Switch) {
  _inherits(Toggle, _Switch);

  var _super = _createSuper(Toggle);

  /**
   * 
   * @param {string=} opt_name Name of the switch. Will be written under it.
   */
  function Toggle(opt_name) {
    var _this;

    _classCallCheck(this, Toggle);

    _this = _super.call(this, opt_name);
    _this.modelClass = _ToggleModel.default;
    return _this;
  }

  return Toggle;
}(_Switch2.default);

var _default = Toggle;
exports.default = _default;
},{"../Switch/Switch":"footswitch/Switch/Switch.js","./ToggleModel":"footswitch/toggle/ToggleModel.js"}],"footswitch/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Momentary", {
  enumerable: true,
  get: function () {
    return _Momentary.default;
  }
});
Object.defineProperty(exports, "MomentaryModel", {
  enumerable: true,
  get: function () {
    return _MomentaryModel.default;
  }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () {
    return _Switch.default;
  }
});
Object.defineProperty(exports, "SwitchModel", {
  enumerable: true,
  get: function () {
    return _SwitchModel.default;
  }
});
Object.defineProperty(exports, "Toggle", {
  enumerable: true,
  get: function () {
    return _Toggle.default;
  }
});
Object.defineProperty(exports, "ToggleModel", {
  enumerable: true,
  get: function () {
    return _ToggleModel.default;
  }
});

var _Momentary = _interopRequireDefault(require("./Momentary/Momentary"));

var _MomentaryModel = _interopRequireDefault(require("./Momentary/MomentaryModel"));

var _Switch = _interopRequireDefault(require("./Switch/Switch"));

var _SwitchModel = _interopRequireDefault(require("./Switch/SwitchModel"));

var _Toggle = _interopRequireDefault(require("./toggle/Toggle"));

var _ToggleModel = _interopRequireDefault(require("./toggle/ToggleModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Momentary/Momentary":"footswitch/Momentary/Momentary.js","./Momentary/MomentaryModel":"footswitch/Momentary/MomentaryModel.js","./Switch/Switch":"footswitch/Switch/Switch.js","./Switch/SwitchModel":"footswitch/Switch/SwitchModel.js","./toggle/Toggle":"footswitch/toggle/Toggle.js","./toggle/ToggleModel":"footswitch/toggle/ToggleModel.js"}],"io/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IConnectable = _interopRequireDefault(require("../IConnectable"));

var _eventemitter = _interopRequireDefault(require("erste/src/lib/base/eventemitter3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The input wrapper for an audio context.
 * 
 * @extends {EventEmitter}
 */
var Input = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Input, _EventEmitter);

  var _super = _createSuper(Input);

  /**
   * 
   * @param {AudioContext} context Audio context for this input.
   */
  function Input(context) {
    var _this;

    _classCallCheck(this, Input);

    _this = _super.call(this);
    _this.source = context.createBufferSource(); // creates a sound source

    _this.source.loop = true;
    _this.state = Input.State.NOT_STARTED;

    _this.source.addEventListener('ended', _this.onEnded.bind(_assertThisInitialized(_this)));

    return _this;
  }
  /**
   * Starts playing the input.
   * 
   * @param {number=} opt_time Milliseconds after whom this input will start playing.
   */


  _createClass(Input, [{
    key: "play",
    value: function play(opt_time) {
      if (this.state == Input.State.NOT_STARTED) {
        this.source.start(opt_time || 0);
        this.state = Input.State.PLAYING;
      }
    }
    /**
     * Stops playing the input.
     * 
     * @param {number=} opt_time Milliseconds after whom this input will stop playing.
     */

  }, {
    key: "stop",
    value: function stop(opt_time) {
      if (this.state == Input.State.PLAYING) {
        this.source.stop(opt_time || 0);
        this.state = Input.State.FINISHED;
      }
    }
    /**
     * Sets the source buffer of this input.
     * 
     * @protected
     * @param {AudioBuffer} sourceBuffer The new buffer.
     */

  }, {
    key: "setSourceBuffer",
    value: function setSourceBuffer(sourceBuffer) {
      this.source.buffer = sourceBuffer;
    }
    /**
     * Connects this input to a destination pedal.
     * 
     * @param {IConnectable} destination Next pedal where this input will connect to.
     */

  }, {
    key: "connect",
    value: function connect(destination) {
      destination.setPrev(this);
      this.source.connect(destination.getInput());
    }
    /**
     * Disconnects this input from wherever it's connected to.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      this.source.disconnect();
    }
    /**
     * Gets the source of this input.
     * 
     * @return {AudioBufferSourceNode} The source of this input.
     */

  }, {
    key: "getOutput",
    value: function getOutput() {
      return this.source;
    }
    /**
     * Handler for the end event. When the playback of the input ends, this method correctly sets the State to FINISHED.
     */

  }, {
    key: "onEnded",
    value: function onEnded() {
      this.state = Input.State.FINISHED;
    }
    /**
     * Dummy method for the Connectable interface. It's meaningless for an input to be connected to the output of another
     * thing.
     */

  }, {
    key: "setPrev",
    value: function setPrev() {}
    /**
     * Dummy method for the Connectable interface. It's meaningless for an input to have an input.
     */

  }, {
    key: "getInput",
    value: function getInput() {}
  }]);

  return Input;
}(_eventemitter.default);
/**
* Playback states that partially fulfills the deprecated playbackState in Web Audio API. Basically it helps to avoid
* exceptions when start or stop is called inappropriately.
*
* @enum {string}
*/


Input.State = {
  NOT_STARTED: 'notStarted',
  PLAYING: 'playing',
  FINISHED: 'finished'
};
var _default = Input;
exports.default = _default;
},{"../IConnectable":"IConnectable.js","erste/src/lib/base/eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js"}],"io/FileInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Input2 = _interopRequireDefault(require("./Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Reads a file at a given URL, converts it to a source buffer and makes it available for the context.
 * 
 * @extends {Input}
 */
var FileInput = /*#__PURE__*/function (_Input) {
  _inherits(FileInput, _Input);

  var _super = _createSuper(FileInput);

  /**
   * 
   * @param {AudioContext} context Context for this input.
   * @param {string} url URL for the input file.
   */
  function FileInput(context, url) {
    var _this;

    _classCallCheck(this, FileInput);

    _this = _super.call(this, context);

    var that = _assertThisInitialized(_this),
        request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
      context.decodeAudioData(
      /** @type {!ArrayBuffer} */
      request.response, function (buffer) {
        that.setSourceBuffer(buffer);
        that.emit('loaded');
      });
    };

    request.send();
    return _this;
  }

  return FileInput;
}(_Input2.default);

var _default = FileInput;
exports.default = _default;
},{"./Input":"io/Input.js"}],"io/StreamInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Input2 = _interopRequireDefault(require("./Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The input wrapper for an audio context.
 *
 * @extends {Input}
 */
var StreamInput = /*#__PURE__*/function (_Input) {
  _inherits(StreamInput, _Input);

  var _super = _createSuper(StreamInput);

  /**
   * 
   * @param {AudioContext} context Audio context for this input.
   */
  function StreamInput(context) {
    var _this;

    _classCallCheck(this, StreamInput);

    _this = _super.call(this, context);

    var that = _assertThisInitialized(_this);

    var getUserMedia = navigator.getUserMedia;
    getUserMedia({
      'audio': {
        'mandatory': {
          'echoCancellation': false,
          'googEchoCancellation': false,
          'googEchoCancellation2': false,
          'googAutoGainControl': false,
          'googNoiseSuppression': false,
          'googNoiseSuppression2': false //'googHighpassFilter': false // this is currently buggy.

        }
      }
    }, function (stream) {
      that.disconnect();
      that.source = context.createMediaStreamSource(stream);
      that.emit('loaded');
    }, function (err) {
      throw new Error(err);
    });
    return _this;
  }
  /**
   * @override
   */


  _createClass(StreamInput, [{
    key: "stop",
    value: function stop() {
      this.source.disconnect();
    }
  }]);

  return StreamInput;
}(_Input2.default);

var _default = StreamInput;
exports.default = _default;
},{"./Input":"io/Input.js"}],"io/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () {
    return _Input.default;
  }
});
Object.defineProperty(exports, "FileInput", {
  enumerable: true,
  get: function () {
    return _FileInput.default;
  }
});
Object.defineProperty(exports, "StreamInput", {
  enumerable: true,
  get: function () {
    return _StreamInput.default;
  }
});
Object.defineProperty(exports, "Output", {
  enumerable: true,
  get: function () {
    return _Output.default;
  }
});

var _Input = _interopRequireDefault(require("./Input"));

var _FileInput = _interopRequireDefault(require("./FileInput"));

var _StreamInput = _interopRequireDefault(require("./StreamInput"));

var _Output = _interopRequireDefault(require("./Output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Input":"io/Input.js","./FileInput":"io/FileInput.js","./StreamInput":"io/StreamInput.js","./Output":"io/Output.js"}],"../lib/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 * @fileoverview Library module for math functions.
 */
var Coordinate = function Coordinate(opt_x, opt_y) {
  _classCallCheck(this, Coordinate);

  /**
   * X-value
   * @type {number}
   */
  this.x = opt_x !== undefined ? opt_x : 0;
  /**
   * Y-value
   * @type {number}
   */

  this.y = opt_y !== undefined ? opt_y : 0;
};

;
/**
 * Returns the last element in an array without removing it.
 * @param {IArrayLike<T>|string} array The array.
 * @return {T} Last item in array.
 * @template T
 */

var peek = function peek(array) {
  return array[array.length - 1];
};
/**
 * Performs linear interpolation between values a and b. Returns the value
 * between a and b proportional to x (when x is between 0 and 1. When x is
 * outside this range, the return value is a linear extrapolation).
 * @param {number} a A number.
 * @param {number} b A number.
 * @param {number} x The proportion between a and b.
 * @return {number} The interpolated value between a and b.
 */


var lerp = function lerp(a, b, x) {
  return a + x * (b - a);
};
/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */


var clamp = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

var _default = {
  Coordinate: Coordinate,
  peek: peek,
  lerp: lerp,
  clamp: clamp
};
exports.default = _default;
},{}],"pot/pot/PotModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventemitter = _interopRequireDefault(require("erste/src/lib/base/eventemitter3"));

var _math = _interopRequireDefault(require("../../../lib/math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @extends {EventEmitter}
 *
 */
var PotModel = /*#__PURE__*/function (_EventEmitter) {
  _inherits(PotModel, _EventEmitter);

  var _super = _createSuper(PotModel);

  /**
   * 
   * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc.
   * @param {string} name Name of the pot. Will be written under it.
   * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
   *                       thousands.
   * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
   * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
   * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
   */
  function PotModel(param, name, multiplier, opt_min, opt_max, opt_default) {
    var _this;

    _classCallCheck(this, PotModel);

    _this = _super.call(this);
    if (param instanceof Function) _this.callback = param;else _this.param = param;
    _this.minValue = opt_min || 0;
    _this.maxValue = opt_max || 1;
    _this.defaultValue = opt_default || 0.5;
    _this.name = name;
    _this.multiplier = multiplier;
    _this.value = _this.minValue;

    _this.setValue(_this.defaultValue);

    return _this;
  }
  /**
   * Sets the new value for this pot's audio parameter and lets whoever listens hear about it. This method sanitizes
   * the input and calls processValue, which actually sets it as the value of this PotModel. This approach lets
   * subclasses to skip input sanitization and event dispatching.
   *
   * @param {number} newValue New value to be set.
   */


  _createClass(PotModel, [{
    key: "setValue",
    value: function setValue(newValue) {
      var oldValue = this.value;
      newValue = _math.default.clamp(newValue, 0, 1);
      this.processValue(newValue, oldValue);
      if (this.param) this.param.value = this.value;else this.callback(this.value, oldValue);
      this.emit(PotModel.EventType.VALUE_CHANGED, this.value, oldValue);
    }
    /**
     * Processes the sanitized input, sets it to value parameter. Generally, this is a function of a value and a multiplier,
     * and maybe the old value.
     *
     * @protected
     * @param {number} newValue The sanitized pot value.
     * @param {number} oldValue The old value of this PotModel.
     */

  }, {
    key: "processValue",
    value: function processValue(newValue, oldValue) {
      this.value = _math.default.lerp(this.minValue, this.maxValue, newValue) * this.multiplier;
    }
    /**
     * @return {number} The value of this pot's parameter.
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
    /**
     * @return {number} The normalized value of this pot's parameter (as calculated in value / range).
     */

  }, {
    key: "getNormalizedValue",
    value: function getNormalizedValue() {
      var rv = this.value / this.multiplier;
      rv = (rv - this.minValue) / (this.maxValue - this.minValue);
      return rv;
    }
  }]);

  return PotModel;
}(_eventemitter.default);
/**
 *
 * @enum {string}
 */


PotModel.EventType = {
  VALUE_CHANGED: 'valueChanged'
};
var _default = PotModel;
exports.default = _default;
},{"erste/src/lib/base/eventemitter3":"../node_modules/erste/src/lib/base/eventemitter3.js","../../../lib/math":"../lib/math.js"}],"pot/Linear/LinearModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PotModel2 = _interopRequireDefault(require("../pot/PotModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Linear model provides a potentiometer behavior similar to real world linear potentiometers.
 *
 * @extends {PotModel}
 */
var LinearModel = /*#__PURE__*/function (_PotModel) {
  _inherits(LinearModel, _PotModel);

  var _super = _createSuper(LinearModel);

  function LinearModel() {
    _classCallCheck(this, LinearModel);

    return _super.apply(this, arguments);
  }

  return LinearModel;
}(_PotModel2.default);

exports.default = LinearModel;
},{"../pot/PotModel":"pot/pot/PotModel.js"}],"pot/pot/Pot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PotModel = _interopRequireDefault(require("./PotModel"));

var _Component2 = _interopRequireDefault(require("../../ui/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Pot component models a virtual potentiometer. This base class is used to adjust audio parameter values of pedals.
 *
 * @extends {Component}
 */
var Pot = /*#__PURE__*/function (_Component) {
  _inherits(Pot, _Component);

  var _super = _createSuper(Pot);

  /**
   * 
   * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc. If more complex
   *     calculation is desired, one can pass a callback function which will be triggered each time the value of this pot
   *     changes.
   * @param {string} name Name of the pot. Will be written under it.
   * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
   *                       thousands.
   * @param {string=} opt_size Size of the pot. Might be one of the values in pb.pot.Pot.Size enum. Default is REGULAR.
   *     This size is added to the pot's class names for easier styling.
   * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
   * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
   * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
   */
  function Pot(param, name, multiplier, opt_size, opt_min, opt_max, opt_default) {
    var _this;

    _classCallCheck(this, Pot);

    _this = _super.call(this);

    _this.setModel(new _this.modelClass(param, name, multiplier || 1, opt_min, opt_max, opt_default));

    _this.modelClass = _PotModel.default;
    _this.angle = 260;
    /**
     * @enum {string} DOM mappings.
     */

    _this.mappings = {
      KNOB: '.knob',
      KNOB_HOLDER: '.knobHolder'
    };
    _this.size = opt_size || Pot.Size.REGULAR;

    _this.bindModelEvents();

    return _this;
  }
  /**
   * Sets the new value for this pot's audio parameter.
   *
   * @param {number} newValue New value to be set.
   */


  _createClass(Pot, [{
    key: "setValue",
    value: function setValue(newValue) {
      this.model.setValue(newValue);
    }
    /**
     * Updates the user interface - rotation - accordingly.
     */

  }, {
    key: "updateUi",
    value: function updateUi() {
      if (this.rendered) {
        var newStyle = "rotateZ(".concat(this.model.getNormalizedValue() * this.angle, "deg)");
        this.$(this.mappings.KNOB)[0].style['-webkit-transform'] = newStyle;
        this.$(this.mappings.KNOB)[0].style['transform'] = newStyle;
      }
    }
    /**
     * @override
     */

  }, {
    key: "template",
    value: function template() {
      return "<div class=\"pot ".concat(this.size, "\">\n                    <div class=\"knobHolder\">\n                        <div class=\"knob\"></div>\n                    </div>\n                    <div class=\"nameHolder\">\n                        <div class=\"name\">").concat(this.model.name, "</div>\n                    </div>\n                </div>");
    }
    /**
     * Render method updates its knob.
     * @override
     */

  }, {
    key: "onAfterRender",
    value: function onAfterRender() {
      _get(_getPrototypeOf(Pot.prototype), "onAfterRender", this).call(this);

      this.updateUi();
    }
    /**
     * @override
     */

  }, {
    key: "bindModelEvents",
    value: function bindModelEvents() {
      this.model.addEventListener(_PotModel.default.EventType.VALUE_CHANGED, this.updateUi, false); // goog.events.listen(this.model, PotModel.EventType.VALUE_CHANGED, this.updateUi, false, this);
    }
  }]);

  return Pot;
}(_Component2.default);
/**
 * @enum {string} Pot size.
 */


Pot.Size = {
  SMALL: 'small',
  REGULAR: 'regular'
};
var _default = Pot;
exports.default = _default;
},{"./PotModel":"pot/pot/PotModel.js","../../ui/Component":"ui/Component.js"}],"pot/Linear/Linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LinearModel = _interopRequireDefault(require("./LinearModel"));

var _Pot2 = _interopRequireDefault(require("../pot/Pot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Linear pot component models a linear potentiometer.
 *
 * @extends {Pot}
 */
var Linear = /*#__PURE__*/function (_Pot) {
  _inherits(Linear, _Pot);

  var _super = _createSuper(Linear);

  /**
   * 
   * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc. If more complex
   *     calculation is desired, one can pass a callback function which will be triggered each time the value of this pot
   *     changes.
   * @param {string} name Name of the pot. Will be written under it.
   * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
   *                       thousands.
   * @param {string=} opt_size Size of the pot. Might be one of the values in pb.pot.Pot.Size enum. Default is REGULAR.
   *     This size is added to the pot's class names for easier styling.
   * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
   * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
   * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
   */
  function Linear(param, name, multiplier, opt_size, opt_min, opt_max, opt_default) {
    var _this;

    _classCallCheck(this, Linear);

    _this = _super.call(this, param, name, multiplier, opt_size, opt_min, opt_max, opt_default);
    _this.modelClass = _LinearModel.default;
    return _this;
  }

  return Linear;
}(_Pot2.default);

exports.default = Linear;
},{"./LinearModel":"pot/Linear/LinearModel.js","../pot/Pot":"pot/pot/Pot.js"}],"pot/Log/LogModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PotModel2 = _interopRequireDefault(require("../pot/PotModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Log model provides a potentiometer behavior similar to real world logarithmic potentiometers.
 *
 * @extends {PotModel}
 */
var LogModel = /*#__PURE__*/function (_PotModel) {
  _inherits(LogModel, _PotModel);

  var _super = _createSuper(LogModel);

  function LogModel() {
    _classCallCheck(this, LogModel);

    return _super.apply(this, arguments);
  }

  _createClass(LogModel, [{
    key: "processValue",

    /**
     * @override
     */
    value: function processValue(newValue, oldValue) {
      newValue = Math.pow(newValue, 3.3);

      _get(_getPrototypeOf(LogModel.prototype), "processValue", this).call(this, newValue, oldValue);
    }
    /**
     * @override
     */

  }, {
    key: "getNormalizedValue",
    value: function getNormalizedValue() {
      var rv = _get(_getPrototypeOf(LogModel.prototype), "getNormalizedValue", this).call(this);

      rv = Math.pow(rv, 1 / 3.3);
      return rv;
    }
  }]);

  return LogModel;
}(_PotModel2.default);

exports.default = LogModel;
},{"../pot/PotModel":"pot/pot/PotModel.js"}],"pot/Log/Log.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pot2 = _interopRequireDefault(require("../pot/Pot"));

var _LogModel = _interopRequireDefault(require("./LogModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Log pot component models a logarithmic potentiometer.
 *
 * @extends {Pot}
 */
var Log = /*#__PURE__*/function (_Pot) {
  _inherits(Log, _Pot);

  var _super = _createSuper(Log);

  /**
   * 
   * @param {AudioParam|Function} param Audio parameter this pot will adjust. Can be gain, etc. If more complex
   *     calculation is desired, one can pass a callback function which will be triggered each time the value of this pot
   *     changes.
   * @param {string} name Name of the pot. Will be written under it.
   * @param {number} multiplier The multiplier of the effect. Some effects (such as gain) need this to be on the order of
   *                       thousands.
   * @param {string=} opt_size Size of the pot. Might be one of the values in pb.pot.Pot.Size enum. Default is REGULAR.
   *     This size is added to the pot's class names for easier styling.
   * @param {number=} opt_max Optional minimum value for the pot. Default value is 0.
   * @param {number=} opt_min Optional maximum value for the pot. Default value is 1.
   * @param {number=} opt_default Optional default value for the pot. Default value is 0.5.
   */
  function Log(param, name, multiplier, opt_size, opt_min, opt_max, opt_default) {
    var _this;

    _classCallCheck(this, Log);

    _this = _super.call(this, param, name, multiplier, opt_size, opt_min, opt_max, opt_default);
    _this.modelClass = _LogModel.default;
    return _this;
  }

  return Log;
}(_Pot2.default);

exports.default = Log;
},{"../pot/Pot":"pot/pot/Pot.js","./LogModel":"pot/Log/LogModel.js"}],"pot/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _Linear.default;
  }
});
Object.defineProperty(exports, "LinearModel", {
  enumerable: true,
  get: function () {
    return _LinearModel.default;
  }
});
Object.defineProperty(exports, "Log", {
  enumerable: true,
  get: function () {
    return _Log.default;
  }
});
Object.defineProperty(exports, "LogModel", {
  enumerable: true,
  get: function () {
    return _LogModel.default;
  }
});
Object.defineProperty(exports, "Pot", {
  enumerable: true,
  get: function () {
    return _Pot.default;
  }
});
Object.defineProperty(exports, "PotModel", {
  enumerable: true,
  get: function () {
    return _PotModel.default;
  }
});

var _Linear = _interopRequireDefault(require("./Linear/Linear"));

var _LinearModel = _interopRequireDefault(require("./Linear/LinearModel"));

var _Log = _interopRequireDefault(require("./Log/Log"));

var _LogModel = _interopRequireDefault(require("./Log/LogModel"));

var _Pot = _interopRequireDefault(require("./pot/Pot"));

var _PotModel = _interopRequireDefault(require("./pot/PotModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Linear/Linear":"pot/Linear/Linear.js","./Linear/LinearModel":"pot/Linear/LinearModel.js","./Log/Log":"pot/Log/Log.js","./Log/LogModel":"pot/Log/LogModel.js","./pot/Pot":"pot/pot/Pot.js","./pot/PotModel":"pot/pot/PotModel.js"}],"stomp/box/BoxModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ConnectableModel2 = _interopRequireDefault(require("../../Connectable/ConnectableModel"));

var _math = _interopRequireDefault(require("../../../lib/math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for base pedal
 * 
 * @extends {ConnectableModel}
 */
var BoxModel = /*#__PURE__*/function (_ConnectableModel) {
  _inherits(BoxModel, _ConnectableModel);

  var _super = _createSuper(BoxModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function BoxModel(context) {
    var _this;

    _classCallCheck(this, BoxModel);

    _this = _super.call(this, context);
    _this.level = _this.context.createGain();

    _this.effects.push(_this.level);

    _this.nodes = [];
    return _this;
  }
  /**
   * Sets the level of the effect.
   * 
   * @param {number} newLevel The new level of the effect.
   */


  _createClass(BoxModel, [{
    key: "setLevel",
    value: function setLevel(newLevel) {
      newLevel = Math.min(newLevel, 10);
      newLevel = newLevel / 10;
      this.level.gain.value = newLevel;
    }
    /**
     * Routes the internal effects chain.
     * @override
     * @protected
     */

  }, {
    key: "routeInternal",
    value: function routeInternal() {
      var chain = this.chain;

      for (var i = 0, len = chain.length - 1; i < len; i++) {
        chain[i].connect(chain[i + 1]);
      }

      this.nodes = [[this.effects[0], this.inputBuffer, this.outputBuffer], [this.outputBuffer, _math.default.peek(this.effects), null]];
    }
  }]);

  return BoxModel;
}(_ConnectableModel2.default);

var _default = BoxModel;
exports.default = _default;
},{"../../Connectable/ConnectableModel":"Connectable/ConnectableModel.js","../../../lib/math":"../lib/math.js"}],"Led.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SwitchModel = _interopRequireDefault(require("./footswitch/Switch/SwitchModel"));

var _Component2 = _interopRequireDefault(require("./ui/Component"));

var _Switch = _interopRequireDefault(require("./footswitch/Switch/Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * LED is a simple component used to show the status of switches.
 *
 * @extends {Component}
 *
 */
var Led = /*#__PURE__*/function (_Component) {
  _inherits(Led, _Component);

  var _super = _createSuper(Led);

  /**
   * 
   * @param {Switch=} opt_footswitch Footswitch this LED will follow.
   * @param {string=} opt_name Name of the LED. Will be written under it.
   */
  function Led(opt_footswitch, opt_name) {
    var _this;

    _classCallCheck(this, Led);

    _this = _super.call(this);
    _this.footswitch = opt_footswitch;
    _this.name = opt_name || '';
    _this.state = false;

    _this.bindModelEvents();

    return _this;
  }
  /**
   * Toggles the state of the LED explicitly. Normally, this is unnecessary given a footswitch.
   */


  _createClass(Led, [{
    key: "toggle",
    value: function toggle() {
      this.state = !this.state;
      this.updateUi();
    }
    /**
     * Updates the user interface - glow - accordingly.
     */

  }, {
    key: "updateUi",
    value: function updateUi() {
      if (this.rendered) {
        this.el.classList.toggle('on', this.state);
      }
    }
    /**
     * @override
     */

  }, {
    key: "template",
    value: function template() {
      return "<div class=\"led\">\n                    <div class=\"nameHolder\">\n                        <div class=\"name\">".concat(this.name, "</div>\n                    </div>\n                </div>");
    }
    /**
     * @override
     */

  }, {
    key: "onAfterRender",
    value: function onAfterRender() {
      _get(_getPrototypeOf(Led.prototype), "onAfterRender", this).call(this);

      this.updateUi();
    }
    /**
     * @override
     */

  }, {
    key: "bindModelEvents",
    value: function bindModelEvents() {
      if (this.footswitch) {
        this.footswitch.model.addEventListener([_SwitchModel.default.EventType.ON, _SwitchModel.default.EventType.OFF], this.onSwitchValueChange, false); // goog.events.listen(
        //     this.footswitch.model,
        //     [SwitchModel.EventType.ON, SwitchModel.EventType.OFF],
        //     this.onSwitchValueChange,
        //     false,
        //     this
        // );
      }
    }
    /**
     * Acts on an off or on event dispatched from this LED's footswitch. Updates the UI accordingly.
     * 
     * @param {{newValue: boolean}} e ON / OFF event of the switch.
     */

  }, {
    key: "onSwitchValueChange",
    value: function onSwitchValueChange(e) {
      this.state = e.newValue;
      this.updateUi();
    }
  }]);

  return Led;
}(_Component2.default);

var _default = Led;
exports.default = _default;
},{"./footswitch/Switch/SwitchModel":"footswitch/Switch/SwitchModel.js","./ui/Component":"ui/Component.js","./footswitch/Switch/Switch":"footswitch/Switch/Switch.js"}],"stomp/box/Box.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Connectable2 = _interopRequireDefault(require("../../Connectable/Connectable"));

var _SwitchModel = _interopRequireDefault(require("../../footswitch/Switch/SwitchModel"));

var _BoxModel = _interopRequireDefault(require("./BoxModel"));

var _Toggle = _interopRequireDefault(require("../../footswitch/toggle/Toggle"));

var _Led = _interopRequireDefault(require("../../Led"));

var _Linear = _interopRequireDefault(require("../../pot/Linear/Linear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Box = /*#__PURE__*/function (_Connectable) {
  _inherits(Box, _Connectable);

  var _super = _createSuper(Box);

  function Box(context) {
    var _this;

    _classCallCheck(this, Box);

    _this = _super.call(this, context);
    _this.modelClass = _BoxModel.default;
    _this.volumePot = null;
    _this.bypassSwitch = null;
    _this.led = null;
    _this.leds = [];
    _this.switches = [];
    _this.pots = [];
    /**
     * DOM selector mappings.
     *
     * @enum {string}
     */

    _this.mappings = {
      POTS: '.pots',
      SWITCHES: '.switches',
      LEDS: '.leds'
    };
    /**
     * Name of the pedal. It's written on top plate.
     *
     * @type {string}
     */

    _this.name = 'pb';
    return _this;
  }
  /**
   * @override
   */


  _createClass(Box, [{
    key: "createChildComponents",
    value: function createChildComponents() {
      this.createPots();
      this.createSwitches();
    }
    /**
     * Creates the potentiometers of this stomp box.
     */

  }, {
    key: "createPots",
    value: function createPots() {
      this.volumePot = new _Linear.default(this.model.level.gain, 'volume', 1);
      this.volumePot.setValue(1);
      this.pots.push(this.volumePot);
    }
    /**
     * Creates the switches of this stomp box.
     */

  }, {
    key: "createSwitches",
    value: function createSwitches() {
      this.bypassSwitch = new _Toggle.default();
      this.led = new _Led.default(this.bypassSwitch);
      this.leds.push(this.led);
      this.switches.push(this.bypassSwitch);
      var that = this;
      this.bypassSwitch.model.addEventListener(_SwitchModel.default.EventType.ON, function () {
        this.model.routeInternal();
        setTimeout(function () {
          that.model.routeInternal();
        }, 10);
      }, false);
    }
    /**
     * @override
     */

  }, {
    key: "connect",
    value: function connect(destination) {
      _get(_getPrototypeOf(Box.prototype), "connect", this).call(this, destination);

      this.bypassSwitch.setNodes(this.model.nodes);
    }
    /**
     * Sets the level of the effect.
     * 
     * @param {number} newLevel The new level of the effect.
     */

  }, {
    key: "setLevel",
    value: function setLevel(newLevel) {
      this.volumePot.setValue(newLevel);
    }
    /**
     * @override
     */

  }, {
    key: "template",
    value: function template() {
      var className = this.name.replace(/\s/g, '-').toLowerCase();
      return "\n            <div class=\"box ".concat(className, "\">\n                <div class=\"pots\"></div>\n                <div class=\"name\">").concat(this.name, "</div>\n                <div class=\"leds\"></div>\n                <div class=\"switches\"></div>\n                ", "\n            </div>");
    }
    /**
     * This method is called after the stomp box is appended to DOM. It then renders all its potentiometers.
     * @override
     */

  }, {
    key: "onAfterRender",
    value: function onAfterRender() {
      var _this2 = this;

      _get(_getPrototypeOf(Box.prototype), "onAfterRender", this).call(this);

      this.pots.forEach(function (pot) {
        pot.render(_this2.$(_this2.mappings.POTS)[0]);
      }, this);
      this.switches.forEach(function (sw) {
        sw.render(_this2.$(_this2.mappings.SWITCHES)[0]);
      }, this);
      this.leds.forEach(function (led) {
        led.render(_this2.$(_this2.mappings.LEDS)[0]);
      }, this);
    }
  }]);

  return Box;
}(_Connectable2.default);

var _default = Box;
exports.default = _default;
},{"../../Connectable/Connectable":"Connectable/Connectable.js","../../footswitch/Switch/SwitchModel":"footswitch/Switch/SwitchModel.js","./BoxModel":"stomp/box/BoxModel.js","../../footswitch/toggle/Toggle":"footswitch/toggle/Toggle.js","../../Led":"Led.js","../../pot/Linear/Linear":"pot/Linear/Linear.js"}],"stomp/conv/ConvModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoxModel2 = _interopRequireDefault(require("../box/BoxModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for conv pedal.
 * 
 * @extends {BoxModel}
 */
var ConvModel = /*#__PURE__*/function (_BoxModel) {
  _inherits(ConvModel, _BoxModel);

  var _super = _createSuper(ConvModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function ConvModel(context) {
    var _this;

    _classCallCheck(this, ConvModel);

    _this = _super.call(this, context);
    _this.conv = _this.context.createConvolver();
    _this.convGain = _this.context.createGain();
    _this.effects = [_this.conv, _this.convGain];
    /**
     * The path of the impulse response of this conv.
     * 
     * @type {string}
     */

    _this.iRPath;
    _this.iRPath && _this.loadIR();
    return _this;
  }
  /**
   * @override
   */


  _createClass(ConvModel, [{
    key: "routeInternal",
    value: function routeInternal() {
      _get(_getPrototypeOf(ConvModel.prototype), "routeInternal", this).call(this);

      this.inputBuffer.connect(this.outputBuffer);
    }
    /**
     * Loads the impulse response.
     */

  }, {
    key: "loadIR",
    value: function loadIR() {
      var that = this,
          request = new XMLHttpRequest();
      request.open('GET', this.iRPath, true);
      request.responseType = 'arraybuffer';

      request.onload = function () {
        that.context.decodeAudioData(
        /** @type {!ArrayBuffer} */
        request.response, function (buffer) {
          that.conv.buffer = buffer;
        });
      };

      request.send();
    }
  }]);

  return ConvModel;
}(_BoxModel2.default);

var _default = ConvModel;
exports.default = _default;
},{"../box/BoxModel":"stomp/box/BoxModel.js"}],"stomp/cabinet/CabinetModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ConvModel2 = _interopRequireDefault(require("../conv/ConvModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for Cabinet pedal.
 *
 * @extends {ConvModel}
 */
var CabinetModel = /*#__PURE__*/function (_ConvModel) {
  _inherits(CabinetModel, _ConvModel);

  var _super = _createSuper(CabinetModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function CabinetModel(context) {
    var _this;

    _classCallCheck(this, CabinetModel);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.iRPath = 'audio/ir/speaker/AK-SPKRS_VinUs_002.wav';
    return _this;
  }

  return CabinetModel;
}(_ConvModel2.default);

var _default = CabinetModel;
exports.default = _default;
},{"../conv/ConvModel":"stomp/conv/ConvModel.js"}],"stomp/conv/Conv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Box2 = _interopRequireDefault(require("../box/Box"));

var _ConvModel = _interopRequireDefault(require("./ConvModel"));

var _Pot = _interopRequireDefault(require("../../pot/pot/Pot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Conv pedal.
 * 
 * @extends {Box}
 */
var Conv = /*#__PURE__*/function (_Box) {
  _inherits(Conv, _Box);

  var _super = _createSuper(Conv);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will operate on.
   */
  function Conv(context) {
    var _this;

    _classCallCheck(this, Conv);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.modelClass = _ConvModel.default;
    /**
     * @override
     */

    _this.name = 'convo';
    /**
     * @type {number} The gain multiplier for the level pot. Some IR responses are too high on volume and they need
     * to be tamed.
     */

    _this.gainMultiplier = 1;
    return _this;
  }
  /**
   * @override
   */


  _createClass(Conv, [{
    key: "createPots",
    value: function createPots() {
      this.volumePot = new _Pot.default(this.model.convGain.gain, 'effect', this.gainMultiplier);
      this.pots = [].concat(this.volumePot);
    }
  }]);

  return Conv;
}(_Box2.default);

var _default = Conv;
exports.default = _default;
},{"../box/Box":"stomp/box/Box.js","./ConvModel":"stomp/conv/ConvModel.js","../../pot/pot/Pot":"pot/pot/Pot.js"}],"stomp/cabinet/Cabinet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CabinetModel = _interopRequireDefault(require("./CabinetModel"));

var _Conv2 = _interopRequireDefault(require("../conv/Conv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Cabinet Pedal.
 * 
 * @extends {Conv}
 */
var Cabinet = /*#__PURE__*/function (_Conv) {
  _inherits(Cabinet, _Conv);

  var _super = _createSuper(Cabinet);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Cabinet(context) {
    var _this;

    _classCallCheck(this, Cabinet);

    _this = _super.call(this, context);

    _this.volumePot.setValue(1);
    /**
     * @override
     */


    _this.modelClass = _CabinetModel.default;
    /**
     * @override
     */

    _this.name = 'cabinet';
    /**
     * @override
     */

    _this.gainMultiplier = 10;
    return _this;
  }

  return Cabinet;
}(_Conv2.default);

var _default = Cabinet;
exports.default = _default;
},{"./CabinetModel":"stomp/cabinet/CabinetModel.js","../conv/Conv":"stomp/conv/Conv.js"}],"stomp/delay/DelayModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoxModel2 = _interopRequireDefault(require("../box/BoxModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for delay pedal.
 * @extends {BoxModel}
 */
var DelayModel = /*#__PURE__*/function (_BoxModel) {
  _inherits(DelayModel, _BoxModel);

  var _super = _createSuper(DelayModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function DelayModel(context) {
    var _this;

    _classCallCheck(this, DelayModel);

    _this = _super.call(this, context);
    _this.delayer = _this.context.createDelay();
    _this.delayer.delayTime.value = 0.4;
    _this.feedbackGain = _this.context.createGain();
    _this.feedbackGain.gain.value = 0.9;
    _this.effects = [_this.delayer, _this.feedbackGain, _this.level];
    return _this;
  }
  /**
   * Sets the delay timer level.
   *
   * @param {number} newTimer New delay timer value to be set.
   */


  _createClass(DelayModel, [{
    key: "setDelayTimer",
    value: function setDelayTimer(newTimer) {
      this.delayer.delayTime.value = newTimer;
    }
    /**
     * Sets the feedback gain level.
     *
     * @param {number} newGain New gain value to be set.
     */

  }, {
    key: "setFeedbackGain",
    value: function setFeedbackGain(newGain) {
      this.feedbackGain.gain.value = newGain;
    }
  }, {
    key: "routeInternal",

    /**
     * @override
     */
    value: function routeInternal() {
      _get(_getPrototypeOf(DelayModel.prototype), "routeInternal", this).call(this);

      this.feedbackGain.connect(this.delayer);
      this.inputBuffer.connect(this.outputBuffer);
    }
  }]);

  return DelayModel;
}(_BoxModel2.default);

var _default = DelayModel;
exports.default = _default;
},{"../box/BoxModel":"stomp/box/BoxModel.js"}],"stomp/delay/Delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Box2 = _interopRequireDefault(require("../box/Box"));

var _DelayModel = _interopRequireDefault(require("./DelayModel"));

var _Log = _interopRequireDefault(require("../../pot/Log/Log"));

var _Linear = _interopRequireDefault(require("../../pot/Linear/Linear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Delay pedal.
 *
 * @extends {Box}
 */
var Delay = /*#__PURE__*/function (_Box) {
  _inherits(Delay, _Box);

  var _super = _createSuper(Delay);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Delay(context) {
    var _this;

    _classCallCheck(this, Delay);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.modelClass = _DelayModel.default;
    _this.delayTimerPot = null;
    _this.feedbackGainPot = null;
    /**
     * @override
     */

    _this.name = 'delay';
    return _this;
  }
  /**
   * @override
   */


  _createClass(Delay, [{
    key: "createPots",
    value: function createPots() {
      _get(_getPrototypeOf(Delay.prototype), "createPots", this).call(this);

      var delayTimeHandler = this.model.setDelayTimer.bind(this.model);
      var feedbackGainHandler = this.model.setFeedbackGain.bind(this.model);
      this.delayTimerPot = new _Log.default(delayTimeHandler, 'delay time', 5);
      this.feedbackGainPot = new _Linear.default(feedbackGainHandler, 'feedback gain', 0.95);
      this.pots.push(this.delayTimerPot, this.feedbackGainPot);
    }
  }, {
    key: "setDelayTimer",

    /**
     * Sets the delay timer pot.
     *
     * @param {number} newTimer New delay timer value in range 0-5 seconds.
     */
    value: function setDelayTimer(newTimer) {
      this.delayTimerPot.setValue(newTimer);
    }
  }, {
    key: "setFeedbackGain",

    /**
     * Sets the feedback gain pot.
     *
     * @param {number} newGain New gain value in range 0-0.95.
     */
    value: function setFeedbackGain(newGain) {
      this.feedbackGainPot.setValue(newGain);
    }
  }]);

  return Delay;
}(_Box2.default);

var _default = Delay;
exports.default = _default;
},{"../box/Box":"stomp/box/Box.js","./DelayModel":"stomp/delay/DelayModel.js","../../pot/Log/Log":"pot/Log/Log.js","../../pot/Linear/Linear":"pot/Linear/Linear.js"}],"stomp/overdrive/OverdriveModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoxModel2 = _interopRequireDefault(require("../box/BoxModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for overdrive pedal.
 *
 * @extends {BoxModel}
 */
var OverdriveModel = /*#__PURE__*/function (_BoxModel) {
  _inherits(OverdriveModel, _BoxModel);

  var _super = _createSuper(OverdriveModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function OverdriveModel(context) {
    var _this;

    _classCallCheck(this, OverdriveModel);

    _this = _super.call(this, context);
    _this.lowPassFreq = 3000;
    _this.lowPass = _this.context.createBiquadFilter();
    _this.lowPass.type = 'lowpass';
    _this.lowPass.frequency.value = _this.lowPassFreq;
    _this.waveShaper = _this.context.createWaveShaper();
    _this.wsCurve = null;
    _this.effects = [_this.waveShaper, _this.lowPass, _this.level];
    return _this;
  }
  /**
   * Creates two wave shaper curves that introduce distortion to the incoming signal.
   *
   * @param {number} amount Amount of distortion to be applied.
   */


  _createClass(OverdriveModel, [{
    key: "createWSCurve",
    value: function createWSCurve(amount) {
      var k = amount;
      var n_samples = 22050;
      this.wsCurve = new Float32Array(n_samples);
      var deg = Math.PI / 180;

      for (var i = 0; i < n_samples; i += 1) {
        var x = i * 2 / n_samples - 1;
        this.wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
      }

      this.waveShaper.curve = this.wsCurve;
    }
  }, {
    key: "setDrive",

    /**
     * Sets the drive level.
     *
     * @param {number} newDrive Drive level to set.
     */
    value: function setDrive(newDrive) {
      this.createWSCurve(10 * newDrive);
    }
  }, {
    key: "setTone",

    /**
     * Sets the tone level.
     * @param {number} newTone Tone level to set.
     */
    value: function setTone(newTone) {
      this.lowPass.frequency.value = 2000 + newTone;
    }
  }]);

  return OverdriveModel;
}(_BoxModel2.default);

var _default = OverdriveModel;
exports.default = _default;
},{"../box/BoxModel":"stomp/box/BoxModel.js"}],"stomp/overdrive/Overdrive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Box2 = _interopRequireDefault(require("../box/Box"));

var _OverdriveModel = _interopRequireDefault(require("./OverdriveModel"));

var _Pot = _interopRequireDefault(require("../../pot/pot/Pot"));

var _Log = _interopRequireDefault(require("../../pot/Log/Log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Overdrive pedal.
 *
 * @extends {Box}
 */
var Overdrive = /*#__PURE__*/function (_Box) {
  _inherits(Overdrive, _Box);

  var _super = _createSuper(Overdrive);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Overdrive(context) {
    var _this;

    _classCallCheck(this, Overdrive);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.modelClass = _OverdriveModel.default;
    _this.drivePot = null;
    _this.tonePot = null;
    /**
     * @override
     */

    _this.name = 'overdrive';
    return _this;
  }
  /**
   * @override
   */


  _createClass(Overdrive, [{
    key: "createPots",
    value: function createPots() {
      _get(_getPrototypeOf(Overdrive.prototype), "createPots", this).call(this);

      var driveHandler = this.model.setDrive.bind(this.model);
      var toneHandler = this.model.setTone.bind(this.model);
      this.drivePot = new _Log.default(driveHandler, 'drive', 2000);
      this.tonePot = new _Log.default(toneHandler, 'tone', 3000, _Pot.default.Size.SMALL);
      this.pots.push(this.drivePot, this.tonePot);
    }
  }, {
    key: "setDrive",

    /**
     * Sets the drive pot.
     *
     * @param {number} newValue New drive value, ranges between 0-10.
     */
    value: function setDrive(newValue) {
      this.drivePot.setValue(newValue);
    }
  }, {
    key: "setTone",

    /**
     * Sets the tone pot.
     *
     * @param {number} newValue New tone value.
     */
    value: function setTone(newValue) {
      this.tonePot.setValue(newValue);
    }
  }]);

  return Overdrive;
}(_Box2.default);

var _default = Overdrive;
exports.default = _default;
},{"../box/Box":"stomp/box/Box.js","./OverdriveModel":"stomp/overdrive/OverdriveModel.js","../../pot/pot/Pot":"pot/pot/Pot.js","../../pot/Log/Log":"pot/Log/Log.js"}],"stomp/reverb/ReverbModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ConvModel2 = _interopRequireDefault(require("../conv/ConvModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for reverb pedal.
 *
 * @extends {ConvModel}
 */
var ReverbModel = /*#__PURE__*/function (_ConvModel) {
  _inherits(ReverbModel, _ConvModel);

  var _super = _createSuper(ReverbModel);

  /**
   * 
   * @param {AudioContext} context The context this component model will operate on.
   */
  function ReverbModel(context) {
    var _this;

    _classCallCheck(this, ReverbModel);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.iRPath = 'audio/ir/reverb/pcm90cleanplate.wav';
    return _this;
  }

  return ReverbModel;
}(_ConvModel2.default);

var _default = ReverbModel;
exports.default = _default;
},{"../conv/ConvModel":"stomp/conv/ConvModel.js"}],"stomp/reverb/Reverb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReverbModel = _interopRequireDefault(require("./ReverbModel"));

var _Conv2 = _interopRequireDefault(require("../conv/Conv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Reverb pedal.
 *
 * @extends {Conv}
 */
var Reverb = /*#__PURE__*/function (_Conv) {
  _inherits(Reverb, _Conv);

  var _super = _createSuper(Reverb);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Reverb(context) {
    var _this;

    _classCallCheck(this, Reverb);

    _this = _super.call(this, context);
    /**
     * @override
     */

    _this.modelClass = _ReverbModel.default;
    /**
     * @override
     */

    _this.name = 'reverb';
    /**
     * @override
     */

    _this.gainMultiplier = 1;
    return _this;
  }

  return Reverb;
}(_Conv2.default);

var _default = Reverb;
exports.default = _default;
},{"./ReverbModel":"stomp/reverb/ReverbModel.js","../conv/Conv":"stomp/conv/Conv.js"}],"stomp/volume/VolumeModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoxModel2 = _interopRequireDefault(require("../box/BoxModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Component model for volume pedal.
 *
 * @extends {BoxModel}
 */
var VolumeModel = /*#__PURE__*/function (_BoxModel) {
  _inherits(VolumeModel, _BoxModel);

  var _super = _createSuper(VolumeModel);

  function VolumeModel() {
    _classCallCheck(this, VolumeModel);

    return _super.apply(this, arguments);
  }

  return VolumeModel;
}(_BoxModel2.default);

exports.default = VolumeModel;
},{"../box/BoxModel":"stomp/box/BoxModel.js"}],"stomp/volume/Volume.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Box2 = _interopRequireDefault(require("../box/Box"));

var _VolumeModel = _interopRequireDefault(require("./VolumeModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Volume pedal.
 *
 * @extends {Box}
 */
var Volume = /*#__PURE__*/function (_Box) {
  _inherits(Volume, _Box);

  var _super = _createSuper(Volume);

  /**
   * 
   * @param {AudioContext} context Audio context the pedal will work on.
   */
  function Volume(context) {
    var _this;

    _classCallCheck(this, Volume);

    _this = _super.call(this, context);

    _this.volumePot.setValue(1);
    /**
     * @override
     */


    _this.modelClass = _VolumeModel.default;
    /**
     * @override
     */

    _this.name = 'volume';
    return _this;
  }

  return Volume;
}(_Box2.default);

var _default = Volume;
exports.default = _default;
},{"../box/Box":"stomp/box/Box.js","./VolumeModel":"stomp/volume/VolumeModel.js"}],"stomp/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Box", {
  enumerable: true,
  get: function () {
    return _Box.default;
  }
});
Object.defineProperty(exports, "BoxModel", {
  enumerable: true,
  get: function () {
    return _BoxModel.default;
  }
});
Object.defineProperty(exports, "Cabinet", {
  enumerable: true,
  get: function () {
    return _Cabinet.default;
  }
});
Object.defineProperty(exports, "CabinetModel", {
  enumerable: true,
  get: function () {
    return _CabinetModel.default;
  }
});
Object.defineProperty(exports, "Conv", {
  enumerable: true,
  get: function () {
    return _Conv.default;
  }
});
Object.defineProperty(exports, "ConvModel", {
  enumerable: true,
  get: function () {
    return _ConvModel.default;
  }
});
Object.defineProperty(exports, "Delay", {
  enumerable: true,
  get: function () {
    return _Delay.default;
  }
});
Object.defineProperty(exports, "DelayModel", {
  enumerable: true,
  get: function () {
    return _DelayModel.default;
  }
});
Object.defineProperty(exports, "Overdrive", {
  enumerable: true,
  get: function () {
    return _Overdrive.default;
  }
});
Object.defineProperty(exports, "OverdriveModel", {
  enumerable: true,
  get: function () {
    return _OverdriveModel.default;
  }
});
Object.defineProperty(exports, "Reverb", {
  enumerable: true,
  get: function () {
    return _Reverb.default;
  }
});
Object.defineProperty(exports, "ReverbModel", {
  enumerable: true,
  get: function () {
    return _ReverbModel.default;
  }
});
Object.defineProperty(exports, "Volume", {
  enumerable: true,
  get: function () {
    return _Volume.default;
  }
});
Object.defineProperty(exports, "VolumeModel", {
  enumerable: true,
  get: function () {
    return _VolumeModel.default;
  }
});

var _Box = _interopRequireDefault(require("./box/Box"));

var _BoxModel = _interopRequireDefault(require("./box/BoxModel"));

var _Cabinet = _interopRequireDefault(require("./cabinet/Cabinet"));

var _CabinetModel = _interopRequireDefault(require("./cabinet/CabinetModel"));

var _Conv = _interopRequireDefault(require("./conv/Conv"));

var _ConvModel = _interopRequireDefault(require("./conv/ConvModel"));

var _Delay = _interopRequireDefault(require("./delay/Delay"));

var _DelayModel = _interopRequireDefault(require("./delay/DelayModel"));

var _Overdrive = _interopRequireDefault(require("./overdrive/Overdrive"));

var _OverdriveModel = _interopRequireDefault(require("./overdrive/OverdriveModel"));

var _Reverb = _interopRequireDefault(require("./reverb/Reverb"));

var _ReverbModel = _interopRequireDefault(require("./reverb/ReverbModel"));

var _Volume = _interopRequireDefault(require("./volume/Volume"));

var _VolumeModel = _interopRequireDefault(require("./volume/VolumeModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./box/Box":"stomp/box/Box.js","./box/BoxModel":"stomp/box/BoxModel.js","./cabinet/Cabinet":"stomp/cabinet/Cabinet.js","./cabinet/CabinetModel":"stomp/cabinet/CabinetModel.js","./conv/Conv":"stomp/conv/Conv.js","./conv/ConvModel":"stomp/conv/ConvModel.js","./delay/Delay":"stomp/delay/Delay.js","./delay/DelayModel":"stomp/delay/DelayModel.js","./overdrive/Overdrive":"stomp/overdrive/Overdrive.js","./overdrive/OverdriveModel":"stomp/overdrive/OverdriveModel.js","./reverb/Reverb":"stomp/reverb/Reverb.js","./reverb/ReverbModel":"stomp/reverb/ReverbModel.js","./volume/Volume":"stomp/volume/Volume.js","./volume/VolumeModel":"stomp/volume/VolumeModel.js"}],"../lib/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @fileoverview Library module for color functions.
 */
var names = {
  'aliceblue': '#f0f8ff',
  'antiquewhite': '#faebd7',
  'aqua': '#00ffff',
  'aquamarine': '#7fffd4',
  'azure': '#f0ffff',
  'beige': '#f5f5dc',
  'bisque': '#ffe4c4',
  'black': '#000000',
  'blanchedalmond': '#ffebcd',
  'blue': '#0000ff',
  'blueviolet': '#8a2be2',
  'brown': '#a52a2a',
  'burlywood': '#deb887',
  'cadetblue': '#5f9ea0',
  'chartreuse': '#7fff00',
  'chocolate': '#d2691e',
  'coral': '#ff7f50',
  'cornflowerblue': '#6495ed',
  'cornsilk': '#fff8dc',
  'crimson': '#dc143c',
  'cyan': '#00ffff',
  'darkblue': '#00008b',
  'darkcyan': '#008b8b',
  'darkgoldenrod': '#b8860b',
  'darkgray': '#a9a9a9',
  'darkgreen': '#006400',
  'darkgrey': '#a9a9a9',
  'darkkhaki': '#bdb76b',
  'darkmagenta': '#8b008b',
  'darkolivegreen': '#556b2f',
  'darkorange': '#ff8c00',
  'darkorchid': '#9932cc',
  'darkred': '#8b0000',
  'darksalmon': '#e9967a',
  'darkseagreen': '#8fbc8f',
  'darkslateblue': '#483d8b',
  'darkslategray': '#2f4f4f',
  'darkslategrey': '#2f4f4f',
  'darkturquoise': '#00ced1',
  'darkviolet': '#9400d3',
  'deeppink': '#ff1493',
  'deepskyblue': '#00bfff',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'dodgerblue': '#1e90ff',
  'firebrick': '#b22222',
  'floralwhite': '#fffaf0',
  'forestgreen': '#228b22',
  'fuchsia': '#ff00ff',
  'gainsboro': '#dcdcdc',
  'ghostwhite': '#f8f8ff',
  'gold': '#ffd700',
  'goldenrod': '#daa520',
  'gray': '#808080',
  'green': '#008000',
  'greenyellow': '#adff2f',
  'grey': '#808080',
  'honeydew': '#f0fff0',
  'hotpink': '#ff69b4',
  'indianred': '#cd5c5c',
  'indigo': '#4b0082',
  'ivory': '#fffff0',
  'khaki': '#f0e68c',
  'lavender': '#e6e6fa',
  'lavenderblush': '#fff0f5',
  'lawngreen': '#7cfc00',
  'lemonchiffon': '#fffacd',
  'lightblue': '#add8e6',
  'lightcoral': '#f08080',
  'lightcyan': '#e0ffff',
  'lightgoldenrodyellow': '#fafad2',
  'lightgray': '#d3d3d3',
  'lightgreen': '#90ee90',
  'lightgrey': '#d3d3d3',
  'lightpink': '#ffb6c1',
  'lightsalmon': '#ffa07a',
  'lightseagreen': '#20b2aa',
  'lightskyblue': '#87cefa',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'lightsteelblue': '#b0c4de',
  'lightyellow': '#ffffe0',
  'lime': '#00ff00',
  'limegreen': '#32cd32',
  'linen': '#faf0e6',
  'magenta': '#ff00ff',
  'maroon': '#800000',
  'mediumaquamarine': '#66cdaa',
  'mediumblue': '#0000cd',
  'mediumorchid': '#ba55d3',
  'mediumpurple': '#9370db',
  'mediumseagreen': '#3cb371',
  'mediumslateblue': '#7b68ee',
  'mediumspringgreen': '#00fa9a',
  'mediumturquoise': '#48d1cc',
  'mediumvioletred': '#c71585',
  'midnightblue': '#191970',
  'mintcream': '#f5fffa',
  'mistyrose': '#ffe4e1',
  'moccasin': '#ffe4b5',
  'navajowhite': '#ffdead',
  'navy': '#000080',
  'oldlace': '#fdf5e6',
  'olive': '#808000',
  'olivedrab': '#6b8e23',
  'orange': '#ffa500',
  'orangered': '#ff4500',
  'orchid': '#da70d6',
  'palegoldenrod': '#eee8aa',
  'palegreen': '#98fb98',
  'paleturquoise': '#afeeee',
  'palevioletred': '#db7093',
  'papayawhip': '#ffefd5',
  'peachpuff': '#ffdab9',
  'peru': '#cd853f',
  'pink': '#ffc0cb',
  'plum': '#dda0dd',
  'powderblue': '#b0e0e6',
  'purple': '#800080',
  'red': '#ff0000',
  'rosybrown': '#bc8f8f',
  'royalblue': '#4169e1',
  'saddlebrown': '#8b4513',
  'salmon': '#fa8072',
  'sandybrown': '#f4a460',
  'seagreen': '#2e8b57',
  'seashell': '#fff5ee',
  'sienna': '#a0522d',
  'silver': '#c0c0c0',
  'skyblue': '#87ceeb',
  'slateblue': '#6a5acd',
  'slategray': '#708090',
  'slategrey': '#708090',
  'snow': '#fffafa',
  'springgreen': '#00ff7f',
  'steelblue': '#4682b4',
  'tan': '#d2b48c',
  'teal': '#008080',
  'thistle': '#d8bfd8',
  'tomato': '#ff6347',
  'turquoise': '#40e0d0',
  'violet': '#ee82ee',
  'wheat': '#f5deb3',
  'white': '#ffffff',
  'whitesmoke': '#f5f5f5',
  'yellow': '#ffff00',
  'yellowgreen': '#9acd32'
};
var hexTripletRe = /#(.)(.)(.)/;
var validHexColorRe = /^#(?:[0-9a-f]{3}){1,2}$/i;
var rgbColorRe = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;

var isValidRgbColor = function isValidRgbColor(str) {
  // Each component is separate (rather than using a repeater) so we can
  // capture the match. Also, we explicitly set each component to be either 0,
  // or start with a non-zero, to prevent octal numbers from slipping through.
  var regExpResultArray = str.match(rgbColorRe);

  if (regExpResultArray) {
    var r = Number(regExpResultArray[1]);
    var g = Number(regExpResultArray[2]);
    var b = Number(regExpResultArray[3]);

    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return [r, g, b];
    }
  }

  return [];
};
/**
 * Checks if a string is a valid hex color.  We expect strings of the format
 * #RRGGBB (ex: #1b3d5f) or #RGB (ex: #3CA == #33CCAA).
 * @param {string} str String to check.
 * @return {boolean} Whether the string is a valid hex color.
 * @private
 */


var isValidHexColor = function isValidHexColor(str) {
  return validHexColorRe.test(str);
};
/**
 * Normalize an hex representation of a color
 * @param {string} hexColor an hex color string.
 * @return {string} hex color in the format '#rrggbb' with all lowercase
 *     literals.
 */


var normalizeHex = function normalizeHex(hexColor) {
  if (!isValidHexColor(hexColor)) throw Error("".concat(hexColor, "' is not a valid hex color"));
  if (hexColor.length == 4) // of the form #RGB
    hexColor = hexColor.replace(hexTripletRe, '#$1$1$2$2$3$3');
  return hexColor.toLowerCase();
};
/**
 * Takes a string a prepends a '#' sign if one doesn't exist.
 * Small helper method for use by goog.color and friends.
 * @param {string} str String to check.
 * @return {string} The value passed in, prepended with a '#' if it didn't
 *     already have one.
 */


var prependHashIfNecessaryHelper = function prependHashIfNecessaryHelper(str) {
  return str.charAt(0) == '#' ? str : '#' + str;
};
/**
 * Parses a color out of a string.
 * @param {string} str Color in some format.
 * @return {{hex: string, type: string}} 'hex' is a string containing a hex
 *     representation of the color, 'type' is a string containing the type
 *     of color format passed in ('hex', 'rgb', 'named').
 */


var parse = function parse(str) {
  var result = {};
  str = String(str);
  var maybeHex = prependHashIfNecessaryHelper(str);

  if (isValidHexColor(maybeHex)) {
    result.hex = normalizeHex(maybeHex);
    result.type = 'hex';
    return result;
  } else {
    var rgb = isValidRgbColor(str);

    if (rgb.length) {
      result.hex = rgbArrayToHex(rgb);
      result.type = 'rgb';
      return result;
    } else if (names) {
      var hex = names[str.toLowerCase()];

      if (hex) {
        result.hex = hex;
        result.type = 'named';
        return result;
      }
    }
  }

  throw Error("".concat(str, " is not a valid color string"));
};
/**
 * Converts a color from RGB to hex representation.
 * @param {number} r Amount of red, int between 0 and 255.
 * @param {number} g Amount of green, int between 0 and 255.
 * @param {number} b Amount of blue, int between 0 and 255.
 * @return {string} hex representation of the color.
 */


var rgbToHex = function rgbToHex(r, g, b) {
  r = Number(r);
  g = Number(g);
  b = Number(b);

  if (r != (r & 255) || g != (g & 255) || b != (b & 255)) {
    throw Error("(".concat(r, ", ").concat(g, ", ").concat(b, ") is not a valid RGB color"));
  }

  var rgb = r << 16 | g << 8 | b;

  if (r < 0x10) {
    return "#".concat((0x1000000 | rgb).toString(16).substr(1));
  }

  return "#".concat(rgb.toString(16));
};
/**
 * Converts a color from RGB to hex representation.
 * @param {Array} rgb rgb representation of the color.
 * @return {string} hex representation of the color.
 */


var rgbArrayToHex = function rgbArrayToHex(rgb) {
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
/**
 * Converts a hex representation of a color to RGB.
 * @param {string} hex Color to convert.
 * @return {Array} rgb representation of the color.
 */


var hexToRgb = function hexToRgb(hex) {
  // hex = normalizeHex(hex);
  var rgb = parseInt(hex.substr(1), 16);
  var r = rgb >> 16;
  var g = rgb >> 8 & 255;
  var b = rgb & 255;
  return [r, g, b];
};
/**
 * Converts a hex representation of a color to HSL.
 * @param {string} hex Color to convert.
 * @return {Array} hsl representation of the color.
 */


var hexToHsl = function hexToHsl(hex) {
  var rgb = hexToRgb(hex);
  return rgbToHsl(rgb[0], rgb[1], rgb[2]);
};
/**
 * Converts a color from RGB color space to HSL color space.
 * Modified from {@link http://en.wikipedia.org/wiki/HLS_color_space}.
 * @param {number} r Value of red, in [0, 255].
 * @param {number} g Value of green, in [0, 255].
 * @param {number} b Value of blue, in [0, 255].
 * @return {!Array} hsl representation of the color.
 */


var rgbToHsl = function rgbToHsl(r, g, b) {
  // First must normalize r, g, b to be between 0 and 1.
  var normR = r / 255;
  var normG = g / 255;
  var normB = b / 255;
  var max = Math.max(normR, normG, normB);
  var min = Math.min(normR, normG, normB);
  var h = 0;
  var s = 0; // Luminosity is the average of the max and min rgb color intensities.

  var l = 0.5 * (max + min); // The hue and saturation are dependent on which color intensity is the max.
  // If max and min are equal, the color is gray and h and s should be 0.

  if (max != min) {
    if (max == normR) {
      h = 60 * (normG - normB) / (max - min);
    } else if (max == normG) {
      h = 60 * (normB - normR) / (max - min) + 120;
    } else if (max == normB) {
      h = 60 * (normR - normG) / (max - min) + 240;
    }

    if (0 < l && l <= 0.5) {
      s = (max - min) / (2 * l);
    } else {
      s = (max - min) / (2 - 2 * l);
    }
  } // Make sure the hue falls between 0 and 360.


  return [Math.round(h + 360) % 360, s, l];
};
/**
 * Blend two colors together, using the specified factor to indicate the weight
 * given to the first color
 * @param {Array} rgb1 First color represented in rgb.
 * @param {Array} rgb2 Second color represented in rgb.
 * @param {number} factor The weight to be given to rgb1 over rgb2. Values
 *     should be in the range [0, 1]. If less than 0, factor will be set to 0.
 *     If greater than 1, factor will be set to 1.
 * @return {!Array} Combined color represented in rgb.
 */


var blend = function blend(rgb1, rgb2, factor) {
  factor = _math.default.clamp(factor, 0, 1);
  return [Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])), Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])), Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]))];
};
/**
 * Adds black to the specified color, darkening it
 * @param {Array} rgb rgb representation of the color.
 * @param {number} factor Number in the range [0, 1]. 0 will do nothing, while
 *     1 will return black. If less than 0, factor will be set to 0. If greater
 *     than 1, factor will be set to 1.
 * @return {!Array} Combined rgb color.
 */


var darken = function darken(rgb, factor) {
  var black = [0, 0, 0];
  return blend(black, rgb, factor);
};

var _default = {
  names: names,
  hexTripletRe: hexTripletRe,
  validHexColorRe: validHexColorRe,
  rgbColorRe: rgbColorRe,
  isValidRgbColor: isValidRgbColor,
  isValidHexColor: isValidHexColor,
  normalizeHex: normalizeHex,
  prependHashIfNecessaryHelper: prependHashIfNecessaryHelper,
  parse: parse,
  rgbToHex: rgbToHex,
  rgbArrayToHex: rgbArrayToHex,
  hexToRgb: hexToRgb,
  hexToHsl: hexToHsl,
  rgbToHsl: rgbToHsl,
  blend: blend,
  darken: darken
};
exports.default = _default;
},{"./math":"../lib/math.js"}],"../lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./math"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultDomHelper;
var NodeType = {
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

var getOwnerDocument = function getOwnerDocument(node) {
  if (node) {
    return (
      /** @type {!Document} */
      node.nodeType == NodeType.DOCUMENT ? node : node.ownerDocument || node.document
    );
  }
};

var getDocument = function getDocument() {
  return document;
};

var DomHelper = function DomHelper() {
  var opt_document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, DomHelper);

  /**
   * Reference to the document object to use
   * @const
   * @type {!Document}
   */
  this.document_ = opt_document || document;
};

;

var removeNode = function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};

var getDomHelper = function getDomHelper(opt_element) {
  return opt_element ? new DomHelper(getOwnerDocument(opt_element)) : defaultDomHelper || (defaultDomHelper = new DomHelper());
};

var insertSiblingBefore = function insertSiblingBefore(newNode, refNode) {
  if (refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode);
  }
};

var getDocumentScrollElement = function getDocumentScrollElement(doc) {
  // Old WebKit needs body.scrollLeft in both quirks mode and strict mode. We
  // also default to the documentElement if the document does not have a body
  // (e.g. a SVG document).
  // Uses http://dev.w3.org/csswg/cssom-view/#dom-document-scrollingelement to
  // avoid trying to guess about browser behavior from the UA string.
  if (doc.scrollingElement) {
    return doc.scrollingElement;
  } // if (!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc)) {
  //   return doc.documentElement;
  // }


  return doc.body || doc.documentElement;
};

var getWindow = function getWindow(doc) {
  return (
    /** @type {!Window} */
    doc.parentWindow || doc.defaultView
  );
};

var getDocumentScroll = function getDocumentScroll(doc) {
  var el = getDocumentScrollElement(doc);
  var win = getWindow(doc); // if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher('10') &&
  //     win.pageYOffset != el.scrollTop) {
  //   // The keyboard on IE10 touch devices shifts the page using the pageYOffset
  //   // without modifying scrollTop. For this case, we want the body scroll
  //   // offsets.
  //   return new math.Coordinate(el.scrollLeft, el.scrollTop);
  // }

  return new _math.default.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};

var _default = {
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
};
exports.default = _default;
},{"./math":"../lib/math.js"}],"../lib/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./math"));

var _dom = _interopRequireDefault(require("./dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var getBoundingClientRect = function getBoundingClientRect(el) {
  try {
    return el.getBoundingClientRect();
  } catch (e) {
    // In IE, calling getBoundingClientRect on an orphan element raises an
    // "Unspecified Error". All other browsers return zeros.
    return {
      'left': 0,
      'top': 0,
      'right': 0,
      'bottom': 0
    };
  }
};

var getClientViewportElement = function getClientViewportElement(opt_node) {
  var doc;

  if (opt_node) {
    doc = _dom.default.getOwnerDocument(opt_node);
  } else {
    doc = _dom.default.getDocument();
  } // In old IE versions the document.body represented the viewport
  // if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9) &&
  //     !dom.getDomHelper(doc).isCss1CompatMode()) {
  //   return doc.body;
  // }


  return doc.documentElement;
};

var getPageOffset = function getPageOffset(el) {
  var doc = _dom.default.getOwnerDocument(el); // NOTE(arv): If element is hidden (display none or disconnected or any the
  // ancestors are hidden) we get (0,0) by default but we still do the
  // accumulation of scroll position.
  // TODO(arv): Should we check if the node is disconnected and in that case
  //            return (0,0)?


  var pos = new _math.default.Coordinate(0, 0);
  var viewportElement = getClientViewportElement(doc);

  if (el == viewportElement) {
    // viewport is always at 0,0 as that defined the coordinate system for this
    // function - this avoids special case checks in the code below
    return pos;
  }

  var box = getBoundingClientRect(el); // Must add the scroll coordinates in to get the absolute page offset
  // of element since getBoundingClientRect returns relative coordinates to
  // the viewport.

  var scrollCoord = _dom.default.getDomHelper(doc).getDocumentScroll();

  pos.x = box.left + scrollCoord.x;
  pos.y = box.top + scrollCoord.y;
  return pos;
};

var _default = {
  getBoundingClientRect: getBoundingClientRect,
  getClientViewportElement: getClientViewportElement,
  getPageOffset: getPageOffset
};
exports.default = _default;
},{"./math":"../lib/math.js","./dom":"../lib/dom.js"}],"ShadowMaker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadowMaker = shadowMaker;
exports.textShadowMaker = textShadowMaker;
exports.textShadowMakerDom = textShadowMakerDom;

var _color = _interopRequireDefault(require("../lib/color"));

var _style = _interopRequireDefault(require("../lib/style"));

var _dom = _interopRequireDefault(require("../lib/dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @fileoverview ShadowMaker for pb.
 */

/**
 * Casts shadows on a box element.
 *
 * @param {HTMLElement} element Element to cast my shadows upon.
 * @param {number} length Length of the shadow.
 * @param {number} darkness How dark the shadow will be.
 * @param {number} weight How vast the shadow will be.
 * @param {Array.<string>=} opt_before Any shadows to cast before mine.
 * @param {Array.<string>=} opt_after Any shadows to cast after mine.
 */
function shadowMaker(element, length, darkness, weight, opt_before, opt_after) {
  opt_before = opt_before || [];
  opt_after = opt_after || [];
  var elStyle = document.defaultView.getComputedStyle(element, null);
  var colorText = elStyle.getPropertyValue('background-color');

  var hslArray = _color.default.hexToHsl(_color.default.parse(colorText).hex);

  darkness = darkness || 1;
  hslArray[2] = hslArray[2] * darkness;
  /**
   * Returns a shadow declaration.
   * 
   * @param {number} x X distance.
   * @param {number} y Y distance.
   * @param {number} blur Blur amount.
   * @param {number} a Alpha.
   * @param {number} opt_d Density.
   * @return {string} The shadow CSS declaration.
   */

  var shadowTemplate = function shadowTemplate(x, y, blur, a) {
    var opt_d = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    opt_d = opt_d || 0;
    var d = "".concat(opt_d, "px");
    return "".concat(x, "px ").concat(y, "px ").concat(blur, "px ").concat(d, " hsl(").concat(hslArray[0], ", ").concat(hslArray[1] * 100, "%, ").concat(a, "%)");
  }; // let all = '';


  var shadows = [];
  var xAngle = (window.innerWidth / 2 - _style.default.getPageOffset(element).x - element.offsetWidth / 2) / 30;
  var yAngle = (window.innerHeight - _style.default.getPageOffset(element).y - element.offsetHeight / 2) / 80;
  var yConDist = yAngle * length / 10;
  var con = length;

  while (length--) {
    var xDist = xAngle * length / con;
    var yDist = yConDist * length * 2 / con; //yAngle * Math.sqrt(length) * length / con;

    shadows.push(shadowTemplate(xDist, yDist, 0, hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6));
  }

  shadows.splice(0, 0, shadowTemplate(xAngle, yConDist * 2, con * 4, 0, 0), //shadowTemplate(xAngle / weight, yConDist * 2, con / 2, 0,  con / 4 / weight),
  shadowTemplate(xAngle / weight / 8, yConDist * 3, con * 4, 30, con / 12), shadowTemplate(xAngle / weight / 8, yConDist * 2, con, 0, con / 4 / weight), shadowTemplate(xAngle / weight / 8, yConDist * 2.55, con * 2, 5, con / 3 / weight));
  shadows = [].concat(opt_before, shadows.reverse(), opt_after);
  element.style['boxShadow'] = shadows.join(', ');
  element.style['left'] = "-".concat(xAngle / 2, "px");
}
/**
 * Casts shadows on a text element.
 *
 * @param {HTMLElement} element Element to cast my shadows upon.
 * @param {number} length Length of the shadow.
 * @param {Array.<string>} before Any shadows to cast before mine.
 * @param {Array.<string>} after Any shadows to cast after mine.
 * @param {boolean} invertY Whether I should invert the Y axis and casts shadows up instead of down.
 * @param {number} invertX How I may invert the X axis.
 */


function textShadowMaker(element, length, before, after, invertY, invertX) {
  before = before || [];
  after = after || [];
  var elStyle = document.defaultView.getComputedStyle(element, null);
  var colorText = elStyle.getPropertyValue('color');

  var hslArray = _color.default.hexToHsl(_color.default.parse(colorText).hex);
  /**
   * Returns a shadow declaration.
   *
   * @param {number} x X distance.
   * @param {number} y Y distance.
   * @param {number} blur Blur amount.
   * @param {number} a Alpha.
   * @return {string} The shadow CSS declaration.
   */


  var shadowTemplate = function shadowTemplate(x, y, blur, a) {
    return "".concat(x, "px ").concat(y, "px ").concat(blur, "px hsl(").concat(hslArray[0], ", ").concat(hslArray[1] * 100, "%, ").concat(a, "%)");
  }; // let all = '';


  var shadows = [];
  var xAngle = (window.innerWidth / 2 - _style.default.getPageOffset(element).x - element.offsetWidth / 2) / 30;
  var yAngle = (window.innerHeight - _style.default.getPageOffset(element).y - element.offsetHeight / 2) / 30;
  var yConDist = yAngle * length / 10;
  var con = length;

  while (length--) {
    var xDist = xAngle * length / con;
    var yDist = yConDist * length * 2 / con; //yAngle * Math.sqrt(length) * length / con;

    if (invertY) yDist = -yDist;
    if (invertX) xDist = -xDist * Math.pow(invertX, 4);
    shadows.push(shadowTemplate(xDist, yDist, 0, hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6));
  }

  shadows.splice(0, 0, shadowTemplate(xAngle, 0, con * 2, 0), shadowTemplate(xAngle, yConDist * 1.8, con / 2, 0), shadowTemplate(xAngle, yConDist * 2.5, con * 2, 0));
  shadows = [].concat(before, shadows.reverse(), after);
  element.style.textShadow = shadows.join(', ');
}

;

function textShadowMakerDom(element, length) {
  element.style.position = 'absolute';
  var elStyle = document.defaultView.getComputedStyle(element, null);
  var colorText = elStyle.getPropertyValue('color');

  var rgbArray = _color.default.hexToRgb(_color.default.parse(colorText).hex);

  for (var i = 0; i < length; i++) {
    var el = element.cloneNode(true);
    el.style.position = 'absolute';
    el.style.webkitTransform = "translateZ(-".concat(i, "px)");
    el.style.color = _color.default.rgbArrayToHex(_color.default.darken(rgbArray, i / length * 0.8 + 0.2));

    _dom.default.insertSiblingBefore(el, element);

    if (i == length - 1) {
      el.style.textShadow = '0 0 10px black,0 0 20px black,0 0 30px black,0 0 40px black,0 0 50px black';
    }
  }
}

;
},{"../lib/color":"../lib/color.js","../lib/style":"../lib/style.js","../lib/dom":"../lib/dom.js"}],"Board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Connectable2 = _interopRequireDefault(require("./Connectable/Connectable"));

var _ShadowMaker = require("./ShadowMaker");

var _dom = _interopRequireDefault(require("../lib/dom"));

var _Box = _interopRequireDefault(require("./stomp/box/Box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Board = /*#__PURE__*/function (_Connectable) {
  _inherits(Board, _Connectable);

  var _super = _createSuper(Board);

  function Board(context) {
    var _this;

    _classCallCheck(this, Board);

    _this = _super.call(this, context);
    _this.context = context;
    _this.output = null;
    _this.mediaStreamDestination = null;
    /**
     * Pedals of this board.
     *
     * @protected
     * @type {Array.<Box>}
     */

    _this.pedals = null;
    /**
     * @enum {string} DOM mappings.
     */

    _this.mappings = {
      EMPTY: '.empty'
    };
    return _this;
  }
  /**
   * Adds pedals to this board. An alias method for addChildren.
   * @param {Array.<Box>} pedals Pedals.
   */


  _createClass(Board, [{
    key: "addPedals",
    value: function addPedals(pedals) {
      // Component.prototype.addChildren.call(this, pedals);
      this.addChildren(pedals);
    }
  }, {
    key: "doShadows",

    /**
     * Calculates and draws shadows for pedals and their pots.
     */
    value: function doShadows() {
      this.getPedals().forEach(function (pedal) {
        (0, _ShadowMaker.shadowMaker)(pedal.el, 40, 0.5, 0.7);
        pedal.pots.forEach(function (pot) {
          (0, _ShadowMaker.shadowMaker)(pot.$(pot.mappings.KNOB_HOLDER)[0], 10, 0.5, 4);
        });
      });
    }
  }, {
    key: "addChildAt",

    /**
     * @override
     *
     * @param {Box} child Child pedal to add to this board.
     * @param {number} index Where the child pedal should be put at.
     * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
     */
    value: function addChildAt(child, index, opt_render) {
      _get(_getPrototypeOf(Board.prototype), "addChildAt", this).call(this, child, index, opt_render);

      if (this.getPedals().length) _dom.default.removeNode(this.$(this.mappings.EMPTY)[0]);
      this.routeInternal();
      if (this.rendered) this.doShadows();
    }
  }, {
    key: "addPedalAt",

    /**
     * Convenience method for adding pedals at a given index.
     *
     * @param {Box} child Child pedal to add to this board.
     * @param {number} index Where the child pedal should be put at.
     * @param {boolean=} opt_render Whether the pedal should be rendered after the call to this function.
     */
    value: function addPedalAt(child, index, opt_render) {
      this.addChildAt(child, index, opt_render);
    }
  }, {
    key: "remove_child",

    /**
     * @override
     */
    value: function remove_child(child, opt_unrender) {
      var el = _get(_getPrototypeOf(Board.prototype), "remove_child", this).call(this, child, opt_unrender);

      if (this.getPedals().length == 0) this.el.innerHTML = this.templates_empty();
      this.routeInternal();
      return el;
    }
  }, {
    key: "onAfterRender",

    /**
     * @override
     */
    value: function onAfterRender() {
      _get(_getPrototypeOf(Board.prototype), "onAfterRender", this).call(this);

      this.doShadows();
    }
  }, {
    key: "getPedals",

    /**
     * Returns the pedals in this board.
     *
     * @return {Array.<Box>} Pedals in this board.
     */
    value: function getPedals() {
      return this.getChildren();
    }
  }, {
    key: "template",

    /**
     * @override
     */
    value: function template() {
      return "<div class=\"board\">\n              ".concat(this.templates_empty(), "\n            </div>");
    }
  }, {
    key: "templates_empty",
    value: function templates_empty() {
      return '<div class="empty"><div class="text">board is empty</div></div>';
    }
  }, {
    key: "connect",

    /**
     * @override
     */
    value: function connect(destination) {
      _get(_getPrototypeOf(Board.prototype), "connect", this).call(this, destination);

      this.output = destination;
      this.routeInternal();
    }
  }, {
    key: "routeInternal",

    /**
     * Routes the pedals.
     *
     * @protected
     */
    value: function routeInternal() {
      var fx = this.getPedals();
      this.getInput().disconnect();

      if (fx.length) {
        this.getInput().connect(fx[0].getInput());
        this.output && fx[fx.length - 1].connect(this.output);
        fx.forEach(function (pedal, i) {
          pedal.disconnect();
          fx[i + 1] && pedal.connect(fx[i + 1]);
        });
        this.output && this.mediaStreamDestination && fx[fx.length - 1].model.getOutput().connect(this.mediaStreamDestination);
      } else {
        this.getInput().connect(this.getOutput());
        this.mediaStreamDestination && this.getInput().connect(this.mediaStreamDestination);
      }
    }
  }, {
    key: "setMediaStreamDestination",

    /**
     * Sets the media stream destination for this board. The output will be sent to the media stream destination, too.
     *
     * @param {MediaStreamAudioDestinationNode} destination Media stream destination for RTC peer connections.
     */
    value: function setMediaStreamDestination(destination) {
      this.mediaStreamDestination = destination;
    }
  }]);

  return Board;
}(_Connectable2.default);

var _default = Board;
exports.default = _default;
},{"./Connectable/Connectable":"Connectable/Connectable.js","./ShadowMaker":"ShadowMaker.js","../lib/dom":"../lib/dom.js","./stomp/box/Box":"stomp/box/Box.js"}],"Stage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("./ui/Component"));

var _FileInput = _interopRequireDefault(require("./io/FileInput"));

var _Input = _interopRequireDefault(require("./io/Input"));

var _Output = _interopRequireDefault(require("./io/Output"));

var _Board = _interopRequireDefault(require("./Board"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Stage hosts pedal boards, input and output.
 * 
 * @extends {Component}
 */
var Stage = /*#__PURE__*/function (_Component) {
  _inherits(Stage, _Component);

  var _super = _createSuper(Stage);

  function Stage() {
    var _this;

    _classCallCheck(this, Stage);

    _this = _super.call(this);
    _this.input = null;
    _this.output = null;
    _this.board = null;
    _this.mediaStreamDestination = null;
    /**
     * The audio context for this stage.
     * 
     * @protected
     * @type {AudioContext}
     */

    _this.context = new AudioContext();

    _this.initIO();

    return _this;
  }
  /**
   * Gives the audio context created for this stage. Every effect, input and output in this stage should be declared on
   * this context.
   * 
   * @return {AudioContext} The audio context of this stage.
   */


  _createClass(Stage, [{
    key: "getContext",
    value: function getContext() {
      return this.context;
    }
    /**
     * Initializes the input and the output.
     */

  }, {
    key: "initIO",
    value: function initIO() {
      /*
          Example for FileInput:
              this.input = new FileInput(this.context, 'audio/samples/sample1.mp3');
                goog.events.listen(this.input, 'loaded', () => {
                  this.route();
              }, false, this);
      */
      this.input = new _Input.default(this.context);
      this.output = new _Output.default(this.context);
    }
    /**
     * Initializes the pedal components.
     * @param {Board} board Board component.
     */

  }, {
    key: "setBoard",
    value: function setBoard(board) {
      this.board && this.board.dispose();
      this.board = board;
      this.mediaStreamDestination && this.board.setMediaStreamDestination(this.mediaStreamDestination);
      this.route();
      this.addChild(this.board);
    }
    /**
     * Routes the signal.
     * Input -> volume pedal -> reverb pedal
     */

  }, {
    key: "route",
    value: function route() {
      this.input.disconnect();
      this.input.connect(this.board);
      this.board.connect(this.output);
    }
    /**
     * Sets the media stream destination for this stage. It will be forwarded to this stage's board.
     * 
     * @param {MediaStreamAudioDestinationNode} destination Media stream destination for RTC peer connections.
     */

  }, {
    key: "setMediaStreamDestination",
    value: function setMediaStreamDestination(destination) {
      this.mediaStreamDestination = destination;
      this.board.setMediaStreamDestination(this.mediaStreamDestination);
    }
    /**
     * Plays the input.
     * 
     * @param {string} url The url of the external sample. Since it will be interpreted as a relative path, it should
     * reside at the domain where the application runs.
     */

  }, {
    key: "play",
    value: function play(url) {
      this.input.disconnect();
      this.input = new _FileInput.default(this.context, url);
      this.route();
      this.input.on('loaded', function () {
        this.input.play.bind(this.input, 0);
      }, false);
    }
    /**
     * Stops the input.
     */

  }, {
    key: "stop",
    value: function stop() {
      this.input.stop();
    }
    /**
     * @override
     */

  }, {
    key: "template",
    value: function template() {
      return "<div class=\"stage\"></div>";
    }
  }]);

  return Stage;
}(_Component2.default);

var _default = Stage;
exports.default = _default;
},{"./ui/Component":"ui/Component.js","./io/FileInput":"io/FileInput.js","./io/Input":"io/Input.js","./io/Output":"io/Output.js","./Board":"Board.js"}],"Bootstrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Connectable", {
  enumerable: true,
  get: function () {
    return _Connectable.default;
  }
});
Object.defineProperty(exports, "footswitch", {
  enumerable: true,
  get: function () {
    return _footswitch.default;
  }
});
Object.defineProperty(exports, "io", {
  enumerable: true,
  get: function () {
    return _io.default;
  }
});
Object.defineProperty(exports, "pot", {
  enumerable: true,
  get: function () {
    return _pot.default;
  }
});
Object.defineProperty(exports, "stomp", {
  enumerable: true,
  get: function () {
    return _stomp.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _Component.default;
  }
});
Object.defineProperty(exports, "Board", {
  enumerable: true,
  get: function () {
    return _Board.default;
  }
});
Object.defineProperty(exports, "IConnectable", {
  enumerable: true,
  get: function () {
    return _IConnectable.default;
  }
});
Object.defineProperty(exports, "IConnectableModel", {
  enumerable: true,
  get: function () {
    return _IConnectableModel.default;
  }
});
Object.defineProperty(exports, "Led", {
  enumerable: true,
  get: function () {
    return _Led.default;
  }
});
Object.defineProperty(exports, "ShadowMaker", {
  enumerable: true,
  get: function () {
    return _ShadowMaker.default;
  }
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function () {
    return _Stage.default;
  }
});

var _Connectable = _interopRequireDefault(require("./Connectable"));

var _footswitch = _interopRequireDefault(require("./footswitch"));

var _io = _interopRequireDefault(require("./io"));

var _pot = _interopRequireDefault(require("./pot"));

var _stomp = _interopRequireDefault(require("./stomp"));

var _Component = _interopRequireDefault(require("./ui/Component"));

var _Board = _interopRequireDefault(require("./Board"));

var _IConnectable = _interopRequireDefault(require("./IConnectable"));

var _IConnectableModel = _interopRequireDefault(require("./IConnectableModel"));

var _Led = _interopRequireDefault(require("./Led"));

var _ShadowMaker = _interopRequireDefault(require("./ShadowMaker"));

var _Stage = _interopRequireDefault(require("./Stage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/**
 * Bootstrapper class includes things to do on startup.
 */
var Bootstrapper = function Bootstrapper() {
  _classCallCheck(this, Bootstrapper);
};

window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext'];
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; // export default Bootstrapper;
},{"./Connectable":"Connectable/index.js","./footswitch":"footswitch/index.js","./io":"io/index.js","./pot":"pot/index.js","./stomp":"stomp/index.js","./ui/Component":"ui/Component.js","./Board":"Board.js","./IConnectable":"IConnectable.js","./IConnectableModel":"IConnectableModel.js","./Led":"Led.js","./ShadowMaker":"ShadowMaker.js","./Stage":"Stage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55140" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Bootstrapper.js"], null)
//# sourceMappingURL=/Bootstrapper.js.map