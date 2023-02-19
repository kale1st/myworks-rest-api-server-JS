"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var userSchema = /** @class */ (function () {
    function userSchema(firstname, lastname, email, password, role) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    return userSchema;
}());
exports.userSchema = userSchema;
;
