
document.addEventListener("DOMContentLoaded", () => {
  const logsKey = "care_logs";
  if(!localStorage.getItem(logsKey)){
    localStorage.setItem(logsKey, JSON.stringify([
      {id:1,plant:"Pothos",date:"2025-10-01",action:"Watered",notes:"No issues"},
      {id:2,plant:"Fiddle Leaf Fig",date:"2025-10-05",action:"Pruned",notes:"Removed two brown leaves"}
    ]));
  }

  function render(){
    const list = document.getElementById("logsList");
    list.innerHTML = "";
    const logs = JSON.parse(localStorage.getItem(logsKey));
    logs.forEach(log=>{
      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `<strong>${log.plant}</strong> • ${log.date} — ${log.action}<div>${log.notes||""}</div>`;
      list.appendChild(li);
    });
  }

  document.getElementById("newLog")?.addEventListener("click", ()=>{
    const plant = prompt("Plant name:");
    if(!plant) return;
    const date = new Date().toISOString().slice(0,10);
    const action = prompt("Action (watered, fertilized, pruned):","Watered");
    const notes = prompt("Notes:","");
    const logs = JSON.parse(localStorage.getItem(logsKey));
    const id = logs.length?logs[logs.length-1].id+1:1;
    logs.push({id,plant,date,action,notes});
    localStorage.setItem(logsKey, JSON.stringify(logs));
    render();
  });

  render();
});
