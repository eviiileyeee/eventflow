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


router.post('/create',
  uploadMiddleware.array('images', 5),
  eventController.createEvent
);

router.patch('/:id',
  uploadMiddleware.array('images', 5),
  eventController.updateEvent
);

router.delete('/:id', eventController.deleteEvent);

router.post('/:id/register', eventController.registerForEvent);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));

//router.patch('/:id/feature', eventController.toggleFeatureEvent);

module.exports = router;
