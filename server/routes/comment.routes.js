const CommentController = require('../controllers/comment.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/comments", CommentController.getAllComments);
  app.get("/api/comments/:gameId", CommentController.getAllCommentsByGameId);
  app.get("/api/comments/:id", CommentController.getOneComment);
  app.post("/api/comments", authenticate, CommentController.createComment);
  app.put("/api/comments/:id", CommentController.updateComment);
  app.delete("/api/comments/:id", CommentController.deleteComment);
}