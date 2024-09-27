const fs = require("fs");
const path = require("path")

const input_file_path = path.join(__dirname, "lipsum.txt");
const uppercase_file_path = path.join(__dirname, "uppercase.txt");
const lowercase_file_path = path.join(__dirname, "lowercase.txt");
const sorted_file_path = path.join(__dirname, "sorted.txt");
const filenames_path = path.join(__dirname, "filenames.txt");


function problem_02_process() {
    file_reader(input_file_path)
        .then((data) => {
            return convert_to_uppercase(data, uppercase_file_path);

        })
        .then((file) => {
            console.log("uppercase.txt updated successfully..!");
            return store_filenames(filenames_path, uppercase_file_path);

        })
        .then(() => {
            console.log("filenames.txt updated.");

        })

}




function convert_to_uppercase(data, filePath) {
    const uppercase_content = data.toUpperCase();
    return file_writer(uppercase_content, filePath);
}


function store_filenames(filePath, filesName) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, filesName + "\n", (err) =>{
            if (err) {
                reject(err);
            }else{
                resolve("");
            }
        });
    });
}



function file_reader(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}




function file_writer(data, filePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("");
            }
        });
    });
}


problem_02_process();