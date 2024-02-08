import { getDatabase, ref, set } from "firebase/database";
import { Chapter } from "./Chapter";
import * as admin from "firebase-admin";
import { WordPair } from "./WordPair";
import { Group } from "./Group";

const groupInstance = new Group(null, null)
const db = getDatabase();

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    assigned: boolean | any;
    chapters: Chapter[];
    wordPairs: WordPair[];
    imageUrl: string;
    groupId: any // which group edits the pir

    constructor(
        pirId: any,
        editorId: any,
        groupId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
        wordPairs: WordPair[],
        imageUrl: string
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.groupId = groupId
        this.name = name
        this.description = description
        this.chapters = chapters
        this.wordPairs = wordPairs
        this.imageUrl = imageUrl

    }


    //add a mew pir to node 'pirs' in db (pirlist)
    async createPir(pir: Pir) {
        await set(ref(db, 'pirs/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
            imageUrl: pir.imageUrl
        });
    }

    //this manipulates three nodes in DB
    async assignPirToGroup(pirinfo: any, groupId: any) {
        //when a pir of pirlist is assigned, two nodes added to the pir in pirlist('pirs' in db)
        await this.addPirToTheNodeInDb(pirinfo.pirId, groupId).then(async () => {
            await this.addAssignedPirToGroupsWorks(pirinfo, groupId)
        })
    }

    //when a pir of pirlist assigned, it is added a two nodes to pir in pirlist('pirs' in db) / is used in assignPirToGroup(pir: Pir)
    async addPirToTheNodeInDb(pirId: any, groupId: any) {
        const reff = admin.database().ref(`pirs/${pirId}`);
        reff.update({
            assigned: true,
            groupId: groupId
        })
            .then(() => {
                return { response: 'added succesfully' }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    //add assigned pir to groups works (works/pirs) / / is used in assignPirToGroup(pir: Pir)
    async addAssignedPirToGroupsWorks(pirinfo: any, groupId: any) {
        const refff = admin.database().ref(`groups/${groupId}/works/pirs/${pirinfo.pirId}`);
        return refff.update({
            pirName: pirinfo.name
        })
            .then(async () => {
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async retrievePirByPirid(pirId: any) {
        const nodeRef = admin.database().ref(`pirs/${pirId}`);
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data
            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async addChapterToPir(chapter: Chapter) {
        await set(ref(db, 'pirs/' + chapter.pirId + '/chapters/' + chapter.chapterId), {
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
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    //display all pir list on piredit.component.html
    async retrievePirList() {
        const nodeRef = admin.database().ref('pirs');
        const snapshot = await nodeRef.once('value');
        if (snapshot.exists()) {
            const data = snapshot.val();

            //adds groupname to assigned pirs to display goruopName on the component
            const updatedData = await Promise.all(Object.values(data).map(async (pir: any) => {
                if (pir.assigned) {
                    const groupinfo: Group | any = await groupInstance.retrieveSingleGroupByGroupId(pir.groupId);
                    return { ...pir, groupName: groupinfo.val().groupName };
                }
                return { ...pir };
            }));
            return updatedData;
        } else {
            return null;
        }
    }

    async updateChapter(chapter: Chapter | any) {
        const db = admin.database();
        const ref = db.ref('pirs/' + chapter.pirId + '/chapters/' + chapter.chapterId);
        delete chapter.selectEditor// removes selectEditor (no need)
        return ref.update(chapter)
            .then(() => {
                return { chapter }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async updatePir(pir: Pir) {
        const db = admin.database();
        const ref = db.ref('pirs/' + pir.pirId);
        return ref.update(pir)
            .then(() => {
                return { pir }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async retrieveChaptersNamesByPirId(pirId: any) {
        const nodeRef = admin.database().ref('pirs/' + pirId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async retrieveChapterByChapterId(chapterId: any, pirId: any) {
        const nodeRef = admin.database().ref(`pirs/${pirId}/chapters/${chapterId}`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    // async deletePir(pirId: any) {
    //     const ref = await admin.database().ref('pir/');
    //     return await ref.child(pirId).remove();
    // }

    async deleteChapter(pirId: any, chapterId: any) {
        const ref = await admin.database().ref(`pirs/${pirId}/chapters/`);
        return await ref.child(chapterId).remove();
    }

    async leaveThePirFromTheGroup(pir: Pir) {
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
};