
const samplePlants = [
  {id:1,name:"Fiddle Leaf Fig",species:"Ficus lyrata",water:"7 days",sun:"Bright indirect"},
  {id:2,name:"Snake Plant",species:"Sansevieria trifasciata",water:"14 days",sun:"Low to bright"},
  {id:3,name:"Pothos",species:"Epipremnum aureum",water:"7-10 days",sun:"Low to bright"}
];

function render(){
  const tbody = document.querySelector("#plantsTable tbody");
  tbody.innerHTML = "";
  const plants = JSON.parse(localStorage.getItem("plants")||JSON.stringify(samplePlants));
  plants.forEach(p=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.id}</td>
      <td>${p.name}</td><td>${p.species}</td><td>${p.water}</td><td>${p.sun}</td>
      <td><button class="edit btn small">Edit</button> <button class="delete btn small danger">Delete</button></td>`;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  if(!localStorage.getItem("plants")) localStorage.setItem("plants", JSON.stringify(samplePlants));
  render();
  document.getElementById("newPlant")?.addEventListener("click",()=>{
    const plants = JSON.parse(localStorage.getItem("plants"));
    const id = plants.length?plants[plants.length-1].id+1:1;
    const name = prompt("Plant name:");
    if(!name) return;
    const species = prompt("Species:","Unknown");
    plants.push({id,name,species,water:"7 days",sun:"Bright indirect"});
    localStorage.setItem("plants", JSON.stringify(plants));
    render();
  });

  document.querySelector("#plantsTable")?.addEventListener("click", (e)=>{
    if(e.target.matches(".delete")){
      const id = Number(e.target.closest("tr").querySelector("td").textContent);
      let plants = JSON.parse(localStorage.getItem("plants"));
      plants = plants.filter(p=>p.id!==id);
      localStorage.setItem("plants", JSON.stringify(plants));
      render();
    }
    if(e.target.matches(".edit")){
      const tr = e.target.closest("tr");
      const id = Number(tr.querySelector("td").textContent);
      let plants = JSON.parse(localStorage.getItem("plants"));
      const p = plants.find(x=>x.id===id);
      const newName = prompt("Name:", p.name);
      if(newName) p.name = newName;
      localStorage.setItem("plants", JSON.stringify(plants));
      render();
    }
  });
});
