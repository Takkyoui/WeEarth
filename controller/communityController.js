import communityService from "../service/communityService.js";

class CommunityController {
  async createCommunity(req, res) {
    const { title, content } = req.body;
    const userId = req.user.userId;
    try {
      const community = await communityService.createCommunity(
        title,
        content,
        userId
      );
      res.status(201).json(community);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCommunities(req, res) {
    try {
      const communities = await communityService.getAllCommunities();
      res.json(communities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCommunityById(req, res) {
    const { id } = req.params;
    try {
      const community = await communityService.getCommunityById(id);
      if (!community) {
        res.status(404).json({ error: "Community not found" });
      } else {
        res.json(community);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCommunity(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const updatedCommunity = await communityService.updateCommunity(id, {
        title,
        content,
      });
      if (!updatedCommunity) {
        res.status(404).json({ error: "Community not found" });
      } else {
        res.json(updatedCommunity);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCommunity(req, res) {
    const { id } = req.params;
    try {
      await communityService.deleteCommunity(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchCommunity(req, res) {
    const { q } = req.query;
    try {
      const communities = await communityService.searchCommunity(q);
      res.json(communities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async toggleLike(req, res) {
    const { id } = req.params;
    const { userId } = req.user;

    try {
      const likes = await communityService.toggleLike(id, userId);
      res.json({ likes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getLikesCount(req, res) {
    const { id } = req.params;
    try {
      const likesCount = await communityService.getLikesCount(id);
      res.json({ likesCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getCommunitiesByUserId(req, res) {
    const { userId } = req.user;
    try {
      const communities = await communityService.getCommunitiesByUserId(userId);
      res.json(communities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CommunityController();
