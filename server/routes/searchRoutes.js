const express = require('express');
const router = express.Router();
const { searchUser , getAllUsers} = require("../controllers/searchController")


router.get("/:username", searchUser)
router.get('/users/all', getAllUsers);

module.exports = router;
