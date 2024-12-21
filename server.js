
const express = require('express');

const cors = require('cors');



const app2 = express();

const port = 5501;



// Abilita CORS per tutte le origini (modifica per limitare in produzione)
app2.use(cors({ origin: 'http://127.0.0.1:5500' })); 



// Serve i file statici (index.html, ecc.)

app2.use(express.static('public'));



app2.listen(port, () => {

  console.log(`Server in ascolto sulla porta ${port}`);

});
