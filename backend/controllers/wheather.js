const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const whetherRequest = require("../utils/weather");
const fetch = require("node-fetch");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config();
const queryString = require("query-string");
/**
 @desc      Get  
 @route     GET /api/weather
**/
exports.getWhether = asyncHandler(async (request, response, next) => {
  const city = request.query.city;
  const zip = request.query.zip;
  if (city) {
    const city = request.query.city;
    whetherRequest.get(
      `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city}&format=json`,
      null,
      null,
      function(err, data, result) {
        if (err) {
          console.log(err);
        } else {
          response.status(200).json({
            success: true,
            data: [JSON.parse(data)]
          });
        }
      }
    );
     
    return;
  }

    if(zip) {
      const zipData = zip.split(",");
      var responses = await getAllUrls(
        zipData.map( ( item=>item.trim() ))
        );

      response.status(200).json({
        success: true,
        data: responses
      });
      return;
    } 
      response.status(400).json({
        success: false,
        data: []
      });
      return;
});

async function getAllUrls(urls) {
  try {
    var data = await Promise.all(
      urls.map(url =>
        fetchOauth(url)
          .then(response => response.json())
          .catch(err => console.log(err))
      )
    );

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
function fetchOauth(location) {
  //
  const url = "https://weather-ydn-yql.media.yahoo.com/forecastrss";
  const method = "GET";
  const app_id = process.env.APP_ID;
  const consumer_key = process.env.CLIENT_ID;
  const consumer_secret = process.env.CLIENT_SECRET;
  const concat = "&";
  const query = { location: location, format: "json" };
  const oauth = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: Math.random()
      .toString(36)
      .substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
    oauth_version: "1.0"
  };

  const merged = { ...query, ...oauth };
   
  // Note the sorting here is required
  const merged_arr = Object.keys(merged)
    .sort()
    .map(function(k) {
      return [k + "=" + encodeURIComponent(merged[k])];
    });
  const signature_base_str =
    method +
    concat +
    encodeURIComponent(url) +
    concat +
    encodeURIComponent(merged_arr.join(concat));

  const composite_key = encodeURIComponent(consumer_secret) + concat;
  const hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
  const signature = hash.toString(CryptoJS.enc.Base64);

  oauth["oauth_signature"] = signature;
  const auth_header =
    "OAuth " +
    Object.keys(oauth)
      .map(function(k) {
        return [k + '="' + oauth[k] + '"'];
      })
      .join(",");
  return fetch(url + "?" + queryString.stringify(query), {
    headers: {
      Authorization: auth_header,
      "X-Yahoo-App-Id": app_id
    }
  });
}
