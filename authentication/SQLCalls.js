let db_conn = require("../SQLConnection");

let getQuotaAndUsedMetrics = async(apiKey) => {
    let [rows, fields] = db_conn.execute(
        'SELECT A.quota_write, A.used_write from Account A WHERE A.apiKey = ?',
        [apiKey]
    )
    return {
        'quota': {
            'write': fields[0]
        },
        'used': {
            'write': fields[1]
        }
    }
}
module.exports = {
    getQuotaAndUsedMetrics,
    
}