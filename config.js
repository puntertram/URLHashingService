
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
            "port": 3308
        },
        "kgs": {
            "host": "localhost",
            "port": 3307
        },
        "db": {
            "host": "localhost",
            "port": 3309
        }
    },
    "urlHashDomain": "tinyurl"
}