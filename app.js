// requiring the npm package I installed

const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/2f938a0659";

    const options = {
      method: "POST",
      auth: "papy:fb69466f1e2c071f0175afe47a087a96-us5"
    }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })

    })

request.write(jsonData);
request.end();

});

app.post("/failure", function(){
  res.redirect("/")
});



app.listen(process.env.PORT || 4000, function(){
  console.log("server is running on port 4000");
});

// app.set('port', process.env.PORT || 8080);<br>
//MailchimpAPIKEY
// 6b48e53146c25977667f996c2d2a7d16-us5
// Audience ID
// 6bf10268f2.


//fb69466f1e2c071f0175afe47a087a96-us5

// 2f938a0659
