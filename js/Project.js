class Project {
    constructor(name,img) {
        this.name = name;
        this.img = img;
    }
    getList(){
        return project_list;
    } 
}

const project_list = [
    new Project("Unreal Library","images/Project-UnrealLibrary.png"),
    new Project("İllaki Burada","images/Project-illakiburada.png"),
    new Project("Tasarım 1","images/Project-FrontEnd1.png"),
    new Project("Tasarım 2","images/Project-FrontEnd2.png"),
    new Project("Tasarım 3","images/Project-FrontEnd3.png"),
    new Project("Tasarım 4","images/Project-FrontEnd4.png")
];