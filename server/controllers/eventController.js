const Event = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fs = require('fs'); // Added missing fs import
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

exports.getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find(); // Fetch all events without filters

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: events
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id)
    .populate('organizer', 'name email')
    .populate('registrations.user', 'name email');

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: event
  });
});

exports.createEvent = catchAsync(async (req, res) => {
  console.log("Inside createEvent", req.body);

  let eventData;
  
  // Parse JSON if sent as a string
  try {
    eventData = req.body.eventData ? JSON.parse(req.body.eventData) : req.body;
  } catch (error) {
    return res.status(400).json({ status: "fail", message: "Invalid event data format" });
  }

  // Ensure user is authenticated
  if (!req.user) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  eventData.organizer = req.user._id;
  
  // Handle single image upload
  if (req.file) {
    try {
      const result = await uploadToCloudinary(req.file.path);
      fs.unlink(req.file.path, (err) => err && console.error("Error deleting temp file:", err));
      if (!result?.url) throw new Error("Image upload failed");
      eventData.image = { url: result.url, public_id: result.public_id };
    } catch (error) {
      return res.status(400).json({ status: "fail", message: "Error uploading image", error: error.message });
    }
  } else {
    eventData.image = null;
  }

  // Validate and create the event
  try {
    const event = new Event(eventData);
    await event.validate();
    await event.save();

    res.status(201).json({ status: "success", data: event });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ status: "fail", message: "Event creation failed", error: error.message });
  }
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  // Check if user is authorized to update
  if (event.organizer.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not authorized to update this event', 403));
  }

  // Handle image update
  if (req.file) {
    // Delete old image from cloudinary if it exists
    if (event.image && event.image.public_id) {
      await deleteFromCloudinary(event.image.public_id);
    }
    // Upload new image
    const result = await uploadToCloudinary(req.file.path);
    fs.unlink(req.file.path, (err) => err && console.error("Error deleting temp file:", err));
    req.body.image = { url: result.url, public_id: result.public_id };
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: updatedEvent
  });
});




exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  // Check if user is authorized to delete
  if (req.user && event.organizer && event.organizer.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not authorized to delete this event', 403));
  }

  // Delete image from cloudinary if it exists
  if (event.image && event.image.public_id) {
    await deleteFromCloudinary(event.image.public_id);
  }

  // Use findByIdAndDelete instead of remove (which is deprecated)
  await Event.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
    message : "event deleted successfully"
  });
});

exports.registerForEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  // Check if tickets are available
  const ticketCount = parseInt(req.body.ticketCount) || 1;
  if (event.ticketsAvailable < ticketCount) {
    return next(new AppError('Not enough tickets available', 400));
  }

  // Check if user is already registered
  const alreadyRegistered = event.registrations.some(
    reg => reg.user && reg.user.toString() === req.user._id.toString()
  );

  if (alreadyRegistered) {
    return next(new AppError('You are already registered for this event', 400));
  }

  // Add registration and update ticket count
  event.registrations.push({
    user: req.user._id,
    ticketCount
  });
  event.ticketsSold += ticketCount;

  await event.save();

  res.status(200).json({
    status: 'success',
    data: event
  });
});