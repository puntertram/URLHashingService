
module.exports = {
    "servers": {
        "app": {
            "host": "localhost",
            "port": 8000
        },
        "db": {
            "host": "localhost",
            "port": 8001
        },
        "kgs": {
            "host": "localhost",
            "port": 8002
        },
        "auth": {
            "host": "localhost",
            "port": 8003
        },
        "options": {
            "useCache": false,
            "useAnalytics": false
        }
    },
    "databases": {
        "auth": {
            "host": "localhost",
            "schema": "auth_db",
            "port": 3310
        },
        "kgs": {
            "host": "localhost",
            "schema": "kgs_db",
            "port": 3310
        },
        "db": {
            "host": "localhost",
            "schema": "url_hash_db",
            "port": 3310
        }
    },
    "cache": {
        "host": "localhost",
        "port": 6379
    },
    "urlHashDomain": "localhost:8000"
}