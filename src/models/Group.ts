import { User } from "firebase/auth";

export class Group {
    groupId: string;
    groupName: string;
    mentorId: string;
    members: [User];
    constructor(groupName: string, mentorId: string, groupId?: any) {
        this.groupName = groupName;
        this.mentorId = mentorId;
        this.groupId = groupId;
        this.mentorId = mentorId
    }
}

module.exports = Group;