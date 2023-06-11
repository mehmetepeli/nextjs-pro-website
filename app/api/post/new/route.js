import {connectToDB} from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
    const {post,tag,userId} = await req.json();

    try {
        await connectToDB();
        const newPost = new Post({creator:userId,tag:tag,post:post});
        await newPost.save();

        return new Response(JSON.stringify(newPost), {status:201});
    } catch (e) {
        return new Response("Failed to create a new post", {status:500});
    }
}
