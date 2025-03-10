import express from 'express';
import {getTrendingTv,getTvTrailers,getSimilarTvs,getTvDetails,getTvsByCategory} from '../controllers/tv.controller.js';
const router=express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/similar",getSimilarTvs);
router.get("/:id/details",getTvDetails);
router.get("/:category",getTvsByCategory);


export default router;