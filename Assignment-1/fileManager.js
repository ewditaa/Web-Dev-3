const fs = require("fs");

const fileName = "test.txt";

// CREATE / WRITE FILE
fs.writeFile(fileName, "This is my Smart Utility Toolkit file.\n", (err) => {
    if (err) {
        console.log("Error creating file:", err.message);
        return;
    }

    console.log("File created successfully!");

    // READ FILE
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file:", err.message);
            return;
        }

        console.log("File content:");
        console.log(data);

        // UPDATE / APPEND FILE
        fs.appendFile(fileName, "This line was added using appendFile().\n", (err) => {
            if (err) {
                console.log("Error updating file:", err.message);
                return;
            }

            console.log("File updated successfully!");

            // READ UPDATED FILE
            fs.readFile(fileName, "utf8", (err, updatedData) => {
                if (err) {
                    console.log("Error reading updated file:", err.message);
                    return;
                }

                console.log("Updated file content:");
                console.log(updatedData);

                // DELETE FILE
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err.message);
                        return;
                    }

                    console.log("File deleted successfully!");
                });
            });
        });
    });
});