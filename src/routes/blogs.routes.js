import { Router } from "express";

import { createBlogcontroller, deleteBlogController, getAllBlogsController, getBlogsByPageController, updateBlogController } from "../controllers/blog.controller.js";





const router=Router()




router.route("/create-blog").post(createBlogcontroller)
router.route("/delete-blog/:id").delete(deleteBlogController)
router.route("/update-blog/:id").post(updateBlogController)
router.route("/all-blogs").get(getAllBlogsController)
router.route("/blogs-by-page").get(getBlogsByPageController)



export default router;