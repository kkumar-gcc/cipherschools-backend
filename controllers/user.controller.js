const User = require("../models/User");

updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
      aboutMe,
      portfolioUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      twitterUrl,
      githubUrl,
      education,
      currentJob,
    } = req.body;

    const user = await User.findOne({ _id: req.cookies.id });

    if (!user) {
      return res.status(400).json({
        errorMessage: "Something went wrong!",
      });
    }
    if (email) {
      if (!firstName) {
        return res.status(400).json({
          errorMessage: "User's first name must present.",
        });
      }
      if (!lastName) {
        return res.status(400).json({
          errorMessage: "User's last name must present.",
        });
      }
      user.firstName = firstName;
      user.lastName = lastName;
    }

    if (mobileNo) {
      user.mobileNo = mobileNo;
    }
    if (aboutMe) {
      user.aboutMe = aboutMe;
    }
    if (portfolioUrl) {
      user.portfolioUrl = portfolioUrl;
    }
    if (facebookUrl) {
      user.facebookUrl = facebookUrl;
    }
    if (instagramUrl) {
      user.instagramUrl = instagramUrl;
    }
    if (linkedinUrl) {
      user.linkedinUrl = linkedinUrl;
    }
    if (twitterUrl) {
      user.twitterUrl = twitterUrl;
    }
    if (githubUrl) {
      user.githubUrl = githubUrl;
    }
    if (education) {
      user.education = education;
    }
    if (currentJob) {
      user.currentJob = currentJob;
    }
    await user.save();

    // Return a success message or the updated user object
    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error });
  }
};

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
updateInterest = async (req, res) => {
  try {
    const { interests } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.cookies.id },
      { interests },
      { new: true }
    );
    if (!user) {
      res.status(404).send("Something went wrong");
      return;
    }
    res.status(200).json({ message: "Interests updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

getFollowers = async (req, res) => {
  try {
    const { page, limit } = req.query;

    // Convert page and limit parameters to numbers and set default values
    const pageNumber = Number.parseInt(page, 10) || 1;
    const pageSize = Number.parseInt(limit, 10) || 10;

    // Calculate the number of followers to skip
    const skip = (pageNumber - 1) * pageSize;

    // Find the user object with the provided user ID
    const user = await User.findById(req.cookies.id);
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    // Get the paginated list of followers
    const followers = await User.find({ _id: { $in: user.followers } })
      .skip(skip)
      .limit(pageSize);

    // Return the paginated list of followers to the client
    return res.status(200).json({
      pageNumber,
      pageSize,
      totalPages: Math.ceil(user.followers.length / pageSize),
      totalItems: user.followers.length,
      items: followers,
    });
  } catch (error) {}
};

module.exports = { addFollower, resetPassword, updateInterest, updateUser, getFollowers };
