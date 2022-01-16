# URL Hashing Service
This is a backend REST API that implements a URL Hashing Service.
Features Supported:
1. Registration of User: A User must be registered before availing any service from API
2. Registration of a Service: An API key is generated for a user authorizing to use a particular service(upon successful registration of a service)
3. Increment the write quota of a user for a service: A user can increase the number of URLs that can be registered against a service already registered.
4. Get the number of URLS a user can create for a service


# Setup
1. Create a container from the Dockerfile. You should get a name or an id for the container. Then do export CONTAINER_NAME=<container-name>, export DB_USER=root, export DB_PASSWORD=password123
2. Populate the correct port of host that is interfaced with 3306(default port where mysql runs) of the container in each "port" entry of "databases" in config.js
3. Run db_ddl_scripts/db_setup.sh
4. Spawn 4 different shells. do export SERVER_TYPE=app, db, kgs, auth 
5. In each shell, do npm start 

# Common Scenarios
We assume the config.js is not altered.
1. First register a user
    a. POST localhost:8003/api/auth/register/user. Provide user and email in the body. You will get a userId as response if user is registered successfully
2. Register a service for that user 
    a. POST localhost:8003/api/auth/register/service. Provide userId and serviceType. User serviceType as 1 if you need 1000 URLs, 2 if you need 5
3. Check the remaining URLs left for a service of a user
    a. GET localhost:8003/api/auth/metric_quota/<apiKey>
4. Raise a URL Shortening Request 
    a. POST localhost:8000/shorten by passing apiKey, and url in the request body
    b. Upon success, you will get a shortened URL
5. You can then use the shortened URL by GET localhost:8000/urlHash

# Future Work
1. Add analytics
2. Run the services with a docker compose or more robust CI/CD methods