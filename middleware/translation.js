const i18n = require('i18n');
const express = require('express');
const app = express();

// Configuration de la traduction
i18n.configure({
    locales: ['en', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'lang'
});

app.use(i18n.init);

// Exemple de route
app.get('/', (req, res) => {
    res.send(res.__('Hello'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
