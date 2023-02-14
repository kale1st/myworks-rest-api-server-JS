class User {
    constructor(email, userId, role) {
        this.email = email;
        this.userId = userId;
        this.groups = []; // IDs of user's groups
        this.badges = [] // IDs of user's badges       
        this.books = [];
        this.events = [];
        this.role = role;
    }
}
module.exports = User;