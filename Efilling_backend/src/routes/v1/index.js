const express = require('express');
const userRoutes = require('./user.routes')
const mainRoutes = require('./main.routes')

const router = express.Router();

router.use('/user',userRoutes);
router.use('/file',mainRoutes);


module.exports = router;
