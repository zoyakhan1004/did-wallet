const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
  did: { type: String, required: true, unique: true },
  credentialData: { type: Object, required: true },
}, { timestamps: true });

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;
