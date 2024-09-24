const { User } = require('../models/db');  // Assure-toi que tu importes bien le modèle User

module.exports = {
  post: async (req, res) => {
    // Ajout du log pour vérifier si le modèle User est bien défini
    console.log(User);  // Affiche le modèle User dans la console pour le débogage

    if (!User) {
      // Si le modèle est indéfini, renvoie une erreur 500
      res.status(500).json({ error: 'User model is undefined' });
      return;
    }

    try {
      const user = await User.create(req.body);  // Tente de créer l'utilisateur
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
