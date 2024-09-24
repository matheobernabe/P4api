const i18next = require('i18next');

const translationMiddleware = (req, res, next) => {
  const language = req.headers['accept-language'] || 'fr'; 

  i18next.changeLanguage(language);

  res.locals.t = i18next.t;

  next(); 
};

module.exports = translationMiddleware;
