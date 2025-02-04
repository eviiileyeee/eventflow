// controllers/notificationController.js
const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync'); // Create this utility

exports.getNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ timestamp: -1 });

  res.status(200).json({
    status: 'success',
    data: notifications
  });
});

exports.markAsRead = catchAsync(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { 
      _id: req.params.id,
      userId: req.user._id
    },
    { read: true },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({
      status: 'fail',
      message: 'Notification not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: notification
  });
});

exports.markAllAsRead = catchAsync(async (req, res) => {
  await Notification.updateMany(
    { userId: req.user._id },
    { read: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'All notifications marked as read'
  });
});

exports.deleteNotification = catchAsync(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!notification) {
    return res.status(404).json({
      status: 'fail',
      message: 'Notification not found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Create notification (for internal use or admin)
exports.createNotification = catchAsync(async (req, res) => {
  const notification = await Notification.create({
    userId: req.body.userId,
    type: req.body.type,
    title: req.body.title,
    message: req.body.message,
    icon: req.body.icon
  });

  res.status(201).json({
    status: 'success',
    data: notification
  });
});
