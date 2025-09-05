/**
 * Збільшення Mermaid діаграм при кліку
 */
document.addEventListener("DOMContentLoaded", function () {
  // Додаємо обробники кліків на всі Mermaid діаграми
  document.querySelectorAll(".mermaid").forEach(function (diagram) {
    diagram.style.cursor = "pointer";
    diagram.title = "Клікніть для збільшення";

    diagram.addEventListener("click", function () {
      openModal(this);
    });
  });

  function openModal(diagram) {
    // Створюємо модальне вікно
    const modal = document.createElement("div");
    modal.className = "mermaid-modal";
    modal.innerHTML = `
            <div class="mermaid-modal-content">
                <span class="mermaid-modal-close">&times;</span>
                <div class="mermaid-modal-diagram">
                    ${diagram.innerHTML}
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Закриття модального вікна
    const closeBtn = modal.querySelector(".mermaid-modal-close");
    closeBtn.onclick = () => modal.remove();

    // Закриття при кліку поза діаграмою
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };

    // Закриття клавішею Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") modal.remove();
    });
  }
});
