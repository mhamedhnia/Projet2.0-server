const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const {
    AddContact,
    GetContacts,
    DeleteContact,
} = require("../controllers/contact_controllers");
router.post("/add", AddContact);
router.get("/getContact", isAuth, GetContacts);
router.delete("/:id", isAuth, DeleteContact);
module.exports = router;
