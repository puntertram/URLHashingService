let express = require("express");
let sqlCalls = require("./SQLCalls");
let router = express.Router();

router.post("/insert_record", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let apiKey = req.query["apiKey"];
        let originalURL = req.body["originalURL"];
        let hashedURL = req.body["hashedURL"];
        let creationDate = req.body["creationDate"];
        let result = await sqlCalls.insertRecord(originalURL, hashedURL, creationDate, apiKey);
        res.status(200).json({
            "msg": "insert record success"
        })
    } catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
})

router.post("/find_url", async (req, res) => {
    
    console.log("hit " + req.url);
    try {
        let result = await sqlCalls.findOriginalURL(req.body["hashedURL"]);
        res.status(200).json({
            "url": result
        })
    } catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
})


module.exports = router;