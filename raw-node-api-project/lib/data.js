import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lib = {};
//base directory of the file
lib.baseDir = path.join(__dirname, "./../.data/");
//write function
lib.create = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + "/" + file + ".json", "wx", (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            //convert data to string
            const stringData = JSON.stringify(data);
            //write data to file
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if (!err1) {
                    // callback(undefined);
                    fs.close(fileDescriptor, (err2) => {
                        if (!err2) {
                            callback(undefined);
                        }
                        else {
                            callback("Error closing the file");
                        }
                    });
                }
                else {
                    callback("Error writing to file");
                }
            });
        }
        else {
            callback("Could not create new file, it may already exist");
        }
    });
};
//read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf-8", (err, data) => {
        if (!err && data) {
            callback(false, data);
        }
        else {
            callback("Error reading the file");
        }
    });
};
//update data from file
lib.update = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            //convert data to string
            const stringData = JSON.stringify(data);
            //write data to file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(undefined);
                                }
                                else {
                                    callback("Error closing the file");
                                }
                            });
                        }
                        else {
                            callback("Error writing to file");
                        }
                    });
                }
                else {
                    callback("Error truncating the file");
                }
            });
        }
        else {
            callback("Error opening the file");
        }
    });
};
//delete data from file
lib.delete = (dir, file, callback) => {
    fs.unlink(lib.baseDir + dir + "/" + file + ".json", (err) => {
        if (!err) {
            callback(undefined);
        }
        else {
            callback("Error deleting the file");
        }
    });
};
export default lib;
