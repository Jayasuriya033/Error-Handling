import express from "express";
import { AlreadyExist } from "../error/alreadyExist.js";
import { PrismaClient } from "@prisma/client";
import { NotFoundErr } from "../error/notFoundErr.js";


const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req,res, next) =>{
  try {
      const {username, password} = req.body;
      const user = await prisma.user.findUnique({
          where : {username}
      })
      if (user) {
          throw new AlreadyExist("User already Exist!")
      }
      await prisma.user.create({
          data:{username,password}
      })
      return res.status(200).json({message : "Success"})
      
  } catch (error) {
      next(error);
  }
})





router.get("/", async (req, res, next) => {
    try {
      
      const users = await prisma.user.findMany();
      if (users.length === 0) {
        throw new NotFoundErr("No users found");
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });






router.get("/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);    
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundErr("User Not Found");
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });
  








  router.put("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);  
      const { username, password } = req.body;
      
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundErr("User Not Found");
      }
      
      await prisma.user.update({
        where: { id },
        data: { username, password },
      });
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  });


  

  router.get("*", (req, res, next) => {
    next(new NotFoundErr("Page Not Found"));
  });



export {router as user};
