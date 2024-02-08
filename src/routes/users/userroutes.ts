import express from 'express';
import usercontroller from './usercontrollers';
import signin from '../../functions/sigin';
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';
const router = express.Router();

router.use(bodyParser.json());

router.post('/signin', signin.signin);
router.post('/users/createuser', usercontroller.createUser);
router.get('/users/getUserById', usercontroller.getUserById);
router.get('/users/retrieveallusers', usercontroller.retrieveAllUsers)
router.get('/users/retrieveeditorbyid', usercontroller.retrieveEditorbyEditorId)
router.get('/users/retrieveuserbyemail', tokenControl, usercontroller.retrieveUserByEmail)
router.patch('/users/addroletouser', usercontroller.addRoleToUser)
router.patch('/users/addparticipant', tokenControl, usercontroller.addPArticipantToGroup)
router.get('/users/getuserroles', tokenControl, usercontroller.getUserRoles)
router.get('/users/retrieveallusersofthegroup', tokenControl, usercontroller.retrieveAllUsersOfTheGroup)
router.get('/users/getuserrolesofthegroup', tokenControl, usercontroller.retrieveSingleUserRolesOfTheGroup)
export default router
