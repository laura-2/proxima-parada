const router = require("express").Router();
const {User, validate} = require("../models/User/User");
const Joi = require('joi');
const bcrypt = require('bcryptjs')

router.get("/", async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await User.findOne({userId: userId})
        res.json(data)
      } catch (error) {
        res.status(400).send(error);
      }
  });

module.exports = router;