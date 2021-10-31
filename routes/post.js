const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.json({'title': "My first book", description: 'My first description'});
});

module.exports = router;
