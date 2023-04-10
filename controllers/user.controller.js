const User = require("../models/User");

addFollower = async (req, res) => {
  // try {
  //   const { name, number } = req.body;
  //   const newContact = new User({
  //     name,
  //     number,
  //     user: req.cookies.id,
  //   });
  //   const savedContact = await newContact.save();
  //   res.json(savedContact);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send();
  // }
};

resetPassword = async (req, res) => {
  try {
    const { currentPassword, password, passwordVerify } = req.body;
    if (!currentPassword || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    const user = await User.findOne({ _id: req.cookies.id });

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong current password." });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.passwordHash = passwordHash;
    await user.save();

    // Return a success message or the updated user object
    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = { addFollower, resetPassword };
