export const validate = (schema,data) => {
  const result = schema.safeParse(data);
  
    if (!result.success)
    {
      var a = 5
      console.log(a)
      console.log(result.error.flatten())
       return {
         success: false,
         errors: error.errors
       };
    }
  return result
  
 
     

};