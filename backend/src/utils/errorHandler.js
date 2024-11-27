// export default function errorHandler(error,req,res,next){
//     error.statuscode = error.statuscode||500;
//     error.status = error.status||"error0"
//     res.status(error.statuscode).json({
//         status:error.status,
//         msg:error.message
//     })
// }

class ApiError extends Error{
    constructor(
        statuscode=500,
        message = "something is wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack  = stack
        }else Error.captureStackTrace(this,this.constructor)
    }
}

export {ApiError}