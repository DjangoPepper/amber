const fs = require('fs');

// create a JSON object
const user = {
    "rang": 1,
    "ref": "John Doe",
    "poids": 22
};

// convert JSON object to string
const data = JSON.stringify(taibo);

// write JSON string to a file
fs.writeFile('user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});