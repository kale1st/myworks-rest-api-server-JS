import * as admin from "firebase-admin";

export const createUser = async (email, password) => {
  const user = await admin.auth().getUserByEmail(email).then(async (userRecord) => {
    console.log('already exists')
  }).catch(async (error) => {
    // if user does not exist than new user is created
    const { uid } = await admin.auth().createUser({
      displayName: email,
      password: password,
      email: email,
    });
    await admin.auth().setCustomUserClaims(uid, { roles: new Array() });
    console.log(error.message)
  })
};
