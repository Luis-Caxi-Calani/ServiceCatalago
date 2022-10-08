//Funcion que nos hara llegar a un middleware de tipo error
function logErrors (err, req, res, next){
  console.log('logErrors');
  console.error(err); //mostramos el error en el servidor para poder monitorearlo
  next(err);  //Importante para saber que se esta enviando a un middleware de tipo de error
}

// Crear formato para devolverlo al cliente que se complementa con la funcion anterior
// así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
function errorHandler (err, req, res, next){
  console.log('errorHandler');
  // Indicar que el error es status 500 Internal Server Error
  res.status(500).json({
    message: err.message, //Mostramos al cliente el mensaje de error
    stack: err.stack, //Mostramos info del error
  });
}

function boomErrorHandler (err, req, res, next){
  if (err.isBoom){
    const { output } = err;
    // Indicar que el error es status 500 Internal Server Error
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

// Exportarlo como modulo
module.exports = { logErrors, errorHandler, boomErrorHandler }
