const Bluebird = require("bluebird");
let mysql = require("mysql2/promise");
let config = require('./config');
let server_type = process.env["SERVER_TYPE"];

let db_conn = null;
//Create a db connection

if(server_type !== 'app') {
    if(!process.env["DB_PASSWORD"]) {
        console.error("DB_PASSWORD not specified. " + 
            "For any server other than app server, DB_PASSWORD must be specified")
        process.exit();
    }

    db_conn = mysql.createPool({
        host: config.databases[server_type].host,
        port: config.databases[server_type].port,
        database: config.databases[server_type].schema,
        password: process.env["DB_PASSWORD"],
        user: process.env["DB_USER"],
        Promise: Bluebird
    })

} else {
    console.error("This should not be displayed, but still gracefully handled");
    process.exit();
}
module.exports = {
    db_conn
}