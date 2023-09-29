export class AuthRequiredError extends Error {
    constructor(message = "authRequiredError") {
        super(message);
    }
}

export class AdminAuthRequiredError extends Error {
    constructor(message = "adminAuthRequiredError") {
        super(message);
    }
}
export class PasswordLengthError extends Error {
    constructor(message = "passwordLengthError") {
        super(message);
    }
}

export class PasswordMismatchError extends Error {
    constructor(message = "passwordMismatchError") {
        super(message);
    }
}

export class UnknownError extends Error {
    constructor(message = "unknownError") {
        super(message);
    }
}
