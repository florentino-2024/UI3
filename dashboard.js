
document.addEventListener("DOMContentLoaded", ()=>{
  // show simple plant status cards
  const plants = JSON.parse(localStorage.getItem("plants") || "[]");
  const container = document.getElementById("statusCards");
  container.innerHTML = "";
  plants.forEach(p=>{
    const card = document.createElement("article");
    card.className = "card";
    // randomize a "health" and lastWatered for demo
    const health = ["Good","Fair","Needs Attention"][Math.floor(Math.random()*3)];
    const last = new Date(Date.now() - Math.floor(Math.random()*10)*24*3600).toISOString().slice(0,10);
    card.innerHTML = `<h3>${p.name}</h3><p>Species: ${p.species}</p><p>Last watered: ${last}</p><p>Health: <strong>${health}</strong></p>`;
    container.appendChild(card);
  });
});
