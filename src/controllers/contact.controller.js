import Contact from "../models/contact.model.js";
import sendEmail from "../utils/sendEmail.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message
    });
    (name, email, message);
    await newMessage.save();

    await sendEmail(name, email, message);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
