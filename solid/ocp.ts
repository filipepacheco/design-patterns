import "reflect-metadata";

enum Color {
    RED,
    GREEN,
    BLUE,
};

enum Size {
    SMALL,
    MEDIUM,
    LARGE,
    HUGE,
}

class Product {
    name: string;
    color: Color;
    size: Size;

    constructor(name: string, color: Color, size: Size) {
      this.name = name;
      this.color = color;
      this.size = size;
    }
}

abstract class Specification <T> {
    abstract element: T
    abstract isSatisfied(item: T): boolean;
}


class ColorSpecification extends Specification<Color> {
    element: Color

    constructor(element: Color) {
        super();
        this.element = element
    }
    
    isSatisfied(item: any): boolean {
        return item.color === this.element;
    }
}

class SizeSpecification extends Specification<Size> {
    element: Size

    constructor(element: Size) {
        super();
        this.element = element
    }
    
    isSatisfied(item: any): boolean {
        return item.size === this.element;
    }
}

class BetterFilter<E> {
    filter(items: any[], spec: Specification<E>) {
        return items.filter(item => spec.isSatisfied(item));
    }
}

// specification combinator
class AndSpecification {
    specs: Specification<any>[];
    constructor(...specs: Specification<any>[]) {
        this.specs = specs;
    }

    isSatisfied(item: any) {
        return this.specs.every(spec => spec.isSatisfied(item));
    }
}


let products = [
    new Product('Apple', Color.GREEN, Size.SMALL),
    new Product('Tree', Color.GREEN, Size.LARGE),
    new Product('House', Color.BLUE, Size.LARGE)
];

const bf = new BetterFilter();
console.log(`Green products (new):`);

for (let p of bf.filter(products, new ColorSpecification(Color.GREEN)))
    console.log(` * ${p.name} is green`);

for (let p of bf.filter(products, new SizeSpecification(Size.LARGE)))
    console.log(` * ${p.name} is large`);

const andSpec = new AndSpecification(
    new ColorSpecification(Color.GREEN),
    new SizeSpecification(Size.LARGE),
)

for (let p of bf.filter(products, andSpec)) 


