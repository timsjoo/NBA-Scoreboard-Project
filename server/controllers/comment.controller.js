const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');

module.exports = {

  getAllComments: (req, res) => {
    Comment.find()
      .populate("createdBy", "username email")
      .then((allComments) => {
        res.json(allComments);
      })
      .catch((err)=> {
        res.json({message: "Something went wrong: getAllComments", error: err})
      })
  },

  getOneComment: (req, res) => {
    Comment.findOne({ _id: req.params.id })
      .then((oneComment) => {
        res.json(oneComment);
      })
      .catch((err)=> {
        res.json({message: "Something went wrong: getOneComment", error: err})
      })
  },

  getAllCommentsByGameId: (req, res) => {
    Comment.find({ gameId: req.params.gameId })
      .populate("createdBy", "username email")
      .then((commentsByGameId) => {
        res.json(commentsByGameId);
      })
      .catch((err) => {
        res.json({message: "Something went wrong: getAllCommentsByGameId", error: err})
      })
  },

  createComment: (req, res) => {
    const newCommentObject = new Comment(req.body);

    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    })

    newCommentObject.createdBy = decodedJWT.payload.id

    newCommentObject.save()

      .then((newComment) => {
        res.json(newComment)
      })
      .catch((err) => {
        console.log("Something went wrong: createComment")
        res.status(400).json(err)
      })
  },

  updateComment: (req, res) => {
    Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
      .then((updatedComment) => res.json(updatedComment))
      .catch((err) => {
        console.log("Something went wrong: updateComment")
        res.status(400).json(err)
      })
  },

  deleteComment: (req, res) => {
    Comment.deleteOne({_id: req.params.id})
      .then((deletedComment) => {
        res.json(deletedComment);
      })
      .catch((err)=>res.json({message: "Something went wrong: deleteComment", error: err}))
  },

}