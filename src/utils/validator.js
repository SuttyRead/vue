const loginRegex = new RegExp("^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$");
const passwordRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
const nameRegex = new RegExp("^[A-Z][a-z]{1,25}");

export function loginValidator(value) {
    return loginRegex.test(value);
}

export function emailValidator(value) {
    return emailRegex.test(value);
}

export function passwordValidator(value) {
    return passwordRegex.test(value);
}

export function nameValidator(value) {
    return nameRegex.test(value);
}

export function passwordMatchValidator(password, confirmPassword) {
    return password === confirmPassword;
}

export function dateValidator(birthday) {
    return Date.parse(birthday) < Date.now();
}