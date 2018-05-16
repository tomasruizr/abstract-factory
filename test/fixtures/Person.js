function Person(saying = 'que paso pana mio') {
    this.saying = saying
}

Person.prototype.talk = function() {
    return 'I say: ' + this.saying
}

module.exports = Person