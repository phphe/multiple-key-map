/*!
 * multiple-key-map v1.1.1
 * (c) 2017-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var MultipleKeyMap =
/*#__PURE__*/
function () {
  function MultipleKeyMap() {
    _classCallCheck(this, MultipleKeyMap);

    _defineProperty(this, "store", {});
  }

  _createClass(MultipleKeyMap, [{
    key: "set",
    value: function set(keys, value) {
      var node = this.store;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!node.children) {
            // 使用WeakMap时出错: Invalid value used as weak map key
            node.children = new Map();
          }

          if (!node.children.has(key)) {
            node.children.set(key, {});
          }

          node = node.children.get(key);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      node.value = value;
    }
  }, {
    key: "getNode",
    value: function getNode(keys) {
      var node = this.store;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (!node.children) {
            throw ["can't find by keys", keys];
          }

          node = node.children.get(key);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return node;
    }
  }, {
    key: "get",
    value: function get(keys) {
      return this.getNode(keys).value;
    }
  }, {
    key: "delete",
    value: function _delete(keys, deleteChildNodes, excludeSelf) {
      var targetNode = this.getNode(keys);

      if (!excludeSelf) {
        delete targetNode.value;
      }

      if (deleteChildNodes) {
        delete targetNode.children;
      } // 删除空分支


      this.autoDeleteEmptyNodes(keys);
    }
  }, {
    key: "autoDeleteEmptyNodes",
    value: function autoDeleteEmptyNodes(keys) {
      var nodes = [];
      var current = this.store;
      var keys2 = keys.slice();

      while (keys2.length > 0) {
        var key = keys2.shift();
        var node = current.children.get(key);
        nodes.unshift([key, node, current]);
        current = node;
      }

      for (var _i = 0; _i < nodes.length; _i++) {
        var _nodes$_i = _slicedToArray(nodes[_i], 3),
            _key = _nodes$_i[0],
            _node = _nodes$_i[1],
            parent = _nodes$_i[2];

        if (_node.children && _node.children.size === 0) {
          delete _node.children;
        }

        if (!_node.hasOwnProperty('value') && !_node.children) {
          parent.children.delete(_key);
        } else {
          break;
        }
      }
    }
  }, {
    key: "hasNode",
    value: function hasNode(keys) {
      try {
        return Boolean(this.getNode(keys));
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "has",
    value: function has(keys) {
      try {
        var node = this.getNode(keys);
        return Boolean(node && node.hasOwnProperty('value'));
      } catch (e) {
        return false;
      }
    }
  }]);

  return MultipleKeyMap;
}();

module.exports = MultipleKeyMap;
