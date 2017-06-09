export default class MultipleKeyMap {
  map = new Map();
  levels;
  size = 0;
  /**
   * [constructor description]
   * @param  {[Number]} levels [levels]
   */
  constructor(levels) {
    this.levels = levels
  }
  /**
   * [set description]
   * @param {[type]} key1 []
   * @param {[type]} key2 []
   * @param {[type]} ... []
   * @param {[type]} value []
   */
  set(...args) {
    const value = args.pop()
    const lastKey = args.pop()
    let parent = this.map
    for (const arg of args) {
      if (!parent.has(arg)) {
        parent.set(arg, new Map())
      }
      parent = parent.get(arg)
    }
    parent.set(lastKey, value)
    this.size++
  }
  /**
   * [get description]
   * @param  {[type]} key1 [description]
   * @param  {[type]} key2 [description]
   * @param  {[type]} ... [description]
   * @return [type]        [description]
   */
  get(...args) {
    const lastKey = args.pop()
    let parent = this.map
    for (const arg of args) {
      if (!parent.has(arg)) {
        return null
      }
      parent = parent.get(arg)
    }
    return parent.get(lastKey)
  }
  /**
   * [get description]
   * @param  {[type]} key1 [description]
   * @param  {[type]} key2 [description]
   * @param  {[type]} ... [description]
   */
  delete(...args) {
    const lastKey = args.pop()
    let parent = this.map
    const parents = [parent]
    for (const arg of args) {
      if (!parent.has(arg)) {
        return
      }
      parent = parent.get(arg)
      parents.push(parent)
    }
    parent.delete && parent.delete(lastKey)
    this.size--
    for (let i = args.length - 1; i > 0; i--) {
      if (parents[i].size === 0) {
        parents[i - 1].delete(args[i])
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
  has(...args) {
    return this.get(...args) != null
  }
  clear() {
    this.size = 0
    this.map.clear()
  }
}
