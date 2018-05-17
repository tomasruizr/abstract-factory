function Dog(sound = 'guau', param2, param3, param4) {
    this.sound = sound
    this.otherParams = param2+param3+param4
}

Dog.prototype.bark = function() {
    return 'I bark: ' + this.sound
}
Dog.prototype.getOtherParams = function(){
    return this.otherParams
}

module.exports = Dog;