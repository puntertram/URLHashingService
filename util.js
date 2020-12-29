let uuid = require("uuid");
let generate_url = (host, resource, port=null, protocol="http") => {
    let url;
    if(port) {
        url = protocol + "://" + host + ":" + port + resource;
    } else {
        url = protocol + "://" + host + resource;
    }
    console.log("generated url " + url);
    return url;
} 


let generate_apiKey = () => {
    return uuid.v4();
}

module.exports = {
    generate_url,
    generate_apiKey
}