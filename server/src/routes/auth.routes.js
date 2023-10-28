import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logout);
// router.get('/profile', profile);


export default router;