"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("../../models/Group");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const { v1: uuidv1 } = require('uuid');
const instanceGroup = new Group_1.Group(null, null);
const createGroup = async (req, res) => {
    const { groupName, mentorEmail } = req.body;
    //control wether user exists
    await firebase_admin_1.default.auth().getUserByEmail(mentorEmail)
        .then(async (mentor) => {
        const groupId = await uuidv1();
        await instanceGroup.createGroup(groupName, mentor.uid, groupId, mentorEmail).then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(401).send(error);
        });
    }).catch((error) => {
        res.status(404).send(error.message);
    });
};
const retrieveGroups = async (req, res) => {
    instanceGroup.retrieveGroups().then((result) => {
        res.status(200).send((result));
    }).catch((error) => {
        res.status(401).send(error);
    });
};
const updateGroup = async (req, res) => {
    const group = req.body.group;
    instanceGroup.updateGroup(group).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(401).send(error);
    });
};
const deleteGroup = async (req, res) => {
    const groupId = req.body.groupId;
    instanceGroup.deleteGroup(groupId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const retrieveAllGroupsNamesOfTheUserByuserId = async (req, res) => {
    const userId = req.query.userId;
    await instanceGroup.retrieveAllGroupsOfTheUserByuserId(userId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const retrieveSingleGroupOfUserByGroupId = async (req, res) => {
    const groupId = req.query.groupId;
    instanceGroup.retrieveSingleGroupByGroupId(groupId).then((result) => {
        res.status(200).send(result.val());
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const retrieveAllParticipantsOfThegroupByGroupId = async (req, res) => {
    const groupId = req.query.groupId;
    instanceGroup.retrieveAllUsersOfTheGroup(groupId).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
};
const retrieveAllGroupsOfTheMentor = async (req, res) => {
    const mentorId = req.query.mentorId;
    instanceGroup.retrieveAllGroupsOfTheMentor(mentorId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
};
const deleteParticipantFromGroup = async (req, res) => {
    const { groupId, email } = req.body;
    instanceGroup.deleteParticipantFromGroup(groupId, email).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
exports.default = { createGroup, retrieveGroups, updateGroup, deleteGroup, retrieveAllGroupsNamesOfTheUserByuserId, retrieveSingleGroupOfUserByGroupId, retrieveAllParticipantsOfThegroupByGroupId, retrieveAllGroupsOfTheMentor, deleteParticipantFromGroup };
