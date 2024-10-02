const fs = require("fs");
const path = require("path")

/*
Problem 2:
    Using own-promise method

*/

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
            store_filenames(filenames_path, uppercase_file_path);

        })
        .then(() => {
            console.log("filenames.txt updated.");
            return file_reader(uppercase_file_path);

        })
        .then((data) => {
            return convert_to_lowercase(data, lowercase_file_path);
        })
        .then(() => {
            console.log("lowercase.txt updated successfull..!");
            return store_filenames(filenames_path, lowercase_file_path);

        })
        .then(() => {
            return file_reader(lowercase_file_path);
        })
        .then((data) => {
            return sort_file_content(data, sorted_file_path);
        })
        .then(() => {
            console.log("sorted.txt updated successfully..!");
            return store_filenames(sorted_file_path);
        })
        .then(() => {
            console.log("filenames.txt updated.");
            return file_reader(filenames_path);
        })
        .then((link) => {
            return delete_files(link);
        })
        .then(() => {
            console.log("files successfully deleted...");

        })
        .catch((err) => console.log(err));

}



// Convert the content to uppercase & write to a new file.
function convert_to_uppercase(data, filePath) {
    const uppercase_content = data.toUpperCase();
    return file_writer(uppercase_content, filePath);
}

// function to convert newfile to lower case. Then split the contents into sentences. Then write it to a new file.
function convert_to_lowercase(data, filePath) {
    const lowercase_content = data.toLowerCase();
    const sentences = lowercase_content.split(/(?<=[.!?])\s+/);
    return file_writer(sentences.join(" "), filePath);
}


// sort the content, write it out to a new file.
function sort_file_content(data, filePath) {
    const sorted_content = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");

    return file_writer(sorted_content, filePath);
}


// Store the name of the new file in filenames.txt
function store_filenames(filePath, filesName) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, filesName + "\n", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        });
    });
}


// function to read the given file.
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



// function to write file content/ filenames.
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


// delete all the new files that are mentioned in that list simultaneously.
function delete_files(files) {
    const seperate_files = files.split("\n").filter(Boolean);
    
    const deleted_files = seperate_files.map(link => 
        new Promise((resolve, reject) => {
            fs.unlink(link, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve("");
                }
            })
        })
    );
    
    return Promise.all(deleted_files);
}


module.exports = { problem_02_process };