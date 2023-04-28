class Ability {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    getList() {
        return ability_list;
    }
}

const ability_list = [
    new Ability("HTML",90),
    new Ability("CSS",75),
    new Ability("BOOTSTRAP",60),
    new Ability("JAVASCRIPT",50),
    new Ability("JQuery",70),
    new Ability("Node.js",80),
    new Ability("Mongodb",40),
    new Ability("C#",50),
    new Ability("Asp.Net",30),
    new Ability("SQL",30),

]