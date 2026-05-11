import express from "express";
const app = express();
import mongoose from "mongoose";
import { User } from "./models/user-model.js";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (CSS, JS)
app.use(express.static(__dirname));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoURL = "mongodb://127.0.0.1:27017/ovio";
async function main() {
    await mongoose.connect(mongoURL);
}

main().then(() => {
    console.log(`Connected to DB!`);
}).catch((err)=>{
    console.log(`Error is ${err}`);
});

// GET Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index_new.html"));
});


// Rate Limiter
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.redirect("/?error=rate");
  }
});

// POST route
app.post("/", formLimiter, async (req, res) => {
  try {
    const { name, email, phone, company, timestamp } = req.body;
    // Honeypot check
    if (company) {
      return res.redirect("/?error=bot");
    }
    // Time check (anti-bot)
    if (!timestamp || Date.now() - timestamp < 1200) {
      return res.redirect("/?error=bot");
    }

    if (!name || !email || !phone) {
      return res.redirect("/?error=invalid");
    }

    const emailNormalized = email.toLowerCase();

    const existing = await User.findOne({ email: emailNormalized });
    if (existing) {
      return res.redirect("/?error=exists");
    }

    const newUser = new User({
      name,
      email: emailNormalized,
      mobile: phone,
    });

    await newUser.save();

    res.redirect("/?success=true");

  } catch (err) {
    console.error(err);
    res.redirect("/?error=server");
  }
});


const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
