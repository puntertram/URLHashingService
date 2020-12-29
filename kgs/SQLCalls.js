let db_conn = require("../SQLConnection").db_conn;

let getUnusedKey = async() => {
    let counterValue = await getCounter();
    let result = null, fields = null;
    try {
        let _ = await db_conn.query("START TRANSACTION;");
        [result, fields] = await db_conn.execute("SELECT key_value FROM UnusedKeys WHERE id = ?;", [counterValue]);
        await db_conn.execute("DELETE FROM UnusedKeys WHERE id = ?;", [counterValue]);
        await db_conn.execute("UPDATE Counter SET value = value + 1 WHERE id = 1;");
        
        _ = await db_conn.query("COMMIT;");
    }
    catch(e) {
        _ = await db_conn.query("ROLLBACK;"); 
        throw e;
    }
    console.log("getUnusedKey returns", result);
    return result[0].key_value;
}
let getCounter = async() => {
    let [rows, fields] = await db_conn.execute(
        `
            SELECT value
            FROM Counter where id = 1
        `
    )
    return rows[0].value;
}
module.exports = {
    getUnusedKey
}