document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const detailCard = document.getElementById("detailCard");
  const cardName = document.getElementById("cardName");

  if (cardContainer) {
    loadCards();

    searchForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value;
      fetch(`http://localhost:4000/api/posts?search=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => renderCards(data));
    });
  }

if (detailCard) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  fetch(`http://localhost:4000/api/posts/${id}`)
    .then(res => res.json())
    .then(card => {
      if (card) {
        cardName.textContent = "Профиль: " + card.author;
        detailCard.innerHTML = `
          <img src="http://localhost:4000/${card.image}" alt="img">
          <h2>${card.author}</h2>
          <p>${card.caption}</p>
        `;
      } else {
        detailCard.innerHTML = "<p>Карточка не найдена</p>";
      }
    });
}


  function loadCards() {
    fetch("http://localhost:4000/api/posts")
      .then(res => res.json())
      .then(data => renderCards(data));
  }

    function renderCards(cards) {
      cardContainer.innerHTML = "";
      cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <img src="http://localhost:4000/${card.image}" alt="img">
          <h3>${card.author}</h3>
          <p>${card.caption}</p>
          <button onclick="editCard(${card.id})">✏ Редактировать</button>
          <a href="/detail.html?id=${card.id}">Подробнее</a>
          <button onclick="deleteCard(${card.id})">🗑 Удалить</button>
        `;
        cardContainer.appendChild(div);
      });
    }
window.editCard = function(id) {
  window.location.href = `/edit.html?id=${id}`;
}

  window.deleteCard = function(id) {
    fetch(`http://localhost:4000/api/posts/${id}`, {
      method: "DELETE"
    })
    .then(() => loadCards());
  }
});
