

import { createInterface } from "readline"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
})

abstract class HotDrink {
    consume() {}
}

class Tea extends HotDrink {
    consume() {
        console.log('This tea is nice with lemon!');

    }
}

class Coffee extends HotDrink {
    consume() {
        console.log(`This coffee is delicious!`);
    }
}

abstract class HotDrinkFactory {
    abstract prepare(amount: number): void
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount: number) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`)
        return new Coffee()
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount: number) {
        console.log(`Grind some beans, boil water, pour ${amount}ml`)
        return new Tea()
    }
}

new CoffeeFactory();
new TeaFactory();

const AvailableDrink = {
    coffee: CoffeeFactory,
    tea: TeaFactory
}

class HotDrinkMachine {
    factories = {}
    constructor() {
        this.factories = {}
        for (let drink in AvailableDrink){
            const factoryName = AvailableDrink[drink]
            this.factories[drink] = new factoryName()
        }
    }

    interact(consumer) {
        rl.question('Please specify drink and amount ' +
            '(e.g., tea 50): ', answer => {
            const parts = answer.split(' ');
            const name = parts[0];
            const amount = parseInt(parts[1]);
            const d = this.factories[name].prepare(amount);
            rl.close();
            consumer(d);
        });
    }
}

const machine = new HotDrinkMachine()
machine.interact((drink) => {
    drink.consume()
})
