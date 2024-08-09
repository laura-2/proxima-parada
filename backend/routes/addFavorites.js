const { User } = require("../models/User/User");
const router = require("express").Router();

router.patch('/', async (req, res)=> {
    const { userId } = req.params;
    const {favList} = req.body;
    try {
        const data = await User.updateOne(userId,
            {$addToSet: { favList: { $each: favList } }},
            {new: true}
        )
        res.send(data)
      } catch (error) {
        res.status(400).send(error);
      }
})

module.exports = router;