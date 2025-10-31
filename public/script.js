const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

async function loadEvents() {
  const res = await fetch("/api/events");
  const events = await res.json();
  eventList.innerHTML = events.map(event => `
    <li>
      <div>
        <strong>${event.title}</strong><br>
        ${event.date}<br>
        <small>${event.description || ""}</small>
      </div>
      <button onclick="deleteEvent(${event.id})">🗑️</button>
    </li>
  `).join("");
}

eventForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newEvent = {
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value
  };
  await fetch("/api/events", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newEvent)
  });
  eventForm.reset();
  loadEvents();
});

async function deleteEvent(id) {
  await fetch(`/api/events/${id}`, { method: "DELETE" });
  loadEvents();
}

loadEvents();
