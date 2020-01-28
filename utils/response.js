const success = (res,data={},message='',statusCode = 200) =>{
    return res.status(statusCode).json({
      status : true,
      message : message,
      data : data,
    })
}

const failed = (res,error,statusCode = 500) =>{
  return res.status(statusCode).json({
    status : false,
    message : error,
    data : error.stack,
  })
}

module.exports = {
  failed,
  success
}