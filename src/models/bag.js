export default class Bag {
  constructor(options = { capacity: 0 }) {
    const { capacity } = options;
    this.capacity = capacity;
  }

  get Capacity() {
    return this.capacity;
  }

  set Capacity(newCapacity) {
    this.capacity = newCapacity;
  }
}
