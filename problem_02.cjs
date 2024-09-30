const fs = require("fs");

/*
Problem 2:
    Using own-promise method

*/

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
    const seperate_files = files.split("\n");

    const deleted_files = seperate_files.forEach(link => {
        new Promise((resolve, reject) => {
            if (link !== "") {
                fs.unlink(link, (err) => {
                    if (err) {
                        reject(err);
                    }else{
                        resolve("");
                    }
                })
            }
        })
    });
    return Promise.all(deleted_files);
}


module.exports = { convert_to_uppercase, convert_to_lowercase, sort_file_content, store_filenames, file_reader, delete_files };