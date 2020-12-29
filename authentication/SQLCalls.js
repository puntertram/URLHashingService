let db_conn = require("../SQLConnection").db_conn;

let getQuotaAndUsedMetrics = async(apiKey) => {
    let [rows, fields] = await db_conn.execute(
        'SELECT A.quota_write, A.used_write from Account A WHERE A.apiKey = ?',
        [apiKey]
    )
    console.log(rows)
    return {
        'quota': {
            'write': rows[0].quota_write
        },
        'used': {
            'write': rows[0].used_write
        }
    }
}

let incrementWriteQuota = async(apiKey) => {
    let [rows, fields] = db_conn.execute(
        'UPDATE Account A  SET A.quota_write = A.quota_write + 1 WHERE A.apiKey = ?',
        [apiKey]
    )
}
let incrementWriteUsed = async(apiKey) => {
    let [rows, fields] = await db_conn.execute(
        'UPDATE Account A SET A.used_write = A.used_write + 1 WHERE A.apiKey = ?',
        [apiKey]
    )
}
let insertUser = async(name, email, creationDate, response) => {
    
    let [row] = await db_conn.query(
        `
            INSERT INTO User(Name, Email, CreationDate) VALUES (?, ?, ?)
        `,
        [name, email, creationDate]);
    return row;
}

let insertService = async(userId, quota, apiKey) => {
    let [rows, fields] = await db_conn.query(
        ` 
            INSERT INTO Account(userId, apiKey, quota_write, used_write) VALUES (?, ?, ?, ?)
        `,
        [userId, apiKey, quota.write, 0]
    );
    return rows;
}

module.exports = {
    getQuotaAndUsedMetrics,
    incrementWriteQuota,
    incrementWriteUsed,
    insertUser,
    insertService
}