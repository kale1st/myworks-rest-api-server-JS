import Group from './Group';

class Mentor {
    constructor(mentoremail, mentorId) {
        this.mentoremail = mentoremail;
        this.mentorId = mentorId;
        this.groups = [Group];
        this.role = "mentor"
    }
}
module.exports = Mentor;