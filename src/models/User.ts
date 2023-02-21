export class userSchema {
    userName: string;
    email: string;
    password: string;
    role: number;

    constructor(username: string, email: string, password: string, role: number) {
        this.userName = username
        this.email = email
        this.password = password
        this.role = role
    }
};