const assert = require( 'assert')

// Library
const createNew =  require('../../index').createNew
// Fixtures
const Human = require( '../fixtures/Human')
const Dog = require( '../fixtures/Dog')
const Person = require( '../fixtures/Person')
const someProto = require( '../fixtures/someProto')

describe('abstract factory unit tests', function() {
    describe('creates an object of a prototype object', function() {
        let newObj
        before(() => {
            newObj = createNew(someProto);
        })
        it ('instantiates the object', () => {
            assert(newObj, 'The instantiation failed')
        })
        it('contains the testFunction function', function() {
            assert.equal(newObj.testFunction(), 'some function', 'the object proto response was not correct')
        });
        
    });
    describe('creates an object of a function prototype', function() {
        let newObj
        before(() => {
            newObj = createNew(Person);
        })
        it ('instantiates the object', () => {
            assert(newObj, 'The instantiation failed')
        })
        it('contains the talk function', function() {
            assert.equal(newObj.talk(), 'I say: que paso pana mio', 'the Person response was not correct')
        });
        it('contains the talk function with parameters', function() {
            newObj = createNew(Person, 'tomas');
            assert.equal(newObj.talk(), 'I say: tomas', 'the Person response was not correct')
        });
    });
    describe('creates an object of a class', function() {
        let newObj
        before(() => {
            newObj = createNew(Human);
        })
        it ('instantiates the object', () => {
            assert(newObj, 'The instantiation failed')
        })
        it('contains the live function', function() {
            assert.equal(newObj.live(), "i'm a living human with gender undefined", 'the Human response was not correct')
        });
        it('contains the live function with parameters', function() {
            newObj = createNew(Human, 'Male');
            assert.equal(newObj.live(), "i'm a living human with gender Male", 'the Human response was not correct')
        });
    });
    describe('creates an object with a composed prototype with no parameters', function() {
        let newObj
        it ('instantiates the object', () => {
            newObj = createNew([Human, someProto]);
            assert(newObj, 'The instantiation failed')
        })
        it('contains the talk function', function() {
            assert.equal(newObj.live(), "i'm a living human with gender undefined", 'the Human response was not correct')
        });
        it('contains the live function', function() {
            assert.equal(newObj.testFunction(), 'some function', 'the object proto response was not correct')
        });
    });
});
