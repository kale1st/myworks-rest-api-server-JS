import User from './User';

class Group {
    constructor(groupname, groupId, mentorId) {
        this.groupname = groupname;
        this.members = [User];
        this.groupId = groupId;
        this.mentorId = mentorId
    }
}

module.exports = Group;