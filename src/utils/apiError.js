class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        statck = ""
    ){
        //default message lai over-ride gareko
        super(message)
        this.statusCode =statusCode
        this.data = null
        this.message = message
        this.message = false;
        this.errors = errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
   
}
export {ApiError}