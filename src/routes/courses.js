const express = require('express');
const router = express.Router();

const courseControllers = require('../app/controllers/CourseControllers');

router.get('/create', courseControllers.create);
router.post('/store', courseControllers.store);
router.get('/:id/edit', courseControllers.edit);
router.post('/handle-submit-form', courseControllers.handleSubmitForm)
router.put('/:id', courseControllers.update);
router.patch('/:id/restore', courseControllers.restore);
router.delete('/:id', courseControllers.destroy);
router.delete('/:id/forever', courseControllers.hardDestroy);
router.get('/:slug', courseControllers.show);

module.exports = router;
