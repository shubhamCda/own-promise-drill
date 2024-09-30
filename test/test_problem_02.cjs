const path = require("path")

const { convert_to_uppercase, convert_to_lowercase, sort_file_content, store_filenames, file_reader, delete_files } = require("../problem_02.cjs");


const input_file_path = path.join(__dirname, "../lipsum.txt");
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

problem_02_process();