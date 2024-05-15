 export class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) =>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 1000){
        const message = `Duplicate ${Object.keys(err.keyvalue)} Entered`;
        err = new ErrorHandler(message,400)
    }

    if(err.name === "JsonWebTokanError"){
        const message = "json web tokan try again";
        err = new ErrorHandler(message,400)
    }

    if(err.name === "TokanExpiredError"){
        const message = "Json WebTokan Is Expired, try again";
        err = new ErrorHandler(message,400)
    }

    if(err.code === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message,400)
    }

    return res.status(err.statusCode).json({
        success : false,
        message: err.message
    })
}