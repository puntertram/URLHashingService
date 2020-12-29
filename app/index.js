let express = require("express");
const fetch = require("node-fetch");
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
let router = express.Router();
let config = require("../config");
let util = require("../util");
let moment = require("moment");
/** 
 * 
*/
router.post("/shorten", async (req, resp) => {
    let apiKey = req.query["apiKey"];
    let originalUrl = req.body["url"];
    console.log("hit " + req.url);      
    fetch(util.generate_url(config.servers.auth.host, "/api/auth/metric_quota/" + apiKey, config.servers.auth.port))
    .then((res) => {
        if(res.status != 200) {
            res.json().then((body) => {
                resp.status(401).json({
                    "error": body.error
                });
            }).catch(err => {
                resp.status(401).json({
                    "error": "Some internal error occured."
                });
            })
            
        } else {
            res.json()
            .then((res) => {
            let quota = res.quota.write;
            let used = res.used.write;
            if(quota == used) {
                resp.status("401").json({
                    "error": "Quota full. Please contact the desk to increase the quota of REST calls."
                })
            } else {

                fetch(util.generate_url(config.servers.kgs.host, "/api/kgs/key", config.servers.kgs.port))
                        .then((res) => {
                            if(res.status == 200) {
                                res.json().then((body) => {
                                    let key = body.key;
                                    fetch(util.generate_url(config.servers.kgs.host, "/api/db/insert_record?apiKey=" + apiKey, config.servers.db.port), {
                                        method: 'post',
                                        body:    JSON.stringify({
                                            "originalURL": originalUrl,
                                            "hashedURL": util.generate_url(config.urlHashDomain, "/" + key),
                                            "creationDate" : moment().utc().format('YYYY-MM-DD hh:mm:ss')
                                        }),
                                        headers: { 'Content-Type': 'application/json' }
                                    }).then((res) => {
                                        if(res.status == 200) {
                                            fetch(util.generate_url(config.servers.auth.host, "/api/auth/increment/used/write?apiKey=" + apiKey, config.servers.auth.port), {
                                                method: 'post'
                                            })
                                            .then((res) => {
                                                if(res.status == 200) {
                                                    resp.status(200).json({
                                                        "msg": "Shortening successful",
                                                        "url": util.generate_url(config.urlHashDomain, "/" + key)
                                                    })
                                                } else {
                                                    resp.status(401).json({
                                                        "error": err.message
                                                    });
                                                }
                                            })
                                            .catch((err) => {
                                                resp.status(401).json({
                                                    "error": err.message
                                                });
                                            })
                                        } else {
                                            res.json().then((body) => {
                                                resp.status("401").json({
                                                    "error": body.error
                                                })
                                            }).catch(err => {
                                                resp.status("401").json({
                                                    "error": err.message
                                                })
                                            })
                                        }
                                    }).catch((err) => {
                                        resp.status("401").json({
                                            "error": err.message
                                        })
                                    })
                                }).catch((err) => {
                                    resp.status("401").json({
                                        "error": err.message
                                    })
                                })
                                
                            } else {
                                res.json().then((body) => {
                                    resp.status(401).json({
                                        "error": body.error
                                    });
                                }).catch(err => {
                                    resp.status(401).json({
                                        "error": "Some internal error occured."
                                    });
                                })
                            }
                        })
                        .catch((err) => {
                            resp.status(401).json({
                                "error": err
                            });
                        })
            }
            })
            .catch((err) => {
                resp.status(401).json({
                    "error": err
                });
            })
        }
    })
    .catch((err) => {
        resp.status(401).json({
            "error": err
        });
    })
    
})

router.get("/:key", async (req, resp) => {
    console.log("hit " + req.originalUrl);
    try {
        if(config.servers.options.useAnalytics) {

        } else {
    
        }
        let approachDB = false;
        if(config.servers.options.useCache) {
    
        } else {
            approachDB = true;
        }
        if(approachDB) {
            try {
                let response = await fetch(util.generate_url(config.servers.db.host, "/api/db/find_url", config.servers.db.port), {
                    method: 'post',
                    body: JSON.stringify({
                        "hashedURL": util.generate_url(config.servers.app.host, req.url, config.servers.app.port)
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                let response_json = await response.json();
                if(response.status != 200) {
                    resp.status(401).json({
                        "error": response_json.error
                    });
                } else {
                    resp.set("Location", response_json.url).status(302).end();
                }
                
            } catch(err) {
                resp.status(401).json({
                    "error": err.stack
                });
            }
        }
    } catch(e) {

    }
})


module.exports = router;