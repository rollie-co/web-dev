
const content = document.getElementById("cartContent");

function getCart() {
  try { return JSON.parse(localStorage.getItem("cart")) || []; } catch (e) { return []; }
}
function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); }

function bar(count) {
  return '<div class="cart-bar">' +
           '<h2>Your Cart (' + count + ')</h2>' +
           '<button class="clear-btn" data-act="clear">Clear Cart</button>' +
         '</div>';
}

function render() {
  const cart = getCart();

  if (cart.length === 0) {
    content.innerHTML = bar(0) +
      '<p class="empty">Aapka cart khali hai. Catalogue se books add karo.</p>';
    return;
  }

  let total = 0;
  let rows = "";

  cart.forEach(function (c) {
    const amount = c.price * c.qty;
    total += amount;

    rows +=
      '<div class="list-row">' +
        '<div class="cell k-cover"><img src="' + (c.img || "") + '" alt="' + c.title + '"></div>' +
        '<div class="cell k-details">Book: ' + c.title +
          '<br>Author: ' + (c.author || "-") +
          '<br>Publication: ' + (c.publication || "-") + '</div>' +
        '<div class="cell k-qty">' +
          '<button class="qty-btn" data-act="dec" data-id="' + c.id + '">-</button>' + c.qty +
          '<button class="qty-btn" data-act="inc" data-id="' + c.id + '">+</button>' +
        '</div>' +
        '<div class="cell k-price">$' + c.price + '</div>' +
        '<div class="cell k-amount">$' + amount.toFixed(2) + '</div>' +
        '<div class="cell k-act"><button class="remove-btn" data-act="del" data-id="' + c.id + '">Remove</button></div>' +
      '</div>';
  });

  content.innerHTML = bar(cart.length) +
    '<div class="list grid">' + rows +
      '<div class="list-row total-row">' +
        '<div class="cell t-label">Total</div>' +
        '<div class="cell t-amount">$' + total.toFixed(2) + '</div>' +
        '<div class="cell t-gap"></div>' +
      '</div>' +
    '</div>';
}

content.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  let cart = getCart();
  const id = Number(btn.dataset.id);
  const item = cart.find(c => c.id === id);

  if (btn.dataset.act === "inc" && item) item.qty += 1;
  if (btn.dataset.act === "dec" && item) item.qty -= 1;
  if (btn.dataset.act === "del") cart = cart.filter(c => c.id !== id);
  if (btn.dataset.act === "clear") cart = [];

  saveCart(cart.filter(c => c.qty > 0));
  render();
});

render();