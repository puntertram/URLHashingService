class MicroServiceFailedException extends Exception {
    constructor(microserviceURI, error) {
        super();
        this.message = `The microservice ${microserviceURI} failed`;
        this.error = error;
    }
}