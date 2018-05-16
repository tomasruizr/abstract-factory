function Dog(sound = 'guau') {
    this.sound = sound
}

Dog.prototype.bark = function() {
    console.log(this);
    console.log('I bark: ', this.sound);
}

module.exports = Dog;