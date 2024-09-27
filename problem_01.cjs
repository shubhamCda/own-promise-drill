const fs = require("fs");
const path = require("path");

const directory_path = path.join(__dirname, "json-files");


function create_and_delete() {
    create_directory(directory_path)
        .then(() => {
            console.log("Directory created..!");
            return generate_json_files(directory_path, 5);

        })
        .then(() =>{
            console.log("json files generated..!");
            
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

function generate_json_files(dirPath, count) {
    const all_json_promise = [];

    for (let index = 1; index <= count; index++) {
        const json_file = path.join(dirPath, `jsonFile_${index}.json`);
        const json_data = JSON.stringify({
            username: 'shubham',
            city: 'bengaluru'
        });
        const p = new Promise((resolve, reject) =>{
            fs.writeFile(json_file, json_data, (err, _data) =>{
                if (err) {
                    reject(err);
                }else{
                    resolve(json_file);
                }
            })
        })
        all_json_promise.push(p);
        
    }
    return Promise.all(all_json_promise);
}





create_and_delete();