const path = require("path");

const { create_directory, generate_json_files, delete_files } = require("../problem_01.cjs");



const directory_path = path.join(__dirname, "json-files");


function create_and_delete(count) {
    create_directory(directory_path)
        .then(() => {
            console.log("Directory created..!");
            return generate_json_files(directory_path, count);

        })
        .then((files) => {
            console.log("json files generated..!");
            return delete_files(files);

        })
        .then(() => {
            console.log("files deleted successully..!");

        })

}



create_and_delete(5);