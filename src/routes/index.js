import express from "express"
import Controller from "../controller/index.js"

const router=express.Router()

router.get('/',Controller.ReadWriteFile)

export default router
