const SubscribedEmail = require("../models/SubscribedEmail");

// Subscribe a user
const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    let subscribedEmail = await SubscribedEmail.findOne({ email: email });
    if (subscribedEmail) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Subscribe the email
    subscribedEmail = new SubscribedEmail({ email });
    await subscribedEmail.save();

    // Send the response
    res.status(201).json(subscribedEmail);
  } catch (error) {
    // Handle the error
    res.status(400).json({ error: error.message });
  }
};

// Unsubscribe a user
const unsubscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Check if email already exists
    let subscribedEmail = await SubscribedEmail.findOne({ email });
    if (!subscribedEmail) {
      return res.status(400).json({ error: "Email not subscribed" });
    }

    // Update the subscribed email
    subscribedEmail = await SubscribedEmail.findOneAndUpdate(
      { email },
      { subscribed: false },
      { new: true }
    );

    // Send the response
    res.status(200).json(subscribedEmail);
  } catch (error) {
    // Handle the error
    res.status(400).json({ error: error.message });
  }
};

module.exports = { subscribeUser, unsubscribeUser };
