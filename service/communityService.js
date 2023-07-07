import Community from "../models/communityModel.js";

class CommunityService {
  async createCommunity(title, content, userId) {
    try {
      const community = await Community.create({ title, content, userId });
      return community;
    } catch (error) {
      throw new Error("Failed to create community");
    }
  }

  async getAllCommunities() {
    try {
      const communities = await Community.find()
        .sort({ createdAt: -1 })
        .populate("userId", ["name", "image"]);
      return communities;
    } catch (error) {
      throw new Error("Failed to fetch communities");
    }
  }

  async getCommunityById(id) {
    try {
      const community = await Community.findById(id).populate("userId", [
        "name",
        "image",
        "_id",
      ]);
      return community;
    } catch (error) {
      throw new Error("Failed to fetch community");
    }
  }

  async updateCommunity(id, updatedData) {
    try {
      const community = await Community.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return community;
    } catch (error) {
      throw new Error("Failed to update community");
    }
  }

  async deleteCommunity(id) {
    try {
      await Community.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Failed to delete community");
    }
  }
  async searchCommunity(query) {
    try {
      const regex = new RegExp(query, "i");

      const searchResults = await Community.find({
        $or: [{ title: regex }, { content: regex }],
      })
        .sort({ createdAt: -1 })
        .populate("userId", ["name", "image", "_id"]);

      return searchResults;
    } catch (error) {
      throw new Error("Failed to search content");
    }
  }
  async toggleLike(id, userId) {
    try {
      const community = await Community.findById(id);
      if (!community) {
        throw new Error("Community not found");
      }

      const existingIndex = community.likes.findIndex(
        (likeId) => likeId.toString() === userId.toString()
      );

      if (existingIndex === -1) {
        community.likes.push(userId);
      } else {
        community.likes.splice(existingIndex, 1);
      }

      await community.save();

      return community.likes.length;
    } catch (error) {
      throw new Error("Failed to toggle like");
    }
  }
  async getLikesCount(id) {
    try {
      const community = await Community.findById(id);
      if (!community) {
        throw new Error("Community not found");
      }

      return community.likes.length;
    } catch (error) {
      throw new Error("Failed to get likes count");
    }
  }
  async getCommunitiesByUserId(userId) {
    try {
      const communities = await Community.find({ userId })
        .sort({
          createdAt: -1,
        })
        .populate("userId", ["name", "_id", "image"]);
      return communities;
    } catch (error) {
      throw new Error("Failed to fetch communities by userId");
    }
  }
}

export default new CommunityService();
