
document.addEventListener("DOMContentLoaded", ()=>{
  const key = "supplies";
  if(!localStorage.getItem(key)){
    localStorage.setItem(key, JSON.stringify([
      {type:"Fertilizer",name:"All-purpose NPK",price:"$8"},
      {type:"Soil",name:"Potting Mix",price:"$12"}
    ]));
  }
  function render(){
    const tbody = document.querySelector("#suppliesTable tbody");
    tbody.innerHTML = "";
    const list = JSON.parse(localStorage.getItem(key));
    list.forEach(s=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${s.type}</td><td>${s.name}</td><td>${s.price}</td>
      <td><button class="edit btn small">Edit</button></td>`;
      tbody.appendChild(tr);
    });
  }
  document.getElementById("newSupply")?.addEventListener("click", ()=>{
    const type = prompt("Type:");
    if(!type) return;
    const name = prompt("Name:");
    const price = prompt("Price:");
    const list = JSON.parse(localStorage.getItem(key));
    list.push({type,name,price});
    localStorage.setItem(key, JSON.stringify(list));
    render();
  });
  render();
});
