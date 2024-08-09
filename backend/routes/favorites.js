const { User } = require("../models/User/User");
const router = require("express").Router();

router.get('/', async (req, res) => {
    const {userId} = req.params;
    try {
      const favorites = await User.findOne(userId);
      res.json(favorites.favList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;