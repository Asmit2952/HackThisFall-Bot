# Hack This Fall Bot

![Banner](banner.png)

Hack This Fall Twitter Bot - Retweeting #HackThisFall

## Checkout Hack This Fall

Visit Hack This Fall's [official website](https://hackthisfall.tech/)!!

## Running this locally

Install dependencies:
```
npm install
```

Start the bot:

```
node bot.js
```

## Environment Variables

To run locally you will need a `.env` file with appropriate Twitter keys, in this format:

```Text
API_KEY=XXX
API_SECRET=XXX
ACCESS_TOKEN=XXX
ACCESS_TOKEN_SECRET=XXX
```
To run on Heroku, you will need to setup Config Vars, see the [Heroku Docs](https://devcenter.heroku.com/articles/config-vars).

## Reference article
[How to create a Twitter Bot using Node.js and Heroku](https://dev.to/sumedhpatkar/how-i-created-a-twitter-bot-using-node-js-and-heroku-368b#create-app) by [Sumedh Patkar](https://github.com/Sumedh-Patkar)