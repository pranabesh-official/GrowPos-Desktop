import { encode } from "base-64";

export const uuid =() => {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
      return v.toString(16);
    });
  }
  
  // console.log(uuidv());

export const key=(public_id )=>{
   const v8 = encode(public_id + uuid() + new Date())
   return v8
}

// console.log(generateUUID())