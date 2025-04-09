const mongoose = require("mongoose");

module.exports = mongoose.model("Profiles", new mongoose.Schema({
    id: { type: String, unique: true, required: true }
}));