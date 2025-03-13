// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware'); // Your auth middleware

router.use(protect); // Protect all notification routes

router
  .route('/')
  .get(notificationController.getNotifications)
  .post(notificationController.createNotification);

router.patch('/mark-all-read', notificationController.markAllAsRead);
router.post('/post',notificationController.createNotification )
router
  .route('/:id')
  .patch(notificationController.markAsRead)
  .delete(notificationController.deleteNotification);

module.exports = router;
