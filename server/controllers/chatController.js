const Chat = require('../models/Chat');
const openai = require('../utils/openai');

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { user } = req;

    // Send the message to OpenAI API
    const openaiResponse = await openai.sendMessage(message);

    // Save the conversation to the database
    const chat = new Chat({
      user: user._id,
      message: message,
      response: openaiResponse,
    });

    await chat.save();

    // Send the AI response back to the client
    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        userMessage: message,
        aiResponse: openaiResponse,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message,
    });
  }
};

const fetchChatHistory = async (req, res) => {
  try {
    const { user } = req;

    // Retrieve chat history from the database
    const chatHistory = await Chat.find({ user: user._id });

    res.status(200).json({
      success: true,
      message: 'Chat history fetched successfully',
      data: chatHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history',
      error: error.message,
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { user } = req;
    const { settings } = req.body;

    // Update user settings in the database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { settings: settings } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedUser.settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  fetchChatHistory,
  updateSettings,
};