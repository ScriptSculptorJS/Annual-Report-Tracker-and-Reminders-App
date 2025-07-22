import express from 'express';
import { getAccess, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();

/*router.use(verifyUser);*/

router.get('/', verifyUser, getAccess);
router.post('/', createUser);
router.put('/:id', verifyUser, updateUser)
router.delete('/:id', deleteUser)

export default router;