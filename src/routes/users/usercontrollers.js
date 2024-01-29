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
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const User_1 = require("../../models/User");
const instanceUser = new User_1.User('', '', '', 0);
const createUser = async (req, res) => {
    const { email, password } = await req.body;
    await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        if (userRecord) {
            return await res.send({
                'status': 409,
                response: 'user already exists'
            });
        }
    }).catch(async (error) => {
        // if user does not exist than new user is created========
        await admin.auth().createUser({
            displayName: email.split('@')[0],
            password: password,
            email: email,
        })
            .then(async (userCredential) => {
            //adding role in firebase-auth within customclaims
            await admin.auth().setCustomUserClaims(userCredential.uid, { roles: new Array() });
            //getting idToken to send to the client-side===============
            admin.auth().createCustomToken(userCredential.uid)
                .then(async (customToken) => {
                return res.send({
                    "status": 200,
                    "message": "Success",
                    "token": customToken
                });
            })
                .catch(async (error) => {
                return await res.status(401).send({
                    "status": 404,
                    "message": error.message,
                });
            });
        });
    });
};
const getUserById = async (req, res) => {
    const userId = req.query.uid;
    admin.auth().getUser(userId)
        .then((userRecord) => {
        console.log(userRecord);
        return res.status(200).send(userRecord);
    }).catch(error => {
        return { error: error.message };
    });
};
const retrieveAllUsers = async (req, res) => {
    let users = [];
    await admin.auth().listUsers()
        .then(async (userRecords) => {
        userRecords.users.map((userInfo) => {
            let user = {
                displayName: userInfo.displayName,
                uid: userInfo.uid
            };
            users.push(user);
        });
        return await res.status(200).send(users);
    })
        .catch((error) => {
        console.log('Error fetching user data:', error);
    });
};
const retrieveEditorbyEditorId = async (req, res) => {
    const editorid = req.query.editorid;
    instanceUser.retrieveEditorByEditorId(editorid).then((user) => {
        res.status(200).send(user);
    });
};
const addRoleToUser = async (req, res) => {
    const { uid, role, groupId } = req.body;
    instanceUser.addRoleToUser(uid, role, groupId).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(401).send(error);
    });
};
const retrieveUserByEmail = async (req, res) => {
    const email = req.query.email;
    instanceUser.retrieveUserByEmail(email).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const addPArticipantToGroup = async (req, res) => {
    const { groupId, email, role } = req.body;
    await instanceUser.addParticipantToGroup(groupId, email, role).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const getUserRoles = async (req, res) => {
    const uid = req.query.uid;
    instanceUser.getUserRoles(uid).then((roles) => {
        res.status(200).send(roles);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const retrieveAllUsersOfTheGroup = async (req, res) => {
    const groupId = req.query.groupId;
    instanceUser.retrieveAllUsersOfTheGroup(groupId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
const retrieveSingleUserRolesOfTheGroup = async (req, res) => {
    const { groupId, userId } = req.query;
    instanceUser.retrieveSingleUserRolesOfTheGroup(groupId, userId).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(404).send({ error: error.message });
    });
};
exports.default = { createUser, getUserById, retrieveAllUsers, retrieveEditorbyEditorId, retrieveUserByEmail, addPArticipantToGroup, getUserRoles, retrieveAllUsersOfTheGroup, retrieveSingleUserRolesOfTheGroup, addRoleToUser };
