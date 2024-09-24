const validateMove = (req, res, next) => {
    const { piece, from, to } = req.body;
  
    if (piece === 'rook') {
      const isValidMove = (from.x === to.x || from.y === to.y);
  
      if (!isValidMove) {
        return res.status(400).json({ message: 'Invalid move for a rook' });
      }
    }
    next();
  };
  
  module.exports = validateMove;
  