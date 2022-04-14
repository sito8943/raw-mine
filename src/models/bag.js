export const BagsEnumType = {
  "Mochila de Cuero": 1,
};

export const BagsEnum = [
  {
    name: "Mochila de Cuero",
    defense: 10,
  },
];
export default class Bag {
  constructor(options = { name: "", capacity: 0 }) {
    const { name, capacity } = options;
    this.name = name;
    this.capacity = capacity;
  }

  get Name() {
    return this.name;
  }

  get Capacity() {
    return this.capacity;
  }

  set Capacity(newCapacity) {
    this.capacity = newCapacity;
  }

  set Name(newName) {
    this.name = newName;
  }
}
