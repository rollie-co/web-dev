
const msg = document.getElementById("msg");

document.querySelectorAll(".cart-btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();                      

    const book = {
      id:    Number(btn.dataset.id),
      title: btn.dataset.title,
      author: btn.dataset.author,
      publication: btn.dataset.publication,
      img: btn.dataset.img,
      price: Number(btn.dataset.price),
      qty:   1
    };

    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch (err) {}

    const item = cart.find(c => c.id === book.id);
    if (item) item.qty += 1;                  
    else cart.push(book);

    localStorage.setItem("cart", JSON.stringify(cart));

    msg.textContent = '"' + book.title + '" cart me add ho gayi!';
    setTimeout(function () { msg.textContent = ""; }, 2000);
  });
});
// console.log("JS Connected");
