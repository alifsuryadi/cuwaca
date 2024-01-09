import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { API_URL } from "../config.js";
import { API_Key } from "../config.js";
import serverless from "serverless-http";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

//Date
function dayHours() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDay = new Date();
  const day = days[currentDay.getDay()];

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const result = day + ", " + formatAMPM(currentDay);
  return result;
}

app.post("/cuwaca-akses", async (req, res) => {
  console.log(req.body);

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  try {
    const response = await axios.get(
      `${API_URL}data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}`
    );
    const result = response.data;

    res.render("content.ejs", {
      content: result,
      dayHour: dayHours(),
    });
  } catch (error) {
    // Tangani kesalahan dan kirim respons sesuai
    // res.redirect("/");
    res.status(500).json({ error: "An error occurred. Try Again" });
  }
});

app.post("/cuwaca-city", async (req, res) => {
  console.log(req.body);

  const city = req.body.city;
  const country = req.body.country;

  try {
    const response = await axios.get(
      `${API_URL}data/2.5/weather?q=${city},${country}&APPID=${API_Key}`
    );
    const result = response.data;

    res.render("content.ejs", {
      content: result,
      dayHour: dayHours(),
    });
  } catch (error) {
    // Tangani kesalahan dan kirim respons sesuai
    res.status(500).json({ error: "An error occurred. Try again" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/.netlify/function/index", router);
export const handler = serverless(app);
