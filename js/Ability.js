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
    new Ability("JAVASCRIPT",50),
    new Ability("BOOTSTRAP",60)
]