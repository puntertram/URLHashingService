let db_conn = require("../SQLConnection").db_conn;

let findOriginalURL = async(hashedURL) => {
    let [rows, fields] = await db_conn.execute(
        'SELECT U.OriginalURL from URL U WHERE U.HashedURL = ?',
        [hashedURL]
    )
    return rows[0].OriginalURL;
}

let insertRecord = async(originalURL, hashedURL, creationDate, apiKey) => {
    let [rows, fields] = await db_conn.execute(
        'INSERT INTO URL(HashedURL, OriginalURL, CreationDate, apiKey) VALUES(?, ?, ?, ?)',
        [hashedURL, originalURL, creationDate, apiKey]
    )
}

module.exports = {
    findOriginalURL,
    insertRecord
}