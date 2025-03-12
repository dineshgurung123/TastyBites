import { Router ,Request, Response} from "express";
import Cart from "../models/cart.model";
import { addCart } from "../controllers/cartController";
import { authenticationUser } from "../middlewares/authMiddleware";



const router = Router()

router.post("/",authenticationUser, async(req: Request, res: Response)=>{

 try {
       
     const userId = req.user?.userId
    const data = req.body
 
  const result = await addCart(data, userId)
   
  res.json(result)

 } catch (error) {
    res.send(error)
 }



})

export default router