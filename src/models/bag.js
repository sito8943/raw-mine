export const BagsEnumType = {
  "Mochila de Cuero": 1,
};

export const BagsEnum = [
  {
    name: "Mochila de Cuero",
    capacity: 10,
  },
];
export default class Bag {
  constructor(options = { name: "", capacity: 0 }) {
    const { name, capacity } = options;
    this.name = name;
    this.capacity = capacity;
    this.objects = [];
  }

  AddMineral(mineral) {
    if (this.objects[mineral.Name] === undefined)
      this.objects[mineral.Name] = { name: mineral.Name, count: 1 };
    else this.objects[mineral.Name].count += 1;
  }

  get Objects() {
    return this.objects;
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
