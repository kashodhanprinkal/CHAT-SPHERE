import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const aj = arcjet({

  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
 
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
   slidingWindow({
    mode:"LIVE",
    max:100,
    interval:60,
   }),
  ],
});

export default aj;