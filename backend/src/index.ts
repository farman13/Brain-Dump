import express from "express";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { z } from "zod";
import bycrpt from 'bcrypt';
import { contentModel, linkModel, userModel } from "./db";
import { Auth } from "./middleware";
import { random } from "./utils";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello from server")
})
app.post('/api/v1/signup', async (req, res) => {
    const reqBody = z.object({
        username: z.string().min(3).max(50),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .refine((password) => /[A-Z]/.test(password), {
                message: "Required at least one uppercase character",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Required at least one lowercase character",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Required at least one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: "Required at least one special character",
            }),
    });

    const parsedData = reqBody.safeParse(req.body);

    if (!parsedData.success) {
        console.log("Validation errors:", parsedData.error.issues);
        res.json({
            message: "Incorrect format",
            error: parsedData.error.issues[0].message,
        });
        return;
    }

    try {

        const username = req.body.username;
        const password = req.body.password;

        const hashedPassword = await bycrpt.hash(password, 10);

        await userModel.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            msg: "signed up "
        })
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist"
        })
    }
})

app.post('/api/v1/signin', async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;

        const existingUser = await userModel.findOne({
            username
        })
        //@ts-ignore
        const passwordMatch = bycrpt.compare(existingUser.password, password)

        if (existingUser && passwordMatch) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET || "");

            res.json({
                token
            })
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            })
        }
    } catch (e) {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}
)

app.post('/api/v1/content', Auth, async (req, res) => {

    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;

    await contentModel.create({
        title,
        type,
        link,
        tags: [],
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Content added"
    })

})

app.get('/api/v1/content', Auth, async (req, res) => {

    //@ts-ignore
    const userId = req.userId;

    const userContent = await contentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        userContent
    })
})

app.delete('/api/v1/content/:contentId', Auth, async (req, res) => {

    const { contentId } = req.params;
    console.log(contentId);
    const Id = new mongoose.Types.ObjectId(contentId);
    console.log(Id);

    if (!Id) {
        res.status(400).json({ message: "Invalid content ID or user ID" });
        return
    }

    const result = await contentModel.deleteOne({
        _id: Id,
        //@ts-ignore
        userId: req.userId
    })

    if (result.deletedCount === 0) {
        res.status(404).json({ message: "Content not found" });
        return
    }

    res.json({
        message: "Content deleted"
    })
})

app.post('/api/v1/brain/share', Auth, async (req, res) => {

    const share = req.body.share;

    if (share) {

        const existingLink = await linkModel.findOne({
            //@ts-ignore  
            userId: req.userId
        })

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }

        const hash = random(10);
        await linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })

    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            message: "share link removed"
        })
    }
})

app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;
    console.log(hash);
    const link = await linkModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect link"
        })
        return;
    }

    const content = await contentModel.find({
        userId: link.userId
    })

    console.log(link);

    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found , error should ideally not happen."
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("mongoDB connected")
    app.listen(process.env.PORT || 3000);
}
main();