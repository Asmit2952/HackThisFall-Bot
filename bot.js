require('dotenv').config();
const twit = require('twit');

const T = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

console.log("Starting Hack This Fall Twitter Bot")

// Utility function - Gives unique elements from an array
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function retweet(searchText) {
    // Params to be passed to the 'search/tweets' API endpoint
    let params = {
        q: searchText + '',
        result_type: 'recent',
        count: 10,
    }

    T.get('search/tweets', params, function (err_search, data_search, response_search) {

        let tweets = data_search.statuses
        if (!err_search) {
            let tweetIDList = []
            for (let tweet of tweets) {

                // To avoid duplication of retweets
                if (tweet.text.startsWith("RT @")) {
                    // If tweet text starts with "RT @" then it is a retweeted tweet, 
                    // with a different 'id_str' than the original
                    console.log("\nStarts with RT@, adding retweeted status id_str")
                    if (tweet.retweeted_status) {
                        tweetIDList.push(tweet.retweeted_status.id_str);
                    }
                    else {
                        tweetIDList.push(tweet.id_str);
                    }
                }
                else {
                    tweetIDList.push(tweet.id_str);
                }
            }

            // Get only unique entries
            tweetIDList = tweetIDList.filter(onlyUnique)

            console.log("TweetID LIST = \n" + tweetIDList)

            // Call the 'statuses/retweet/:id' API endpoint for retweeting EACH of the tweetID
            for (let tweetID of tweetIDList) {
                T.post('statuses/retweet/:id', { id: tweetID }, function (err_rt, data_rt, response_rt) {
                    if (!err_rt) {
                        console.log("\n\nRetweeted! ID - " + tweetID)
                    }
                    else {
                        console.log("\nError... Duplication maybe... " + tweetID)
                        console.log("Error = " + err_rt)
                    }

                    // For debugging
                    // console.log("Data = " + data_rt.text)
                    // console.log(data_rt)
                })
            }
        }
        else {
            console.log("Error while searching" + err_search)
            // We don't need to call exit() because there will be nothing left to do, once the console log has finished.
            process.exitCode = 1;
        }
    })
}

// Run every 60 seconds
setInterval(function() { retweet('#HackThisFall'); }, 60000)