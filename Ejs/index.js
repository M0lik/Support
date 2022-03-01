const express = require('express');
const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res)=> {
    res.render('home', {data:'Test de data'});
})

app.listen(3000, () => {
    console.log('App listen 3000');
})