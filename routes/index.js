const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send(`<div>L+Ratio+Bozo</div>`));

module.exports = router;