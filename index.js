const express = require('express');
//const cors = require('cors');
const routerApi = require('./routes');
//Importamos las funciones que se utilizaran
const{ logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server de catalogos de nutrifit en express');
});

routerApi(app);

//Los middleware siempre deben ir despues del routing:
//Es importante el orden en que se coloquen porque es el orden en que se ejecutaran
//En este caso el logErrors es el único con un next, por lo tanto, si se colocará el errorHandler antes, ahí terminaría el proceso
app.use(logErrors);
app.use(boomErrorHandler );
app.use(errorHandler);

app.listen(port, () => {
    console.log('Conexion Correcta port ' + port);
});

