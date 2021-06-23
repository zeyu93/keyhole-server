const express = require("express");
// using axios bcuz it is a promoise based API
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const publicPath = path.join(__dirname, "public");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const TWITTERURL = "https://api.twitter.com/2/tweets/search/recent?query";
const TOKEN = process.env.SECRET_TWITTER_TOKEN;
const MAX_RESULTS = 1000;
const RESULTS_PER_REQUEST = 25;

console.log("TOKEN", TOKEN);
const axiosSearchInstance = axios.create({
  baseURL: TWITTERURL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

app.get("/", cors(), async (req, res, next) => {
  const queryTerm = req.query.term;
  try {
    const response = await axiosSearchInstance.get(
      `${TWITTERURL}=${queryTerm}&tweet.fields=public_metrics,entities&expansions=author_id&max_results=${RESULTS_PER_REQUEST}`
    );
    const { data } = response;
    res.json(data);
  } catch (e) {
    return next(e);
  }
});

app.listen(PORT, () => console.log("server running"));
