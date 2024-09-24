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

app.get('/api/translate', (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ error: 'Translation key is missing' });
    }

    const translation = res.__(key);
    res.json({ translation });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});