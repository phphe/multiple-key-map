export default class MultipleKeyMap {
  store = {};
  set(keys, value) {
    let node = this.store
    for (const key of keys) {
      if (!node.children) {
        // 使用WeakMap时出错: Invalid value used as weak map key
        node.children = new Map
      }
      if (!node.children.has(key)) {
        node.children.set(key, {})
      }
      node = node.children.get(key)
    }
    node.value = value
  }
  getNode(keys) {
    let node = this.store
    for (const key of keys) {
      if (!node.children) {
        throw ["can't find by keys", keys]
      }
      node = node.children.get(key)
    }
    return node
  }
  get(keys) {
    return this.getNode(keys).value
  }
  delete(keys, deleteChildNodes, excludeSelf) {
    const targetNode = this.getNode(keys)
    if (!excludeSelf) {
      delete targetNode.value
    }
    if (deleteChildNodes) {
      delete targetNode.children
    }
    // 删除空分支
    this.autoDeleteEmptyNodes(keys)
  }
  autoDeleteEmptyNodes(keys) {
    const nodes = []
    let current = this.store
    let keys2 = keys.slice()
    while (keys2.length > 0) {
      const key = keys2.shift()
      const node = current.children.get(key)
      nodes.unshift([key, node, current])
      current = node
    }
    for (const [key, node, parent] of nodes) {
      if (node.children && node.children.size === 0) {
        delete node.children
      }
      if (!node.hasOwnProperty('value') && !node.children) {
        parent.children.delete(key)
      } else {
        break
      }
    }
  }
  hasNode(keys) {
    try {
      return Boolean(this.getNode(keys))
    } catch (e) {
      return false
    }
  }
  has(keys) {
    try {
      const node = this.getNode(keys)
      return Boolean(node && node.hasOwnProperty('value'))
    } catch (e) {
      return false
    }
  }
}
