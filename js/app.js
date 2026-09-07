const PRODUCTS=[
{id:1,type:"book",name:"The Midnight Library",author:"Matt Haig",price:399,icon:"📘"},
{id:2,type:"book",name:"Atomic Habits",author:"James Clear",price:499,icon:"📗"},
{id:3,type:"book",name:"The Alchemist",author:"Paulo Coelho",price:299,icon:"📕"},
{id:4,type:"book",name:"Ikigai",author:"Héctor García",price:349,icon:"📙"},
{id:5,type:"book",name:"The Psychology of Money",author:"Morgan Housel",price:449,icon:"📓"},
{id:6,type:"book",name:"Pride and Prejudice",author:"Jane Austen",price:279,icon:"📔"},
{id:7,type:"stationery",name:"Classic Kraft Notebook",author:"120 pages",price:149,icon:"📒"},
{id:8,type:"stationery",name:"Pastel Gel Pen Set",author:"10 colors",price:199,icon:"🖊️"},
{id:9,type:"stationery",name:"Weekly Planner",author:"Undated",price:249,icon:"🗓️"},
{id:10,type:"stationery",name:"Watercolor Brush Set",author:"12 brushes",price:299,icon:"🖌️"},
{id:11,type:"stationery",name:"Sticky Notes Pack",author:"6 pastel pads",price:99,icon:"🗒️"},
{id:12,type:"stationery",name:"Study Highlighter Set",author:"6 colors",price:179,icon:"🖍️"}];
function getCart(){return JSON.parse(localStorage.getItem("booknookCart")||"[]")}
function saveCart(c){localStorage.setItem("booknookCart",JSON.stringify(c));updateCount()}
function updateCount(){let n=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll("#cartCount").forEach(e=>e.textContent=n)}
function addToCart(id){let c=getCart(),x=c.find(i=>i.id===id);x?x.qty++:c.push({id,qty:1});saveCart(c);alert("Added to cart!")}
function renderProducts(id,arr){let el=document.getElementById(id);if(!el)return;el.innerHTML=arr.map(p=>`<article class="card"><div class="cover">${p.icon}</div><div class="cardBody"><span class="meta">${p.type==="book"?"BOOK":"STATIONERY"}</span><h3>${p.name}</h3><p class="meta">${p.author}</p><div class="cardBottom"><span class="price">₹${p.price}</span><button class="smallBtn" onclick="addToCart(${p.id})">Add +</button></div></div></article>`).join("")}
function initCatalog(type){let render=()=>{let q=(document.getElementById("search").value||"").toLowerCase(),a=PRODUCTS.filter(p=>p.type===type&&(`${p.name} ${p.author}`).toLowerCase().includes(q));let s=document.getElementById("sort").value;if(s==="low")a.sort((x,y)=>x.price-y.price);if(s==="high")a.sort((x,y)=>y.price-x.price);renderProducts("products",a)};document.getElementById("search").oninput=render;document.getElementById("sort").onchange=render;render()}
function renderCart(){let el=document.getElementById("cart"),c=getCart();if(!c.length){el.innerHTML="<div class='authCard'><h2>Your cart is empty.</h2><p>Find something lovely to read or create with.</p><a class='btn' href='books.html'>Start Shopping</a></div>";updateCount();return}let total=0;el.innerHTML=c.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cartItem"><div class="cover">${p.icon}</div><div class="grow"><h3>${p.name}</h3><p>${p.author}</p><b>₹${p.price} × ${i.qty}</b></div><button class="smallBtn" onclick="removeItem(${p.id})">Remove</button></div>`}).join("")+`<div class="total"><h2>Total: ₹${total}</h2><button class="btn" onclick="checkout()">Proceed to Checkout</button></div>`;updateCount()}
function removeItem(id){saveCart(getCart().filter(x=>x.id!==id));renderCart()}
function checkout(){alert("Checkout is available in demo mode. Thank you for shopping at BookNook!");localStorage.removeItem("booknookCart");renderCart()}
updateCount();
