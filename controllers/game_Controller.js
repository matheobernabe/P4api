const { Game, User } = require('../models/db');

module.exports = {
  createGame: async (req, res) => {
    const { player1Id } = req.body;

    try {
      const player1 = await User.findByPk(player1Id);
      if (!player1) {
        return res.status(404).json({ error: 'Player 1 not found' });
      }

      const newGame = await Game.create({
        player1Id,
        currentPlayerId: player1Id, 
        board: Array(6).fill().map(() => Array(7).fill(' ')), 
      });
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  joinGame: async (req, res) => {
    const { gameId, player2Id } = req.body;

    try {
      const game = await Game.findByPk(gameId);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      const player2 = await User.findByPk(player2Id);
      if (!player2) {
        return res.status(404).json({ error: 'Player 2 not found' });
      }

      if (game.player2Id) {
        return res.status(400).json({ error: 'Game is already full' });
      }

      game.player2Id = player2Id;
      game.status = 'ongoing';
      await game.save();

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  playTurn: async (req, res) => {
    const { gameId, playerId, column } = req.body;
    try {
      const game = await Game.findByPk(gameId);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      if (game.status === 'finished') {
        return res.status(400).json({ error: 'The game is already finished' });
      }

      const player = await User.findByPk(playerId);
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      if (game.currentPlayerId !== playerId) {
        return res.status(400).json({ error: "It's not your turn" });
      }

      if (column < 0 || column >= 7) {
        return res.status(400).json({ error: 'Invalid column' });
      }

      const board = game.board;
      let placed = false;
      let rowPlaced = -1;
      for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][column] === ' ') {
          board[row][column] = game.currentPlayerId === game.player1Id ? 'X' : 'O';
          placed = true;
          rowPlaced = row;
          break;
        }
      }

      if (!placed) {
        return res.status(400).json({ error: 'Column is full' });
      }

      const checkVictory = (board, row, col, playerSymbol) => {
        const directions = [
          { dr: 0, dc: 1 }, // Horizontal
          { dr: 1, dc: 0 }, // Vertical
          { dr: 1, dc: 1 }, // Diagonal down-right
          { dr: 1, dc: -1 } // Diagonal down-left
        ];

        for (const { dr, dc } of directions) {
          let count = 1;

          for (let i = 1; i < 4; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            if (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === playerSymbol) {
              count++;
            } else {
              break;
            }
          }

          for (let i = 1; i < 4; i++) {
            const r = row - dr * i;
            const c = col - dc * i;
            if (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === playerSymbol) {
              count++;
            } else {
              break;
            }
          }

          if (count >= 4) {
            return true;
          }
        }

        return false;
      };

      const playerSymbol = game.currentPlayerId === game.player1Id ? 'X' : 'O';
      const hasWon = checkVictory(board, rowPlaced, column, playerSymbol);

      if (hasWon) {
        game.status = 'finished';
        game.winnerId = game.currentPlayerId;
        await game.save({ fields: ['board', 'currentPlayerId', 'status', 'winnerId'] }); // Ensure only the necessary fields are updated
        return res.status(200).json({ game, message: `Player ${game.currentPlayerId} has won!` });
      } else {
        game.currentPlayerId = game.currentPlayerId === game.player1Id ? game.player2Id : game.player1Id;
      }

      game.board = board;
      await game.save({ fields: ['board', 'currentPlayerId'] }); // Ensure only the necessary fields are updated

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGameStatus: async (req, res) => {
    const { gameId } = req.params;

    try {
      const game = await Game.findByPk(gameId);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGamesList: async (req, res) => {
    try {
      const games = await Game.findAll();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  endGame: async (req, res) => {
    const { gameId, winnerId } = req.body;

    try {
      const game = await Game.findByPk(gameId);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      const winner = await User.findByPk(winnerId);
      if (!winner) {
        return res.status(404).json({ error: 'Winner not found' });
      }

      game.status = 'finished';
      game.winnerId = winnerId;
      await game.save();

      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};