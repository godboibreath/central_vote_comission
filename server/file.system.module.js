const fs = require('fs');
const util = require('util');
const pathModule = require('path');

const appendFilePromisify = util.promisify(fs.appendFile);
const writeFilePromisify = util.promisify(fs.writeFile);
const readFilePromisify = util.promisify(fs.readFile);
const readdirPromisify = util.promisify(fs.readdir);

module.exports = class FileSystemService {

    static readFile(path) {
        return readFilePromisify(path, 'utf-8');
    }

    static appendFile(path, data, options) {
        return appendFilePromisify(path, data, options);
    }

    static writeFile(path, data, options) {
        return writeFilePromisify(path, data, options);
    }

    static async readDir(path) {
        const data = await readdirPromisify(path, { withFileTypes: true });
        return data.map((item) => {
            const itemPath = pathModule.resolve(path, item.name);
            const stat = fs.statSync(itemPath);

            return {
                name: item.name,
                ...(item.isDirectory() ? {
                    isDir: true,
                } : {
                    isDir: false,
                    size: stat.size,
                    extname: pathModule.extname(itemPath).replace('.', ''),
                }),
                mtime: stat.mtime,
                birthtime: stat.birthtime,
                path: itemPath,
            };
        });
    }
};
