import { Blogs } from "../models/blogs.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createBlogcontroller=asyncHandler(async(req,res)=>{


    const {title,content,author,category}=req.body;

    if([title,content,author,category].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while creating a blog")
    }


    const blog=await Blogs.create({title,content,author,category})

    if(!blog){
        throw new ApiError(400,"blog not created")
    }

    return res.status(200).json(new ApiResponse(200,"blog created successfully",blog))
    
   


})

const deleteBlogController=asyncHandler(async(req,res)=>{

    const {id}=req.params;

    if(!id){
        throw new ApiError(400,"id  not found while deleting a blog")
    }

    await Blogs.findByIdAndDelete({_id:id})

    return res.status(200).json(new ApiResponse(200,"blog deleted successfully"))
   


})


const updateBlogController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {title,content,author,category}=req.body;
    if([title,content,author,category].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while updating a blog")
    }
    const blog=await Blogs.findByIdAndUpdate({_id:id},{title,content,author,category})
    if(!blog){
        throw new ApiError(400,"blog not updated")
    }
    return res.status(200).json(new ApiResponse(200,"blog updated successfully",blog))
})


const getAllBlogsController=asyncHandler(async(req,res)=>{
    const blogs=await Blogs.find({})
    if(!blogs){
        throw new ApiError(400,"blogs not found")
    }

    return res.status(200).json(new ApiResponse(200,"blogs fetched successfully",{blogs,length:blogs.length}))
})




const getBlogsByPageController=asyncHandler(async(req,res)=>{

  

    const page=parseInt(req.query.page) || 1;
    const pageSize=parseInt(req.query.pageSize) || 2 ;

    const totalBlogs=await Blogs.countDocuments();
    const totalPage=Math.ceil(totalBlogs/pageSize)


    const skipBlogs=(page-1)*pageSize;

    const blogs=await Blogs.find({}).skip(skipBlogs).limit(pageSize).sort({createdAt:-1})
    if(!blogs){
        throw new ApiError(400,"blogs not found")
    }
    return res.status(200).json(new ApiResponse(200," page wise blogs fetched successfully",{blogs,pageSize:blogs.length,totalBlogs,totalPage}))  
})







export {createBlogcontroller,deleteBlogController,updateBlogController,getAllBlogsController,getBlogsByPageController};