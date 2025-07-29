import express from 'express';
import { createEntity, updateEntity, deleteEntity } from '../controllers/entities.controller.js';
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();

/*router.use(verifyUser);*/

router.post('/entities', createEntity);
router.put('/entities', verifyUser, updateEntity)
router.delete('/entities', deleteEntity)

export default router;