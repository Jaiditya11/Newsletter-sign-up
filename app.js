const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

// app.use = express.static("public");
// app.use("*/css", express.static("public/css"));
// app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const FirstName = req.body.fName;
  const LastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: FirstName,
          LNAME: LastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url =
    "https://us7436fd2d1d4b3c50088efb14651b4909-us12.api.mailchimp.com/3.0/lists/d0765bde01";

  const options = {
    method: "POST",
    auth: "Jaiditya:7436fd2d1d4b3c50088efb14651b4909-us12",
  };
  // const options = {
  //   method: "POST",
  //   headers: {
  //     Authorization:
  //       "Basic <SmFpZGl0eWE6NzQzNmZkMmQxZDRiM2M1MDA4OGVmYjE0NjUxYjQ5MDktdXMxMg==>",
  //   },
  // };
  // const options = {
  //   method: "POST",
  //   headers: {
  //     auth: "Jaiditya: 7436fd2d1d4b3c50088efb14651b4909-us12",
  //   },
  // };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.loh(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT, function () {
  console.log("server is running on port 3000");
});

//   Audience id
// d0765bde01

// api Key
// 7436fd2d1d4b3c50088efb14651b4909-us12

// SmFpZGl0eWE6NzQzNmZkMmQxZDRiM2M1MDA4OGVmYjE0NjUxYjQ5MDktdXMxMg==
