import mongoose from "mongoose";
import { Post } from "./models/post";

const connString = process.env.MONGODB_CONNECTION_STRING!;

export const addPost = async (title: string, author: string, body: string, hidden: boolean = true) => {
    try {
        await mongoose.connect(connString, { dbName: "postagram" });

        const post = new Post();
        post.title = title;
        post.author = author;
        post.body = body;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPosts = async () => {
    try {
        await mongoose.connect(connString, { dbName: "postagram" });

        return await Post.find(); // TODO: approfondimento
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const updatePost = async (id: string, title: string, author: string, body: string, hidden: boolean = true) => {
    try {
        await mongoose.connect(connString, { dbName: "postagram" });

        const post = await Post.findById(id);

        if (!post) {
            throw new Error("Post non trovato.");
        }

        post.title = title;
        post.author = author;
        post.body = body;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const deletePost = async (id: string) => {
    try {
        await mongoose.connect(connString, { dbName: "postagram" });

        return await Post.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}
