let mysql = require("mysql2");
let bluebird = require("bluebird");

let server_type = process.env["server_type"];
let db_conn = null;
//Create a db connection
if(server_type !== 'app') {
    if(!process.env["DB_PASSWORD"]) {
        console.error("DB_PASSWORD not specified. " + 
            "For any server other than app server, DB_PASSWORD must be specified")
        process.exit();
    }
    db_conn = await mysql.createPool({
        host: config.databases["server_type"].host,
        port: config.databases["server_type"].port,
        password: process.env["DB_PASSWORD"],
        Promise: bluebird
    })
} else {
    console.error("This should not be displayed, but still gracefully handled");
    process.exit();
}
module.exports = db_conn;