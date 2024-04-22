import express from 'express';
import { createManager, getManagers, updateManager, deleteManager } from '../Controller/ModController.js';

const router = express.Router();

router.post('/', createManager);
router.get('/', getManagers);
router.put('/:id', updateManager);
router.delete('/:id', deleteManager);

export default router;