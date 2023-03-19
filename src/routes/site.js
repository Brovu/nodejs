const express = require('express');
const router = express.Router();

const siteControllers = require('../app/controllers/SiteControllers');

router.get('/:slug', siteControllers.show);
router.get('/', siteControllers.index);

module.exports = router;
