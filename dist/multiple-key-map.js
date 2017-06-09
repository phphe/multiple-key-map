/*!
 * multiple-key-map v1.0.0
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/multiple-key-map.git
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.multipleKeyMap = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultipleKeyMap = function () {
  /**
   * [constructor description]
   * @param  {[Number]} levels [levels]
   */
  function MultipleKeyMap(levels) {
    _classCallCheck(this, MultipleKeyMap);

    this.map = new Map();
    this.size = 0;

    this.levels = levels;
  }
  /**
   * [set description]
   * @param {[type]} key1 []
   * @param {[type]} key2 []
   * @param {[type]} ... []
   * @param {[type]} value []
   */


  _createClass(MultipleKeyMap, [{
    key: "set",
    value: function set() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var value = args.pop();
      var lastKey = args.pop();
      var parent = this.map;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          if (!parent.has(arg)) {
            parent.set(arg, new Map());
          }
          parent = parent.get(arg);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      parent.set(lastKey, value);
      this.size++;
    }
    /**
     * [get description]
     * @param  {[type]} key1 [description]
     * @param  {[type]} key2 [description]
     * @param  {[type]} ... [description]
     * @return [type]        [description]
     */

  }, {
    key: "get",
    value: function get() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var lastKey = args.pop();
      var parent = this.map;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var arg = _step2.value;

          if (!parent.has(arg)) {
            return null;
          }
          parent = parent.get(arg);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return parent.get(lastKey);
    }
    /**
     * [get description]
     * @param  {[type]} key1 [description]
     * @param  {[type]} key2 [description]
     * @param  {[type]} ... [description]
     */

  }, {
    key: "delete",
    value: function _delete() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var lastKey = args.pop();
      var parent = this.map;
      var parents = [parent];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var arg = _step3.value;

          if (!parent.has(arg)) {
            return;
          }
          parent = parent.get(arg);
          parents.push(parent);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      parent.delete && parent.delete(lastKey);
      this.size--;
      for (var i = args.length - 1; i > 0; i--) {
        if (parents[i].size === 0) {
          parents[i - 1].delete(args[i]);
        }
      }
    }
    /**
     * [get description]
     * @param  {[type]} key1 [description]
     * @param  {[type]} key2 [description]
     * @param  {[type]} ... [description]
     * @return [Boolean]        [description]
     */

  }, {
    key: "has",
    value: function has() {
      return this.get.apply(this, arguments) != null;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.size = 0;
      this.map.clear();
    }
  }]);

  return MultipleKeyMap;
}();

return MultipleKeyMap;

})));
