const Event = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

exports.getAllEvents = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete queryObj[field]);

  // Advanced filtering
  let query = Event.find(queryObj);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  }

  // Search functionality
  if (req.query.search) {
    query = query.find({
      $text: { $search: req.query.search }
    });
  }

  // Execute query with pagination
  const events = await query.skip(skip).limit(limit);
  const total = await Event.countDocuments(queryObj);

  res.status(200).json({
    status: 'success',
    results: events.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
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
  console.log("Inside createEvent",req.body);
  // Parse the JSON data from the form
  let eventData;
  
  if (req.body.eventData) {
    // If eventData is sent as a string (which is common with FormData)
    try {
      eventData = JSON.parse(req.body.eventData);
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid event data format'
      });
    }
  } else {
    // If data is sent as regular JSON
    eventData = req.body;
  }

  // Add organizer (current user) to the event data
  eventData.organizer = req.user._id;
  
  // Handle image uploads
  if (req.files && req.files.images) {
    try {
      // Ensure images is always an array
      const imageFiles = Array.isArray(req.files.images) 
        ? req.files.images 
        : [req.files.images];
      
      // Process each image
      const imagePromises = imageFiles.map(async file => {
        const result = await uploadToCloudinary(file.path);
        
        // Clean up the temporary file after upload
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting temporary file:', err);
        });
        
        return {
          url: result.url,
          public_id: result.public_id
        };
      });
      
      // Wait for all uploads to complete
      eventData.images = await Promise.all(imagePromises);
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error uploading images',
        error: error.message
      });
    }
  } else {
    // No images provided
    eventData.images = [];
  }
  
  // Create the event in the database
  const event = await Event.create(eventData);
  
  // Return the created event
  res.status(201).json({
    status: 'success',
    data: event
  });
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

  // Handle image updates
  if (req.files) {
    // Delete old images from cloudinary
    const deletePromises = event.images.map(image => 
      deleteFromCloudinary(image.public_id)
    );
    await Promise.all(deletePromises);

    // Upload new images
    const imagePromises = req.files.map(file => uploadToCloudinary(file.path));
    const uploadedImages = await Promise.all(imagePromises);
    req.body.images = uploadedImages.map(image => ({
      url: image.url,
      public_id: image.public_id
    }));
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
  if (event.organizer.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not authorized to delete this event', 403));
  }

  // Delete images from cloudinary
  const deletePromises = event.images.map(image => 
    deleteFromCloudinary(image.public_id)
  );
  await Promise.all(deletePromises);

  await event.remove();

  res.status(204).json({
    status: 'success',
    data: null
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
    reg => reg.user.toString() === req.user._id.toString()
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
