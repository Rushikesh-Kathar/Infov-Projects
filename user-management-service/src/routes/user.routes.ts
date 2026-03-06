import { Router } from 'express';
import {
    registerUserController,
    userGetter,
    loginUserController,
    updateUserController,
    deleteUserController
} from '../controllers/user.controller';
import { verifytoken } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/register').post(registerUserController);
router.route('/login').post(loginUserController);
router.route('/users').get(verifytoken, userGetter);
router.route("/users/:id").patch(verifytoken, updateUserController);
router.route("/users/:id").delete(deleteUserController)



export default router;