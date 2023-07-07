import commentService from "../service/commentService.js";

const commentController = {
  createComment: async (req, res) => {
    try {
      const { communityId, content } = req.body;

      const userId = req.user.userId;
      console.log({ communityId, content, userId });

      const comment = await commentService.createComment(
        userId,
        communityId,
        content
      );
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create comment" });
    }
  },
  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;

      const comment = await commentService.getCommentById(id);
      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({ error: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve comment" });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await commentService.updateComment(id, content);
      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({ error: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update comment" });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await commentService.deleteComment(id);
      if (result) {
        res.json({ message: "Comment deleted successfully" });
      } else {
        res.status(404).json({ error: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  },
  deleteOneComment: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await commentService.deleteOneComment(id);
      if (result) {
        res.json({ message: "Comment deleted successfully" });
      } else {
        res.status(404).json({ error: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  },
  getCommentLength: async (req, res) => {
    try {
      const { id } = req.params;
      const numberOfComments = await commentService.getCommentLength(id);
      res.status(200).json(numberOfComments);
    } catch (error) {
      res.status(500).json({ error: "Failed to get commentlength" });
    }
  },
};

export default commentController;
