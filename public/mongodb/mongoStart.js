
const fs = require('fs');
const mongoPathExist = () => {
  const dir = '/data/db';
  // const dir = '/test/db';
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(dir)) {
        console.log('[Directory] exists! ');
        resolve()
      } else {
        console.log('[Directory] not found! ');
        console.log('[Directory] Creating.. ');
        fs.mkdirSync(dir);
        console.log('[Directory] Creating Done! ');
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  })
}




module.exports = mongoPathExist;

