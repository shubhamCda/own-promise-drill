const fs = require("fs");

/*
    Problem 1:
    
    Using own promise method, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

//function to create new directory
function create_directory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err, _data) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        });
    });
}


//function generate randon JSON files.
function generate_json_files(dirPath, count) {
    const all_json_promise = [];

    for (let index = 1; index <= count; index++) {
        const json_file = path.join(dirPath, `jsonFile_${index}.json`);
        const json_data = JSON.stringify({
            username: 'shubham',
            city: 'bengaluru'
        });
        const p = new Promise((resolve, reject) => {
            fs.writeFile(json_file, json_data, (err, _data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(json_file);
                }
            });
        });
        all_json_promise.push(p);

    }
    return Promise.all(all_json_promise);
}


//function to delete files simultaneously.
function delete_files(paths) {
    const remove_files = paths.map((files) => {
        new Promise((resolve, reject) => {
            fs.unlink(files, (err) => {
                if (err) {
                    reject(err);

                } else {
                    resolve();
                }
            });
        });
    });

    return Promise.all(remove_files);
}




module.exports = { create_directory, generate_json_files, delete_files };