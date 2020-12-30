let express = require("express");
let sqlCalls = require("./SQLCalls");
let router = express.Router();
let moment = require("moment");
let util = require("../util");
router.get("/metric_quota/:apiKey", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let apiKey = req.params["apiKey"];
        let result = await sqlCalls.getQuotaAndUsedMetrics(apiKey);
        res.json(result);
    } catch(e) {
        res.status(401).json(JSON.stringify({
            "error": e.message
        }))
    }
})
router.post("/increment/quota/write", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let apiKey = req.query["apiKey"];
        let result = await sqlCalls.incrementWriteQuota(apiKey);
        res.json(result);
    }catch(e) {
        res.status(401).json(JSON.stringify({
            "error": JSON.stringify(e)
        }))
    }    
})

router.post("/increment/used/write", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let apiKey = req.query["apiKey"];
        let result = await sqlCalls.incrementWriteUsed(apiKey);
        res.json({
            "msg": "Increase the used write of the account"
        });
    }catch(e) {
        res.status(401).json(JSON.stringify({
            "error": JSON.stringify(e)
        }))
    }    
})

router.post("/register/user", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let name = req.body["name"];
        let email = req.body["email"];
        let creationDate = moment().utc().format('YYYY-MM-DD hh:mm:ss');
        let result = await sqlCalls.insertUser(name, email, creationDate, res)
        if(result.affectedRows != 1) {
            res.status(401).json({
                "error": "Register user failed. Please try again."
            })
        }
        else {
            res.status(200).json({
                "msg": "user registered successfully",
                "userId": result.insertId
            })
        }
    } catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
})


router.post("/register/service", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let userId = req.body["userId"];
        let serviceType = req.body["serviceType"];
        let quota;
        if(serviceType == 1) {
            quota = {
                "write": 1000
            }
        } else {
            quota = {
                "write": 5
            }
        }
        let apiKey = util.generate_apiKey();
        let result = await sqlCalls.insertService(userId, quota, apiKey);
        res.status(200).json({
            "msg": "register service successful",
            "apiKey": apiKey
        })
    } catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
})



module.exports = router;