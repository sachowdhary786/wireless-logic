// Define our variables that will be needed in order for the module to work 
const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://wltest.dns-systems.net/";
var sub_data = [];

async function getData() {
  try {
    // Use axios to make the request to the web page in order to retrieve the data
    const res = await axios.get(url);

    // Use cheerio to parse the HTML and to enable the use of jQuery for data structure manipulation
    // Aliased cheerio with $ so it matches with traditional jQuery syntax 
    const $ = cheerio.load(res.data);

    // Store the data found in the class ".package" into a variable so that we are able to traverse through 
    var data = $(".package");

    // For each set of package data, assign the requested data into variables
    data.each(function () {
      option_title = $(this).find(".header > h3").text();
      description = $(this).find(".package-name").text();
      price = $(this).find("span.price-big").text();
      discount = $(this).find(".package-price > p").text();

      // Remove £ notation from price string and convert to number
      price = price.replace("£", "");
      price = +price;

      // Push the data into an array for sorting later
      sub_data.push({ 'option title': option_title, description, price, discount });
    });

    // Sort the array in descending order
    sub_data = sub_data.sort((b, a) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });

    // Console log the resulting data 
    console.log(sub_data);

  } catch (error) {
    // If there are any issues with the function, ensure that we are able to
    // print the error to the console for future debugging
    console.error(error);
  }
}

// Call the defined function 
getData();
