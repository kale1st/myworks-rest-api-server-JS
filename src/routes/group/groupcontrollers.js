"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("../../models/Group");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const { v1: uuidv1 } = require('uuid');
const instanceGroup = new Group_1.Group(null, null);
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupName, mentorEmail } = req.body;
    //control wether user exists
    yield firebase_admin_1.default.auth().getUserByEmail(mentorEmail)
        .then((mentor) => __awaiter(void 0, void 0, void 0, function* () {
        const groupId = yield uuidv1();
        yield instanceGroup.createGroup(groupName, mentor.uid, groupId, mentorEmail).then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(401).send(error);
        });
    })).catch((error) => {
        res.status(404).send(error.message);
    });
});
const retrieveGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    instanceGroup.retrieveGroups().then((result) => {
        res.status(200).send((result));
    }).catch((error) => {
        res.status(401).send(error);
    });
});
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const group = req.body.group;
    instanceGroup.updateGroup(group).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(401).send(error);
    });
});
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.body.groupId;
    instanceGroup.deleteGroup(groupId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const retrieveAllGroupsNamesOfTheUserByuserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    yield instanceGroup.retrieveAllGroupsOfTheUserByuserId(userId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const retrieveSingleGroupOfUserByGroupId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.query.groupId;
    instanceGroup.retrieveSingleGroupByGroupId(groupId).then((result) => {
        res.status(200).send(result.val());
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const retrieveAllParticipantsOfThegroupByGroupId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.query.groupId;
    instanceGroup.retrieveAllUsersOfTheGroup(groupId).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
});
const retrieveAllGroupsOfTheMentor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mentorId = req.query.mentorId;
    instanceGroup.retrieveAllGroupsOfTheMentor(mentorId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(200).send({ error: error.message });
    });
});
exports.default = { createGroup, retrieveGroups, updateGroup, deleteGroup, retrieveAllGroupsNamesOfTheUserByuserId, retrieveSingleGroupOfUserByGroupId, retrieveAllParticipantsOfThegroupByGroupId, retrieveAllGroupsOfTheMentor };
