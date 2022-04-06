const router = require('express').Router;
const { getThought, createThought, getSingleThought,updateThought, deleteThought,addReaction, removeReaction } = require('../../controllers/thought-controller');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;