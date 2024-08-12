class ErrorHandler extends error{

    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }

}
export default ErrorHandler