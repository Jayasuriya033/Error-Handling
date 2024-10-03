import express from "express";
import { NotFoundErr } from '../error/notFoundErr.js';
import { ValidationErr } from "../error/validationErr.js";
import { PrismaClient } from "@prisma/client";



const router = express.Router();
const prisma = new PrismaClient();


router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new NotFoundErr('User Not Found');
    }
   
    if (password !== user.password) {
      throw new ValidationErr('Password Incorrect ❌');
    }
   
    return res.json({ login: true, username: user.username, role: 'user' });

  } catch (err) {
    next(err);
  }
});

export  {router as login};
