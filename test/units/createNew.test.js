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
    describe('creates a single object receiving a list of parameters on invocation', function() {
        it('instantiates the object with all the parameters', function(){
            newObj = createNew(Dog, 'asdf', 'a','b','c')
            assert.equal(newObj.getOtherParams(), 'abc', 'the creation failed to assign the correct parameters')
        })
        it('instantiates the object with all the parameters with an array as first arg with one proto', function(){
            newObj = createNew([ Dog ], 'asdf', 'a','b','c')
            assert.equal(newObj.getOtherParams(), 'abc', 'the creation failed to assign the correct parameters')
        })
        it('instantiates the object with all the parameters in an ogject', function(){
            newObj = createNew([ Dog ], {Dog:['asdf', 'a','b','c']})
            assert.equal(newObj.getOtherParams(), 'abc', 'the creation failed to assign the correct parameters')
        })
        it('instantiates the object if params are arrays', function() {
            let newObj = createNew(Dog, ['asdf', 'asdf'])
            assert(newObj.bark(), 'I bark: asdf,asdf', 'the array did not work')
        });
    });
    
    describe('creates an object with a composed prototype and no parameters', function() {
        let newObj
        it ('instantiates the object', () => {
            newObj = createNew([Human, someProto]);
            assert(newObj, 'The instantiation failed')
        })
        it('contains the live function', function() {
            assert.equal(newObj.live(), "i'm a living human with gender undefined", 'the Human response was not correct')
        });
        it('contains the testFunction function', function() {
            assert.equal(newObj.testFunction(), 'some function', 'the object proto response was not correct')
        });
    });
    describe('creates an object with a composed prototype with parameters', function() {
        let newObj
        it ('instantiates the object', () => {
            newObj = createNew([Human, someProto, Person, Dog], {Human:['Humano'], Person:['Persona'], Dog:['Dog']});
            assert(newObj, 'The instantiation failed')
        })
        it('contains the live function', function() {
            assert.equal(newObj.live(), "i'm a living human with gender Humano", 'the Human response was not correct')
        });
        it('contains the testFunction function', function() {
            assert.equal(newObj.testFunction(), 'some function', 'the object proto response was not correct')
        });
        it('contains the bark function', function() {
            assert.equal(newObj.bark(), 'I bark: Dog', 'the object proto response was not correct')
        });
        it('contains the talk function', function() {
            assert.equal(newObj.talk(), 'I say: Persona', 'the object proto response was not correct')
        });
    });
    describe('exception handling', function() {
        it('fails to instantiates the object if more than one prototype specified and parameters are not an object', function(){
            assert.throws(() => {
                createNew([Dog,Person], 'asdf', 'a','b','c')
            }, /IncorrectParameter:/, 'exception not thrown correctly')
        })
        it('fails to instantiate the object if the proto is undefined', function() {
            assert.throws(() => {
                createNew(undefined)
            }, /TypeError/, 'the exception is not thrown')
        });
    });
    
});
