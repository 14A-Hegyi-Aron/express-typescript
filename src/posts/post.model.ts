import { Schema, model } from "mongoose";
import IPost from "./post.interface";

const postSchema = new Schema<IPost>(
  {
    author: String,
    content: String,
    title: String,
    canIBeYourFriend: Boolean,
  },
  {
    versionKey: false,
  }
);

const postModel = model<IPost>("Post", postSchema);

export default postModel;
