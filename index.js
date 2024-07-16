const express = require('express');
const axios = require('axios');
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  // Lógica para obtener datos del CRM y pasarlos a la plantilla homepage
  res.render('homepage', { data: yourData });
});

app.get('/update-cobj', (req, res) => {
  res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
  // Lógica para hacer una solicitud POST al API de HubSpot y crear un nuevo registro de CRM
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
