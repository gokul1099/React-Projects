
const express = require("express");
const {
  createRating,
  getRating,
  updateRating,
  deleteRating
 } = require('../controllers/rating')

const router = new express.Router()

router
.route('/reviews/:id')
.post(createRating)
.get(getRating)

router
.route('/update_reviews')
.put(updateRating)

router
.route('/reviews')
.delete(deleteRating)

module.exports = router
