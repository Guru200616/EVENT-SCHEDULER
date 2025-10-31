const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let events = [];

// Get all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// Add new event
app.post("/api/events", (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).json({ error: "Title and Date required" });

  const newEvent = { id: Date.now(), title, date, description };
  events.push(newEvent);
  res.json(newEvent);
});

// Delete event
app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  events = events.filter(event => event.id != id);
  res.json({ message: "Event deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
