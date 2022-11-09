import { Schema, model } from 'mongoose';
import IPost from './post.interface';

const postSchema = new Schema<IPost>({
    author: String,
    content: String,
    title: String,
});

const postModel = model<IPost>('Post', postSchema);

export default postModel;