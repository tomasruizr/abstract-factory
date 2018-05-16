// Me quede en permitir que se pasen parametros sin objeto cuando es un solo prototypo.
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
function createNew(constructors, args={}) {
    let newObj = {};
    let protos = [];
    let newProto = {};
    if (!Array.isArray(constructors)) constructors = [constructors]
    for (let index = 0; index < constructors.length; index++) {
        if (typeof constructors[index] === 'function'){
            if (/^class/.test(constructors[index].toString())){
                let classNew = new constructors[index](...args[constructors[index].name])
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