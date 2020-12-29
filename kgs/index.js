let express = require("express");
let sqlCalls = require('./SQLCalls');
let router = express.Router();

router.get("/key", async (req, res) => {
    console.log("hit " + req.url);
    try {
        let unusedKey = await sqlCalls.getUnusedKey();
        console.log(unusedKey);
        res.status(200).json({
            "key": unusedKey
        })
    }
    catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
})


module.exports = router;