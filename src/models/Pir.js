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
exports.Pir = void 0;
const database_1 = require("firebase/database");
const admin = __importStar(require("firebase-admin"));
const Group_1 = require("./Group");
const groupInstance = new Group_1.Group(null, null);
const db = (0, database_1.getDatabase)();
class Pir {
    constructor(pirId, editorId, groupId, name, description, chapters, wordPairs) {
        this.pirId = pirId;
        this.editorId = editorId;
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.chapters = chapters;
        this.wordPairs = wordPairs;
    }
    //add a mew pir to node 'pirs' in db (pirlist)
    async createPir(pir) {
        await (0, database_1.set)((0, database_1.ref)(db, 'pirs/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
        });
    }
    //this manipulates three nodes in DB
    async assignPirToGroup(pirinfo, groupId) {
        //when a pir of pirlist is assigned, two nodes added to the pir in pirlist('pirs' in db)
        await this.addPirToTheNodeInDb(pirinfo.pirId, groupId).then(async () => {
            await this.addAssignedPirToGroupsWorks(pirinfo, groupId);
        });
    }
    //when a pir of pirlist assigned, it is added a two nodes to pir in pirlist('pirs' in db) / is used in assignPirToGroup(pir: Pir)
    async addPirToTheNodeInDb(pirId, groupId) {
        const reff = admin.database().ref(`pirs/${pirId}`);
        reff.update({
            assigned: true,
            groupId: groupId
        })
            .then(() => {
            return { response: 'added succesfully' };
        })
            .catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error };
        });
    }
    //add assigned pir to groups works (works/pirs) / / is used in assignPirToGroup(pir: Pir)
    async addAssignedPirToGroupsWorks(pirinfo, groupId) {
        const refff = admin.database().ref(`groups/${groupId}/works/pirs/${pirinfo.pirId}`);
        return refff.update({
            pirName: pirinfo.name
        })
            .then(async () => {
        })
            .catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error };
        });
    }
    async retrievePirByPirid(pirId) {
        const nodeRef = admin.database().ref(`pirs/${pirId}`);
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data;
            }
            else {
                return null;
            }
        }, (error) => {
            return { error: error };
        });
    }
    async addChapterToPir(chapter) {
        await (0, database_1.set)((0, database_1.ref)(db, 'pirs/' + chapter.pirId + '/chapters/' + chapter.chapterId), {
            chapterName: chapter.chapterName,
            chapterContent: chapter.chapterContent,
            editorId: chapter.editorId,
            pirId: chapter.pirId,
            createDate: chapter.createDate,
            chapterId: chapter.chapterId
        });
    }
    async retrievePirs() {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('pirs');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data;
            }
            else {
                return null;
            }
        }, (error) => {
            return { error: error };
        });
    }
    //display all pir list on piredit.component.html
    async retrievePirList() {
        const nodeRef = admin.database().ref('pirs');
        const snapshot = await nodeRef.once('value');
        if (snapshot.exists()) {
            const data = snapshot.val();
            //adds groupname to assigned pirs to display goruopName on the component
            const updatedData = await Promise.all(Object.values(data).map(async (pir) => {
                if (pir.assigned) {
                    const groupinfo = await groupInstance.retrieveSingleGroupByGroupId(pir.groupId);
                    return { ...pir, groupName: groupinfo.val().groupName };
                }
                return { ...pir };
            }));
            return updatedData;
        }
        else {
            return null;
        }
    }
    async updateChapter(chapter) {
        const db = admin.database();
        const ref = db.ref('pirs/' + chapter.pirId + '/chapters/' + chapter.chapterId);
        delete chapter.selectEditor; // removes selectEditor (no need)
        return ref.update(chapter)
            .then(() => {
            return { chapter };
        })
            .catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error };
        });
    }
    async updatePir(pir) {
        const db = admin.database();
        const ref = db.ref('pirs/' + pir.pirId);
        return ref.update(pir)
            .then(() => {
            return { pir };
        })
            .catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error };
        });
    }
    async retrieveChaptersNamesByPirId(pirId) {
        const nodeRef = admin.database().ref('pirs/' + pirId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data;
            }
            else {
                return null;
            }
        }, (error) => {
            return { error: error };
        });
    }
    async retrieveChapterByChapterId(chapterId, pirId) {
        const nodeRef = admin.database().ref(`pirs/${pirId}/chapters/${chapterId}`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data;
            }
            else {
                return null;
            }
        }, (error) => {
            return { error: error };
        });
    }
    // async deletePir(pirId: any) {
    //     const ref = await admin.database().ref('pir/');
    //     return await ref.child(pirId).remove();
    // }
    async deleteChapter(pirId, chapterId) {
        const ref = await admin.database().ref(`pirs/${pirId}/chapters/`);
        return await ref.child(chapterId).remove();
    }
    async leaveThePirFromTheGroup(pir) {
        const db = admin.database();
        //1- it removed the pir from groups-> works -> pirs
        const ref = await db.ref(`groups/${pir.groupId}/works/pirs/`);
        await ref.child(pir.pirId).remove().then(() => {
            console.log('removed from the object in the database');
        })
            .catch((error) => {
            console.error('Error removing in the database:', error);
        });
        //2- it update pir in the node pirs
        const reff = db.ref(`pirs/${pir.pirId}/`);
        const updateData = {
            assigned: null,
            groupId: null
        };
        await reff.update(updateData)
            .then(() => {
            console.log('Features removed from the object in the database');
        })
            .catch((error) => {
            console.error('Error removing features from the object in the database:', error);
        });
    }
}
exports.Pir = Pir;
;
