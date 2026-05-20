const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  // linked user (optional — guest submissions won't have this)
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  userName:  { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, default: '' },

  service:   { type: String, default: 'General Inquiry' },
  message:   { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'delivered'],
    default: 'pending',
  },

  adminNote: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
