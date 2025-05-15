document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const detailCard = document.getElementById("detailCard");
  const cardName = document.getElementById("cardName");

  if (cardContainer) {
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => renderCards(data));

    searchForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value;
      fetch('/api/cards?search=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => renderCards(data));
    });
  }

  if (detailCard) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); 
    fetch('/api/cards/' + id)
      .then(res => res.json())
      .then(card => {
        if (card) {
          cardName.textContent = "Профиль: " + card.name;
          detailCard.innerHTML = `
            <img src="${card.image}" alt="img">
            <h2>${card.name}</h2>
            <p>${card.description}</p>
          `;
        } else {
          detailCard.innerHTML = "<p>Карточка не найдена</p>";
        }
      });
  }

  function renderCards(cards) {
    cardContainer.innerHTML = "";
    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${card.image}" alt="img">
        <h3>${card.name}</h3>
        <p>${card.description}</p>
        <a href="/detail.html?id=${card.id}">Подробнее</a>
        <form method="post" action="/delete/${card.id}">
          <button type="submit">🗑 Удалить</button>
        </form>
      `;
      cardContainer.appendChild(div);
    });
  }
});
