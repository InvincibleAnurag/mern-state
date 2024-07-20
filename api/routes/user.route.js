import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// router.get('/test',(req,res)=>{
//      res.send("Api is working");
// });

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);


export default router;