"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const User_1 = require("../../models/User");
const instanceUser = new User_1.User(null, null, null, null);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    yield admin.auth().getUserByEmail(email).then((userRecord) => __awaiter(void 0, void 0, void 0, function* () {
        if (userRecord) {
            return yield res.send({
                'status': 409,
                response: 'user already exists'
            });
        }
    })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        // if user does not exist than new user is created========
        yield admin.auth().createUser({
            displayName: email.split('@')[0],
            password: password,
            email: email,
        })
            .then((userCredential) => __awaiter(void 0, void 0, void 0, function* () {
            //adding role in firebase-auth within customclaims
            yield admin.auth().setCustomUserClaims(userCredential.uid, { roles: new Array() });
            //getting idToken to send to the client-side===============
            admin.auth().createCustomToken(userCredential.uid)
                .then((customToken) => __awaiter(void 0, void 0, void 0, function* () {
                return res.send({
                    "status": 200,
                    "message": "Success",
                    "token": customToken
                });
            }))
                .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                return yield res.status(401).send({
                    "status": 404,
                    "message": error.message,
                });
            }));
        }));
    }));
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.uid;
    admin.auth().getUser(userId)
        .then((userRecord) => {
        return res.status(200).send(userRecord);
    }).catch(error => {
        return { error: error.message };
    });
});
const retrieveAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    yield admin.auth().listUsers()
        .then((userRecords) => __awaiter(void 0, void 0, void 0, function* () {
        userRecords.users.map((userInfo) => {
            let user = {
                displayName: userInfo.displayName,
                uid: userInfo.uid
            };
            users.push(user);
        });
        return yield res.status(200).send(users);
    }))
        .catch((error) => {
        console.log('Error fetching user data:', error);
    });
});
const retrieveEditorbyEditorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editorid = req.query.editorid;
    instanceUser.retrieveEditorByEditorId(editorid).then((user) => {
        res.status(200).send(user);
    });
});
const addRoleToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, role, groupId } = req.body;
    instanceUser.addRoleToUser(uid, role, groupId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(401).send(error);
    });
});
const retrieveUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    instanceUser.retrieveUserByEmail(email).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const addPArticipantToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, email, role } = req.body;
    yield instanceUser.addParticipantToGroup(groupId, email, role).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const getUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    instanceUser.getUserRoles(uid).then((roles) => {
        res.status(200).send(roles);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const retrieveAllUsersOfTheGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.query.groupId;
    instanceUser.retrieveAllUsersOfTheGroup(groupId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
const retrieveSingleUserRolesOfTheGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.query;
    instanceUser.retrieveSingleUserRolesOfTheGroup(groupId, userId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
});
exports.default = { createUser, getUserById, retrieveAllUsers, retrieveEditorbyEditorId, retrieveUserByEmail, addPArticipantToGroup, getUserRoles, retrieveAllUsersOfTheGroup, retrieveSingleUserRolesOfTheGroup, addRoleToUser };
