class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption
  ) {
    this.#brand = brand;
    this.#model = model;
    this.#yearOfManufacturing = yearOfManufacturing;
    this.#maxSpeed = maxSpeed;
    this.#maxFuelVolume = maxFuelVolume;
    this.#fuelConsumption = fuelConsumption;
  }

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    this.#validateString(value, "brand");
    this.#brand = value;
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    this.#validateString(value, "model");
    this.#model = value;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    this.#validateNumber(
      value,
      "yearOfManufacturing",
      1900,
      new Date().getFullYear()
    );

    this.#yearOfManufacturing = value;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(value) {
    this.#validateNumber(value, "maxSpeed", 100, 300);
    this.#maxSpeed = value;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(value) {
    this.#validateNumber(value, "maxFuelVolume", 5, 20);
    this.#maxFuelVolume = value;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    this.#validateNumber(value, "fuelConsumption");
    this.#fuelConsumption = value;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error("The car is already started");
    }
    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("The car hasn't started yet");
    }
    this.#isStarted = false;
  }

  fillUpGasTank(fuelQuantity) {
    this.#validateFuelAmount(fuelQuantity);
    if (fuelQuantity <= 0) {
      throw new Error("Incorrect amount of fuel for refueling");
    }

    if (this.#currentFuelVolume + fuelQuantity > this.#maxFuelVolume) {
      throw new Error("Fuel tank is full");
    }
    this.#currentFuelVolume += fuelQuantity;
  }

  drive(speed, hours) {
    this.#validateNumber(speed, "speed");
    this.#validateNumber(hours, "hours");

    if (speed > this.#maxSpeed) {
      throw new Error("The car cannot go that fast");
    }

    if (!this.#isStarted) {
      throw new Error("The car must be started to drive");
    }
    const requiredFuel = (speed * hours * this.#fuelConsumption) / 100;

    if (requiredFuel > this.#currentFuelVolume) {
      throw new Error("Insufficient fuel");
    }

    this.#currentFuelVolume -= requiredFuel;
    this.#mileage += speed * hours;
  }

  #validateString(value, propName) {
    if (typeof value !== "string" || value.length < 1 || value.length > 50) {
      throw new Error(`Invalid ${propName}`);
    }
  }

  #validateNumber(value, propName, min, max) {
    if (
      typeof value !== "number" ||
      isNaN(value) ||
      (min !== undefined && value < min) ||
      (max !== undefined && value > max)
    ) {
      throw new Error(`Invalid ${propName}`);
    }
  }

  #validateFuelAmount(value) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("Invalid amount of fuel for refueling");
    }
  }
}

export { Car };
