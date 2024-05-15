export const catchAsyncError = (theFunction) => {
   return (req, res, next) => {
    return new Promise((req, res, next)).catch(next);   
   }
}