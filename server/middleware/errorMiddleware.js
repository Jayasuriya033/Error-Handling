

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log(statusCode);
    
    res.status(statusCode).json({
      statusCode: statusCode,
      message: err.message,
      error: err.name,
    });
  };
  
  export default errorHandler;