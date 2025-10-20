
document.addEventListener("DOMContentLoaded", () => {
  const key = "routines_v2";
  if(!localStorage.getItem(key)){
    localStorage.setItem(key, JSON.stringify([
      {id:1,name:"Weekly Watering",frequency:"7 days",action:"Water",supplies:["Watering Can"],gardener:"Alice Green"},
      {id:2,name:"Monthly Fertilizing",frequency:"30 days",action:"Fertilize",supplies:["All-purpose NPK"],gardener:"Ben Oak"}
    ]));
  }

  function render(){
    const tbody = document.querySelector("#routinesTable tbody");
    tbody.innerHTML = "";
    const list = JSON.parse(localStorage.getItem(key));
    list.forEach(r=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r.id}</td><td>${r.name}</td><td>${r.frequency}</td><td>${r.action}</td><td>${r.supplies.join(", ")}</td><td>${r.gardener||""}</td>
        <td><button class="run btn small">Run</button> <button class="edit btn small">Edit</button></td>`;
      tbody.appendChild(tr);
    });
  }

  document.getElementById("newRoutine")?.addEventListener("click", ()=>{
    const name = prompt("Routine name:");
    if(!name) return;
    const freq = prompt("Frequency (e.g., 7 days):","7 days");
    const action = prompt("Action (Water, Fertilize, Prune):","Water");
    const supplies = prompt("Supplies (comma separated):","Watering Can").split(",").map(s=>s.trim());
    const gardener = prompt("Assigned gardener:");
    const list = JSON.parse(localStorage.getItem(key));
    const id = list.length?list[list.length-1].id+1:1;
    list.push({id,name,frequency:freq,action,supplies,gardener});
    localStorage.setItem(key, JSON.stringify(list));
    render();
  });

  document.querySelector("#routinesTable")?.addEventListener("click", (e)=>{
    if(e.target.matches(".run")){
      const id = Number(e.target.closest("tr").querySelector("td").textContent);
      const list = JSON.parse(localStorage.getItem(key));
      const r = list.find(x=>x.id===id);
      alert("Running routine: " + r.name + " (" + r.action + ")");
      // create a care log entry for simulation
      const logsKey = "care_logs";
      const logs = JSON.parse(localStorage.getItem(logsKey) || "[]");
      logs.push({id:logs.length+1, plant:"(multiple)",date:new Date().toISOString().slice(0,10), action:r.action, notes:"Run via routine: "+r.name});
      localStorage.setItem(logsKey, JSON.stringify(logs));
      // notify user
      render();
    }
    if(e.target.matches(".edit")){
      const tr = e.target.closest("tr");
      const id = Number(tr.querySelector("td").textContent);
      const list = JSON.parse(localStorage.getItem(key));
      const r = list.find(x=>x.id===id);
      const newName = prompt("Name:", r.name);
      if(newName) r.name = newName;
      localStorage.setItem(key, JSON.stringify(list));
      render();
    }
  });

  render();
});
