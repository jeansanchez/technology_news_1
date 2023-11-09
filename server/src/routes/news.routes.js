import { Router } from "express";
import {
    getNewss, 
    getNews,
    createNews,
    updateNews,
    deleteNews
} from "../controllers/news.controllers.js";

const router = Router();

router.get("/news/", getNewss);
router.get("/news/:id/", getNews);
router.post("/news", createNews);
router.patch("/news/:id/", updateNews);
router.delete("/news/:id/", deleteNews);

export default router;