class MicroServiceFailedException extends Error {
    constructor(microserviceURI, error) {
        super();
        this.message = `The microservice ${microserviceURI} failed`;
        this.error = error;
    }
}
module.exports = {
    MicroServiceFailedException
}