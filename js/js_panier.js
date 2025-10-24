// --- Recalcul du total ---
function updateTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('input[type="number"]').value);
    total += price * quantity;
  });
  document.getElementById('total').textContent = `Total : ${total}€`;
}

// --- Suppression d’un produit ---
function removeItem(event) {
  const item = event.target.closest('.cart-item');
  item.remove();
  updateTotal();
}

// --- Ajout d’un produit ---
function addProduct() {
  const name = document.getElementById('new-name').value.trim();
  const price = parseFloat(document.getElementById('new-price').value);
  const quantity = parseInt(document.getElementById('new-quantity').value);

  if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
    alert("Veuillez entrer un nom, un prix et une quantité valides.");
    return;
  }

  // Création du nouvel élément
  const newItem = document.createElement('div');
  newItem.classList.add('cart-item');
  newItem.dataset.price = price;

  newItem.innerHTML = `
    <div class="item-details">
      <h2>${name}</h2>
      <label>Quantité :</label>
      <input type="number" value="${quantity}" min="1">
      <p>Prix unitaire : ${price}€</p>
      <button class="remove-btn">Supprimer</button>
      <img src="produit_par_defaut.jpg" alt="${name}">
    </div>
  `;

  // Ajout au panier
  document.querySelector('.cart-items').appendChild(newItem);

  // Écouteurs sur le nouvel élément
  newItem.querySelector('input[type="number"]').addEventListener('change', updateTotal);
  newItem.querySelector('.remove-btn').addEventListener('click', removeItem);

  // Réinitialisation des champs
  document.getElementById('new-name').value = '';
  document.getElementById('new-price').value = '';
  document.getElementById('new-quantity').value = 1;

  updateTotal();
}

// --- Initialisation ---
document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
  input.addEventListener('change', updateTotal);
});

document.querySelectorAll('.remove-btn').forEach(button => {
  button.addEventListener('click', removeItem);
});

document.getElementById('add-btn').addEventListener('click', addProduct);

// --- Premier calcul ---
updateTotal();
