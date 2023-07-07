import Comment from "../models/comment.js";

const commentService = {
  createComment: async (userId, communityId, content) => {
    try {
      const comment = await Comment.create({ userId, communityId, content });
      return comment;
    } catch (error) {
      throw new Error("Failed to create comment");
    }
  },
  getCommentById: async (id) => {
    try {
      const comment = await Comment.find({ communityId: id })
        .sort({ createdAt: -1 })
        .populate("userId");
      return comment;
    } catch (error) {
      throw new Error("Failed to retrieve comment");
    }
  },
  updateComment: async (id, content) => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      return comment;
    } catch (error) {
      throw new Error("Failed to update comment");
    }
  },
  deleteComment: async (id) => {
    try {
      const result = await Comment.deleteMany({ communityId: id });
      return result;
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  },
  deleteOneComment: async (id) => {
    try {
      const result = await Comment.deleteOne({ _id: id });
      return result;
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  },
  getCommentLength: async (id) => {
    try {
      const numberOfComments = await Comment.find({
        communityId: id,
      }).countDocuments();
      return numberOfComments;
    } catch (error) {
      throw new Error("Failed to get comment number");
    }
  },
  async toggleLike(id, userId) {
    try {
      const community = await Community.findById(id);
      if (!community) {
        throw new Error("Community not found");
      }

      community.toggleLike(userId);
      await community.save();

      return community.likes;
    } catch (error) {
      throw new Error("Failed to toggle like");
    }
  },
};

export default commentService;
