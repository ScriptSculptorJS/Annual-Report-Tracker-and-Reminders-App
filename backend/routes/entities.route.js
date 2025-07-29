import express from 'express';
import { createEntity, updateEntity, deleteEntity } from '../controllers/entities.controller.js';
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();

/*router.use(verifyUser);*/

router.post('/', createEntity);
router.put('/', verifyUser, updateEntity)
router.delete('/', deleteEntity)

export default router;