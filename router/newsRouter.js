import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";

const newsRouter = express.Router();

newsRouter.get("/read", async (req, res) => {
  try {
    const baseUrl = "https://news.naver.com";
    const url =
      "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=102&sid2=252";
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });

    const decodedData = iconv.decode(response.data, "euc-kr");
    const $ = cheerio.load(decodedData);

    const newsList = [];

    $("div.list_body > ul.type06_headline > li").each((index, element) => {
      let title = $(element).find("dl > dt:nth-child(2) > a").text();
      let summary = $(element).find("dl > dd").text();

      title = title.replace(/\n|\t/g, "").trim();
      summary = summary.replace(/\n|\t/g, "").trim();

      const link = $(element).find("dl > dt:nth-child(2) > a").attr("href");

      const imageElement = $(element).find("div > a > img");
      const imageUrl = imageElement.attr("src") || "";

      if (title !== "" && summary !== "") {
        const news = {
          title,
          imageUrl,
          summary,
          link,
        };

        newsList.push(news);
      }
    });

    res.json(newsList);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("An error occurred");
  }
});

export default newsRouter;
