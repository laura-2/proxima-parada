const router = require("express").Router();
const {User, validate} = require("../models/User/User");
const bcrypt = require("bcryptjs")

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(409).json({ error: 'Este email já está cadastrado.' });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({...req.body, password: hashPassword}).save()
        res.status(201).json({message: 'Usuário registrado com sucesso!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
