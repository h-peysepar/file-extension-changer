const fs = require('fs');
const path = require('path');

const exceptions = ['node_modules'];
const dir = ''; // fill absoulte path of directory here
changeExtension(dir || __dirname);

function changeExtension(dir) {
  const filesAndDirs = fs.readdirSync(dir);
  for (let item of filesAndDirs) {
    if (exceptions.includes(item)) {
      continue;
    }
    try {
      const pathtarget = path.join(dir, item);
      fs.readdirSync(pathtarget); //throw error if pathtarget is not a directory
      changeExtension(pathtarget);
    } catch (_) {
      if (item.slice(-2) === 'js') {
        fs.renameSync(
          path.join(dir, item),
          path.join(dir, item.slice(0, item.length - 2) + 'ts')
        );
      }
      if (item.slice(-3) === 'jsx') {
        fs.renameSync(
          path.join(dir, item),
          path.join(dir, item.slice(0, item.length - 3) + 'tsx')
        );
      }
    }
  }
}
