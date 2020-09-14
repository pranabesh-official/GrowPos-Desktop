// const fs = require('fs')

// const path = './file.txt'

// try {
//   if (fs.existsSync(path)) {
//     //file exists
//   }
// } catch(err) {
//   console.error(err)
// }

const spawn = require('child_process').spawn;
const path = require("path")
class mongod {
  constructor() {
    this.mongoServer = null
    this.mongoServermsg = 'Mongodb Start Sucsess!'

  }
  start() {
    this.this.mongoServer = spawn(path.join(__dirname, 'mongod.exe'), ['--dbpath', '/data/db'], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });
    return new Promise((resolve, reject) => {
      let sucsess = false
      console.log('[Mongod] Mongodb Server Starting!')
      this.mongoServer.stdout.on('data', (d) => {
        console.log('[Mongod]', d.toString('utf8'));
        sucsess = true
        resolve(sucsess)
      });
      this.mongoServer.stderr.on('data', (d) => {
        console.log('[Mongod] Mongodb Server Faild Started!');
        reject(d.toString('utf8'), this.mongoServer)
      });
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      try {
        this.mongoServer.on('close', (code) => {
          console.log('[Mongod] Mongodb Server EXIT!');
          resolve(code.toString('utf8'))
        });
      } catch (error) {
        reject(error)
      }
    })
    
  }
}

module.exports = mongod;

