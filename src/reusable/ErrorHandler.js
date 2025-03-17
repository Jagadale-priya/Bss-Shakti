
const errorHandler = (error,props) => {
    
    try {
        if(error.response.status===409)
        {
        return "Duplicate Entry Found"
        }else if(error.response.status===400){
            return "No Data Found"
        }else if(error.response.status===422){
            return "Please fill up all details"
        }else if(error.response.status===500){
            return "Something went wrong, please try again."
        }
    } catch (error) {
        
    }
}
export default errorHandler