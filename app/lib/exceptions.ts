export class AuthRequiredError extends Error {
    constructor(message = "Authentication is required to access this page!") {
        super(message);
        this.name = "AuthRequiredError";
    }
}

export class AdminAuthRequiredError extends Error {
    constructor(message = "Admin authentication is required to access this page!") {
        super(message);
        this.name = "AdminAuthRequiredError";
    }
}
export class PasswordLengthError extends Error {
    constructor(message = "Şifre en az 4 karakter uzunluğunda olmalıdır!") {
        super(message);
        this.name = "PasswordLengthError";
    }
}

export class PasswordMismatchError extends Error {
    constructor(message = "Şifreler aynı değil!") {
        super(message);
        this.name = "PasswordMismatchError";
    }
}

export class UnknownError extends Error {
    constructor(message = "Bir sorun oluştu!") {
        super(message);
        this.name = "UnknownError";
    }
}
