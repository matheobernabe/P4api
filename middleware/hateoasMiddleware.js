const addHateoasLinks = (req, res, next) => {
    const gameId = req.params.gameId;
  
    res.locals.links = [
      { rel: 'self', method: 'GET', href: `/api/v1/games/${gameId}` },
      { rel: 'join', method: 'POST', href: `/api/v1/games/${gameId}/join` },
      { rel: 'move', method: 'POST', href: `/api/v1/games/${gameId}/move` }
    ];
  
    next();
  };
  
  module.exports = addHateoasLinks;
  