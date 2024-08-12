const ContactUs = require("../models/ContactUs");

// Create Contact Us
const contactUs = async (req, res) => {
  try {
    const contactUs = new ContactUs(req.body);
    await contactUs.save();

    res.status(201).json(contactUs);
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

// Get Contact Us
const getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.find();
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Contact Us by ID
const getContactUsById = async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.params.id);
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  contactUs,
  getContactUs,
  getContactUsById,
};
