const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  repoUrl:     { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  category:    { type: String, default: 'Web Development' },
  tags:        [{ type: String }],
  analysis:    { type: String, default: '' },   // AI-generated from RepoExplain
  repoMeta:    {
    name:  { type: String, default: '' },
    stars: { type: Number, default: 0 },
    url:   { type: String, default: '' },
  },
  featured:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
