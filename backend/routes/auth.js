const router = require("express").Router();
const {User} = require("../models/User/User");
const bcrypt = require('bcryptjs')

router.post('/', async (req, res)=> {
    try {
        const user = await User.findOne({email: req.body.email}).populate('favList');
        if(!user){
            return res.status(401).send({message: "Email ou Senha inválida"})

        }
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if(!validPassword){
            return res.status(401).send({message: "Email ou senha inválida"})
        }
        const token = user.generateAuthToken();
        res.status(200).send({data: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                favList: user.favList
              },
            message: 'Login realizado com sucesso'})
    } catch (error) {
        res.status(500).send({message: 'Erro interno do servidor'})

    }
})


module.exports = router;