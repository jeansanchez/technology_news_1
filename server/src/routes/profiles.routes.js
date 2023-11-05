import { Router } from "express";
import { register, login, deleteProfiles } from "../controllers/profiles.controllers.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/profiles/:id/', deleteProfiles);

// router.post('/logout', logout);
// router.get('/profile', profile);


export default router;