export class userSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;

    constructor(firstname: string, lastname: string, email: string, password: string, role: number) {
        this.firstName = firstname
        this.lastName = lastname
        this.email = email
        this.password = password
        this.role = role
    }
};