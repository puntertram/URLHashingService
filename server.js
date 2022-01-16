const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const redis = require("redis");
const redisClient = null;

if(config.servers.options.useCache) {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => {
        console.error(error);
        
    })
}

let app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
let server_type = process.env["SERVER_TYPE"];
const PORT = process.env.PORT||config.servers[server_type].port;

if(server_type) {
    if(server_type === 'app') {
        app.use(require('./app/index'));
    } else if(server_type == 'auth') {
        app.use('/api/auth/', require('./authentication/index'));
    } else if(server_type == 'db') {
        app.use('/api/db/', require('./db/index'));
    } else if(server_type == 'kgs') {
        app.use('/api/kgs/', require('./kgs/index'));
    } 
} else {
    console.error("You should mention the type of the server to launch(app, auth, db, kgs)");
    process.exit();
}

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})