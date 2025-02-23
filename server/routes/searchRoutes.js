const express = require('express');
const router = express.Router();
const { searchUser , getAllUsers} = require("../controllers/searchController")


router.get("/:username", searchUser)
router.get('/get-all-users', getAllUsers);

module.exports = router;
