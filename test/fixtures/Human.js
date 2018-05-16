class Human{
    constructor(gender){
        this.gender = gender;
    }
    live(){
        console.log("i'm a living human with gender", this.gender);
    }

}

module.exports = Human;