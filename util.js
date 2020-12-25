let generate_url = (host, port, resource, protocol="http") => {
    let url = protocol + "://" + host + ":" + port + "/" + resource;
    return url;
} 

let generate_url = (host, resource, protocol="http") => {
    let url = protocol + "://" + host + "/" + resource;
    return url;
} 


module.exports = {
    generate_url
}