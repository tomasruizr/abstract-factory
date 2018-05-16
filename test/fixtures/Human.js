class Human{
    constructor(gender){
        this.gender = gender
    }
    live(){
        return "i'm a living human with gender " + this.gender
    }

}

module.exports = Human