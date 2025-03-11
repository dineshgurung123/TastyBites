import { error } from "console"
import { IFood } from "../models/food.model"
import { Food } from "../models/food.model"
import { foodValidation } from "../validators/foodValidation"

export const getFood = async() => {

    return  await Food.find()
}

export const addFood = async(food: IFood) => {
  
   try {
      
   const {error} =  foodValidation.validate(food)
       
   if(error){
    return error
   }
        

   const foods =  await Food.create(food) 
    foods.save()

    return foods

   } catch (error) {
    
    return error
   }  

}

 export const updateFood = async(id:string, food:IFood ) =>{
     
   const updatedFood =  await Food.findByIdAndUpdate(id,

        {
            name: food.name,
            description : food.description,
            price : food.price,
            category : food.category,
            imageUrl : food.imageUrl
        },
        {new : true}
    )
    return updateFood

 }


 export const deleteFood = async(id: String) =>{

    return Food.findByIdAndDelete(id)

 }

 export const getSingleFood = async(id: String) =>{


   return await Food.findById(id)

   
 }