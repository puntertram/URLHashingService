let express = require("express");
const fetch = require("node-fetch");
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
let router = express.Router();
let config = require("../config");
let util = require("../util");
let moment = require("moment");
let MicroServiceFailedException = require("../exceptions/MicroServiceFailedException").MicroServiceFailedException;
/** 
 * 
*/
router.post("/shorten", async (req, resp) => {
    let apiKey = req.query["apiKey"];
    let originalUrl = req.body["url"];
    console.log("hit " + req.url);  
    try {
        let metricQuotaResponse = await fetch(util.generate_url(config.servers.auth.host, "/api/auth/metric_quota/" + apiKey, config.servers.auth.port))
        let metricQuotaResponseJson = await metricQuotaResponse.json();
        if(metricQuotaResponse.status == 200) {
            let quota = metricQuotaResponseJson.quota.write;
            let used = metricQuotaResponseJson.used.write;
            if(quota == used) {
                resp.status("401").json({
                    "error": "Quota full. Please contact the desk to increase the quota of REST calls."
                })
            } else {

                let kgsKeyResponse = await fetch(util.generate_url(config.servers.kgs.host, "/api/kgs/key", config.servers.kgs.port));
                let kgsKeyResponseJson = await kgsKeyResponse.json();
                if(kgsKeyResponse.status == 200) {
                    let key = kgsKeyResponseJson.key;
                    let dbInsertRecordResponse = await fetch(util.generate_url(config.servers.kgs.host, "/api/db/insert_record?apiKey=" + apiKey, config.servers.db.port), {
                        method: 'post',
                        body:    JSON.stringify({
                            "originalURL": originalUrl,
                            "hashedURL": util.generate_url(config.urlHashDomain, "/" + key),
                            "creationDate" : moment().utc().format('YYYY-MM-DD hh:mm:ss')
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    let dbInsertRecordResponseJson = await dbInsertRecordResponse.json();
                    if(dbInsertRecordResponse.status == 200) {
                        let incrementUsedWriteResponse = await fetch(util.generate_url(config.servers.auth.host, "/api/auth/increment/used/write?apiKey=" + apiKey, config.servers.auth.port), {
                            method: 'post'
                        })
                        let incrementUsedWriteResponseJson = await incrementUsedWriteResponse.json();
                        if(incrementUsedWriteResponse.status == 200) {
                            resp.status(200).json({
                                "msg": "Shortening successful",
                                "url": util.generate_url(config.urlHashDomain, "/" + key)
                            })
                        } else {
                            throw new MicroServiceFailedException('/api/auth/increment/used/write');
                        }
                    } else {
                        throw new MicroServiceFailedException('/api/db/insert_record');
                    }
                } else {
                    throw new MicroServiceFailedException('/api/kgs/key');
                }
            }
        } else {
            throw new MicroServiceFailedException('/api/auth/metric_quota');
        }

    } 
    catch(e) {
        if(e instanceof MicroServiceFailedException) {
            resp.status(401).json({
                "error": e.error
            })
        } else {
            resp.status(500).json({
                "error": e.message
            });
        }
    }
    
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
        }
    } catch(e) {
        resp.status(401).json({
            "error": err.stack
        });
    }
})


module.exports = router;