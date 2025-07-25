const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxLength: 200,
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  time: {
    start: {
      type: String,
      required: [true, 'Start time is required'],
    },
    end: {
      type: String,
      required: [true, 'End time is required'],
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Physical', 'Virtual', 'Hybrid'],
      required: true,
    },
    venue: String,
    address: String,
    city: String,
    state: String,
    country: String,
    virtualLink: String,
  },
  image: {
    url: String,
    public_id: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['Conference', 'Workshop', 'Seminar', 'Concert', 'Exhibition', 'Other'],
  },
  price: {
    type: Number,
    default: 0,
  },
  capacity: {
    type: Number,
    required: true,
  },
  ticketsSold: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft',
  },
  agenda: [{
    time: String,
    title: String,
    description: String,
    speaker: String,
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registrations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ticketCount: Number,
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for tickets available
eventSchema.virtual('ticketsAvailable').get(function() {
  return this.capacity - this.ticketsSold;
});

// Index for searching
eventSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
