// TODO 
// move this to TS file 
// make use of constructor as more efficient

const supportType = ['string', 'number', 'array', 'object', 'boolean', 'integer'];
  
function getType(type) {
  if (!type) type = 'string';
  if (supportType.indexOf(type) !== -1) {
    return type;
  }
  return typeof type;
}

function isSchema(object) {
  if (supportType.indexOf(object.type) !== -1) {
    return true;
  }
  return false;
}

function isType(a, b){
  // console.log(a);
  if(a !== null && a.constructor === Number){
  // if(a.constructor === Number){
    console.log("number")
  }   // true
// 'str'.constructor === String; // true
// true.constructor === Boolean;
}

function isObject(json_item){

}

export function handleObject(object, schema) {
  for (var key in object) {
    if(isType(object[key], schema[key])){
      // console.log("hello this is trye");
    } else {
      // console.log("wrong")
    }
  }
}