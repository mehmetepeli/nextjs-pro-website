import {connectToDB} from "@utils/database";
import Post from "@models/post";

//GET
export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const post = await Post.findById(params.id).populate('creator');

        if(!post) new Response("Post doesn't found", {status:404});

        return new Response(JSON.stringify(post), {status:200});
    } catch (e) {
        return new Response("Failed to fetching post", {status:500});
    }
}

//PATCH
export const PATCH = async (req, {params}) => {
    const {post, tag} = await req.json();

    try {
        await connectToDB();
        const existingPost = await Post.findById(params.id);

        if(!existingPost) new Response("Post doesn't found", {status:404});

        existingPost.post = post;
        existingPost.tag = tag;

        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {state:200});
    } catch (e) {
        return new Response("Failed to update post", {status: 500});
    }
}

//DELETE
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        await Post.findByIdAndRemove(params.id);

        return new Response("Post is deleted successfully", {status:200});
    } catch (e) {
        return new Response("Failed to delete post", {statu: 500});
    }
}
