const Contact = require('../models/contactSchema');
// Visitor can send contact the admin with this function
exports.AddContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).send('infos are required');
    }
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();
    res.status(200).send({ msg: 'contact form added', contact });
  } catch (error) {
    res.status(500).send(error);
  }
};
// The admin can get contacts with this function
exports.GetContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send({ msg: 'contacts', contacts });
  } catch (error) {
    res.status(500).send(error);
  }
};
// The admin can delete a contact with this function
exports.DeleteContact = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: 'delete it succ' });
  } catch (error) {
    res.status(400).send({ msg: 'ca not delete it' });
  }
};
