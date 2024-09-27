const fs = require("fs");
const path = require("path");

const directory_path = path.join(__dirname, "json-files");


function create_and_delete() {
    create_directory(directory_path)
        .then(() => {
            console.log("Directory created..!");


        })

}



function create_directory(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err, _data) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        });
    });
}






create_and_delete();