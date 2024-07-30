// Juan David Sanchez Rey HS

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    const videoGames = 'https://api.hubspot.com/crm/v3/objects/2-32027842?properties=developer,game_genre,name';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(videoGames, { headers });
        const data = resp.data.results;
        res.render('Video_Games', { title: 'Video Games | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/create', async (req, res) => {
    try {
        res.render('create');
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/create', async (req, res) => {
    const create = {
        properties: {
            "name": req.body.name,
            "developer": req.body.developer,
            "game_genre": req.body.game_genre
        }
    }

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    const name = req.body.name;
    const searchVideoGame = `https://api.hubspot.com/crm/v3/objects/2-32027842/${name}?idProperty=name`
    let updateId;
    try {
        const resp = await axios.get(searchVideoGame, { headers });
        const data = resp.data;
        updateId = data.id;
    } catch (error) {
        console.error(error);
    }

    if (!updateId) {
        const createVideoGame = `https://api.hubapi.com/crm/v3/objects/2-32027842`;
        try {
            const response = await axios.post(createVideoGame, create, { headers });
            res.redirect('/');
        } catch (err) {
            res.redirect('/');
            console.error(err);
        }
    } else {
        const updateVideoGame = `https://api.hubapi.com/crm/v3/objects/2-32027842/${updateId}`;
        try {
            const response = await axios.patch(updateVideoGame, create, { headers });
            res.redirect('/');
        } catch (err) {
            res.redirect('/');
            console.error(err);
        }
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
