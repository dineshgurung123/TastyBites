import { Router, Request, Response, NextFunction } from "express";
import { authenticationUser, isAdmin } from "../middlewares/authMiddleware"; // Correct import name
import {addFood, deleteFood, getFood, getSingleFood, updateFood} from "../controllers/foodController" 

const router = Router();

router.get(
  "/",
  
  async(req: Request, res: Response)=> {
     
     const foodData = await getFood()
    res.status(200).json({data: foodData})

  }
);

router.post("/", authenticationUser, isAdmin,  async(req: Request, res: Response)=>{
            
       try {
        const data  =  req.body

       const result  = await  addFood(data)
        console.log(result)
        res.status(200).json({data:"created fooddata", result})
       } catch (error) {
        res.json(error)
       }

})

router.put("/:id", async(req: Request, res: Response)=>{
   
   try {
    
    const {id} = req.params

    const updatedFood=  await updateFood(id, req.body)
    res.status(200).json({data: "Updated Food", updateFood})
    
   } catch (error) {
    res.send(error)
   }
})

router.delete("/:id", async(req: Request, res: Response)=>{
  
  try {
      
    const {id}  =req.params
   const deletedFood =  await deleteFood(id)

    res.json({data: "Deleted food"})
  } catch (error) {
    res.send(error)
  }

})

router.get("/:id", async(req: Request, res: Response)=>{
  
     const {id} = req.params

     const singleFood = await getSingleFood(id)
    res.json({data : singleFood})
})

export default router;