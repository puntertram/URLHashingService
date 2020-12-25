let express = require("express");
let axios = require("axios");
let router = express.Router();
let config = require("../config");
let util = require("../util");

/** 
 * 
*/
router.post("/shorten/", (req, resp) => {
    try {
        axios.get(util.generate_url(config.auth.host, config.auth.port, "/api/auth/metric_quota")).then((res) => {
            if(res.status == 200) {
                let quota = body.quota.write;
                let used = body.used.write;
                if(quota == used) {
                    resp.status("401").json({
                        "error": "Quota full. Please contact the desk to increase the quota of REST calls."
                    })
                } else {
                    axios.post(util.generate_url(config.auth.host, config.auth.port, "/api/auth/update_metric")).then((res) => {
                        if(res.status == 200) {
                            axios.get(util.generate_url(config.kgs.host, config.kgs.port, "/api/kgs/key")).then((res) => {
                                if(res.status == 200) {
                                    let key = JSON.parse(res.data).key;
                                    axios.post(util.generate_url(config.kgs.host, config.kgs.port, "/api/db/insert_record")).then((res) => {
                                        if(res.status == 200) {
                                            resp.status(200).json({
                                                "msg": "Shortening successful",
                                                "url": util.generate_url(config.urlHashDomain, key)
                                            })
                                        } else {
                                            throw JSON.parse(res.data).error;
                                        }
                                    }).catch((err) => {
                                        throw err;
                                    })
                                } else {
                                    throw JSON.parse(res.data).error;
                                }
                            }).catch((err) => {
                                throw err;
                            })
                        } else {
                            throw JSON.parse(res.body).error;
                        }
                    }).catch((err) => {
                        throw err;
                    })
                }
            } else {
                throw JSON.parse(res.body).error;
            }
        })
        .catch((err) => {
            throw err;
        })
    } catch(e) {

    }
})

router.get("/:shortenedUrl", (req, res) => {
    try {
        if(config.options.useAnalytics) {

        } else {
    
        }
        let approachDB = false;
        if(config.options.useCache) {
    
        } else {
            approachDB = true;
        }
        if(approachDB) {
            axios.get(util.generate_url(config.db.host, config.db.port, "/find_url/" + req.params["shortenedUrl"])).then((res) => {
                if(res.status == 200) {
                    if(config.options.useCache) {
                        //update the cache

                    }

                    res.status(200).json({
                        "msg": "Find original URL successful",
                        "url": res.data.url
                    })
                } else {
                    throw JSON.parse(res.data).error;
                }
            }).catch((err) => {
                throw err;
            })
        }
    } catch(e) {

    }
})




module.exports = router;