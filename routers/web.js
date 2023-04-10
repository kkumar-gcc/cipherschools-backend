const auth = require("../middleware/auth");

const router = require("express").Router();
require("../controllers/auth.controller");
require("../controllers/user.controller");
// register
router.post("/register", register);

// log in
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn", loggedIn);

// add follower method
router.post("/follow", auth, addFollower);

router.post("/edit", auth, async (req, res) => {
  try {
    const { name, number, contactId } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, user: req.cookies.id },
      { name, number },
      { new: true }
    );
    if (!contact) {
      res.status(404).send("Contact not found");
      return;
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.post("/delete", auth, async (req, res) => {
  try {
    const { contactId } = req.body;
    if (!contactId) {
      return res.status(400).json({ errorMessage: "Invalid request!" });
    }

    const contact = await Contact.findOne({ _id: contactId });
    if (!contact) {
      res.status(404).send("Contact not found");
      return;
    }

    if (contact.user.toString() !== req.cookies.id) {
      res.status(401).send("Unauthorized");
      return;
    }

    await contact.remove();
    res.send("Contact deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/resetpassword", auth, resetPassword);

module.exports = router;
