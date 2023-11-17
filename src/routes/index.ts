import express from 'express';
import userRoutes from './userRoutes/UserRoutes';
import branchRoutes from './branchRoutes/BranchRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/branch', branchRoutes);

export default router;
