const fs = require('fs')
const path = require('path')

const exceptions = ['node_modules']
const sources = ['ts', 'tsx']
changeExtension(__dirname)
function changeExtension(dir){
     const filesAndDirs = fs.readdirSync(dir)
     for(let item of filesAndDirs){
          if(exceptions.includes(item)){
               continue;
          }
          try {
               const path = path.join(dir, item)
               fs.readdirSync(path) //throw error if path is not a directory
               changeExtension(path)
          } catch (_) {
               for(exception of exceptions){
                    if(item.slice(-(exception.length)) === exception){
                         fs.renameSync(path.join(dir, item), path.join(dir, item.slice(0, item.length - 2) + 'js'))
                    }
               }
               if(item.slice(-2) === 'ts'){
                    fs.renameSync(path.join(dir, item), path.join(dir, item.slice(0, item.length - 2) + 'js'))
               }
               if(item.slice(-3) === 'tsx'){
                    fs.renameSync(path.join(dir, item), path.join(dir, item.slice(0, item.length - 3) + 'js'))
               }
          }
     }
}