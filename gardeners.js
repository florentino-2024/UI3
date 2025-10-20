
document.addEventListener("DOMContentLoaded", ()=>{
  const key = "gardeners";
  if(!localStorage.getItem(key)){
    localStorage.setItem(key, JSON.stringify([
      {name:"Alice Green",experience:"Intermediate",contact:"alice@example.com"},
      {name:"Ben Oak",experience:"Expert",contact:"ben@example.com"}
    ]));
  }
  function render(){
    const tbody = document.querySelector("#gardenersTable tbody");
    tbody.innerHTML = "";
    const list = JSON.parse(localStorage.getItem(key));
    list.forEach(g=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${g.name}</td><td>${g.experience}</td><td>${g.contact}</td>
      <td><button class="edit btn small">Edit</button></td>`;
      tbody.appendChild(tr);
    });
  }
  document.getElementById("newGardener")?.addEventListener("click", ()=>{
    const name = prompt("Name:");
    if(!name) return;
    const exp = prompt("Experience level:","Beginner");
    const contact = prompt("Contact:");
    const list = JSON.parse(localStorage.getItem(key));
    list.push({name,experience:exp,contact});
    localStorage.setItem(key, JSON.stringify(list));
    render();
  });
  render();
});
