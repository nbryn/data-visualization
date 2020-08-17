class Error {
    private errorMessage: string;

    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    getErrorMessage() {
        return this.errorMessage;
    }
}

export default Error;
