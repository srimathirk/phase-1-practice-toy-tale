let addToy = false;

function updateLike(id,newLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method :"PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes" : newLikes
    })
  })
}


/*create card 
<div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div>*/


function createCardElement(toy){
  let card= document.createElement('div');
  card.classList.add('card') //creating class card in div
  let h2 = document.createElement('h2')
  h2.textContent = toy.name;
  let img = document.createElement('img')
  img.src = toy.image;
  img.classList.add('toy-avatar')
  let p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`;
  let button = document.createElement('button')
  button.classList.add('like-btn')
  button.id = toy.id
  button.textContent = 'Like ❤️';
  button.addEventListener('click',()=>{
    p.textContent = `${toy.likes += 1} Likes`
    updateLike(toy.id,toy.likes)
  })

  card.append(h2,img,p,button)
  document.getElementById("toy-collection").appendChild(card)
  }

function sendToPost(newToy){
  fetch('http://localhost:3000/toys',{
    method:"POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      ...newToy, //name: newToy.name, img = newToy.img
      "likes":0
    })
  }).then(res => res.json()).then(resToy =>createCardElement(resToy))
}



document.addEventListener("DOMContentLoaded", () => {
fetch("http://localhost:3000/toys").then(res=>res.json()).then(toys=> toys.forEach(toy=>createCardElement(toy)))

//add Toy
const form = document.querySelector(".add-toy-form")
form.addEventListener("submit",(e)=> {
  e.preventDefault();
 // const name = e.target.name
   const formData = Object.fromEntries(new FormData(e.target))
   console.log(formData)
   sendToPost(formData)
})  


const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form


    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
