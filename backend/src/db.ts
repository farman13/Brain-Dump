import { Schema, model, Types } from 'mongoose';


const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

const contentSchema = new Schema({
    title: String,
    type: String,
    link: String,
    tags: [{ type: Types.ObjectId, ref: 'Tags' }],
    userId: { type: Types.ObjectId, ref: 'Users' }
})

const tagSchema = new Schema({
    title: String
})

const linkSchema = new Schema({
    hash: String,
    userId: { type: Types.ObjectId, ref: 'Users' }
})

export const userModel = model("Users", userSchema);
export const contentModel = model("Contents", contentSchema);
export const tagModel = model("Tags", tagSchema);
export const linkModel = model("Links", linkSchema);

