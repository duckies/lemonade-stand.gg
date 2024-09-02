export class Example {
  public goodies?: Promise<string>;

  public async doSomething() {
    if (!this.goodies) {
      console.log("New Promise");
      this.goodies = new Promise((resolve) => {
        setTimeout(resolve, 1250, "Hello, World!");
      });
    } else {
      console.log("Promise cached.");
    }

    return this.goodies;
  }
}

async function what() {
  const test = new Example();

  for (let i = 0; i <= 5; i++) {
    test.doSomething();
  }
}

what();
