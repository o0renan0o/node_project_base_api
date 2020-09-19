let router = require('express').Router();

//Login

router.get('/', (req, res) => {
    res.json({message: "Hi !"})
});

export default router