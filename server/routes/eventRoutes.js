const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');


// Protected routes
router.use(authMiddleware.protect);

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);


router.post('/',
  uploadMiddleware.single('image'),
  eventController.createEvent
);

router.patch('/:id',
  uploadMiddleware.single('image'),
  eventController.updateEvent
);

router.delete('/:id', eventController.deleteEvent);

router.post('/:id/register', eventController.registerForEvent);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));

//router.patch('/:id/feature', eventController.toggleFeatureEvent);

module.exports = router;
