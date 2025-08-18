// Створіть файл docs/javascripts/mermaid-config.js

document$.subscribe(() => {
  mermaid.initialize({
    startOnLoad: true,
    theme:
      document.body.getAttribute("data-md-color-scheme") === "slate"
        ? "dark"
        : "default",
    themeVariables: {
      fontFamily: "var(--md-text-font-family)",
    },
    flowchart: {
      htmlLabels: true,
    },
    sequence: {
      diagramMarginX: 8,
      diagramMarginY: 8,
      boxTextMargin: 4,
      noteMargin: 8,
      messageMargin: 8,
    },
    gantt: {
      leftPadding: 75,
      bottomPadding: 20,
    },
  });

  // Автоматичне перемикання теми Mermaid при зміні теми сайту
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-md-color-scheme") {
        const scheme = document.body.getAttribute("data-md-color-scheme");
        mermaid.initialize({
          theme: scheme === "slate" ? "dark" : "default",
        });
        // Перерендерити всі діаграми
        const diagrams = document.querySelectorAll(".mermaid");
        diagrams.forEach((diagram) => {
          diagram.removeAttribute("data-processed");
        });
        mermaid.init();
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-md-color-scheme"],
  });
});
