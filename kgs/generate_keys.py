import pymysql
import os
import sys


base64_mapping = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3','4', '5', '6', '7', '8', '9', '!', '@']


def getBase64(count):
    if count == 0:
        return 'a'
    answer = ''
    while count != 0:
        digit = count % 64
        answer = base64_mapping[int(digit)] + answer
        count = count // 64
    while len(answer) != 8:
        answer = 'a' + answer
    return answer

try:
    connection = pymysql.connect(
        host='localhost',
        port=3310,
        password=os.environ["DB_PASSWORD"],
        user=os.environ["DB_USER"],
        db='kgs_db'
    )
except KeyError:
    print("Please ensure that DB_PASSWORD and DB_USER are set", file=sys.stderr)
    sys.stderr.flush()
    sys.exit()


def getCountFromDB(connection):
    with connection.cursor() as cursor:
        sql = 'SELECT value from Counter WHERE id = 2;'
        cursor.execute(sql)
        result = cursor.fetchone()
    return int(result[0])

def writeUpdatedCount(connection, count):
    with connection.cursor() as cursor:
        sql = 'UPDATE Counter SET value = %s WHERE id = 2;'
        cursor.execute(sql, (count))
        connection.commit()
    

count = getCountFromDB(connection)
try:
    number_of_keys = int(os.environ["NUMBER_OF_KEYS"])
except KeyError:
    print("Please enter the number of keys(Use NUMBER_OF_KEYS env variable", file=sys.stderr)
    sys.stderr.flush()
    sys.exit(0)

while number_of_keys >= 0:
    with connection.cursor() as cursor:
        sql = 'INSERT INTO UnusedKeys(key_value) VALUES(%s)'
        cursor.execute(sql, (getBase64(count)))
        connection.commit()
        count += 1
        number_of_keys -= 1
    
writeUpdatedCount(connection, count)

