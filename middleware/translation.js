const express = require('express');
const i18n = require('i18n');
const app = express();

i18n.configure({
    locales: ['en', 'fr', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: 'fr',
    queryParameter: 'lang',
});

app.use(i18n.init);

app.get('/', (req, res) => {
    res.send(res.__(''));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
