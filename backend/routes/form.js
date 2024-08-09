const Form = require('../models/Form/Form');
const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
      const forms = await Form.find();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


router.post('/' ,async (req, res) => {
try {
    const {country, city, date, rating, description} = req.body;
    await new Form({
      country, 
      city,
      date: new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}), 
      rating, 
      description}).save();
    res.status(201).json({message: 'Post enviado!'});
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

module.exports = router;