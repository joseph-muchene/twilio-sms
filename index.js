require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.post("/sent", (req, res) => {
  // twilio credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const myTwilioNumber = process.env.TWILIO_PHONE_NUMBER;

  const client = require("twilio")(accountSid, authToken);
  const { number, body } = req.body;
  client.messages.create(
    {
      body: body,
      from: myTwilioNumber,
      to: number,
    },
    (err, message) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(message);
    }
  );
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
