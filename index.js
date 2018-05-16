// Terminar los tests
function sanitizeClassProto(classProto) {
    let proto = {}
    let properties = Object.getOwnPropertyNames(classProto)
    properties.forEach((property)=>{
        if (property !== 'constructor'){
            proto[property] = classProto[property]
        }
    })
    return proto;
}
function createNew(prorotypeList, prototypeConstructorsArgs) {
    let [constructors, ...args] = arguments;
    let newObj = {};
    let protos = [];
    let newProto = {};
    if (!Array.isArray(constructors)) {
        let params = {}
        params[constructors.name] = args
        args = params
        constructors = [constructors]
    } else {
        if (args.length > 1){
            throw new Error('IncorrectParameter: The second parameter should be an Object where each key maps to a prototype name and the values are the parameter to the constructor of the prototype if any')
        }
        args = args[0]
    }
    for (let index = 0; index < constructors.length; index++) {
        if (typeof constructors[index] === 'function'){
            if (/^class/.test(constructors[index].toString())){
                let classNew = args ? new constructors[index](...args[constructors[index].name]) : new constructors[index]()
                Object.assign(newObj, classNew)
                protos.push(sanitizeClassProto(constructors[index].prototype))
            } else {
                constructors[index].apply(newObj, args[constructors[index].name])
                protos.push(constructors[index].prototype)
            }
        } else {
            protos.push(constructors[index])
        }
    }
    let prototype = Object.assign({}, ...protos);
    Object.setPrototypeOf(newObj, prototype)
    return newObj;
}
function checkImplements(obj, prototype) {
    let proto = typeof prototype === 'function'? prototype.prototype : prototype;
    Object.getOwnPropertyNames(proto).forEach((prop)=>{
        if (!(obj[prop] && ''+obj[prop] == ''+proto[prop]))
            return false;
    })
    return true;
}

module.exports = {
    createNew,
    checkImplements
}