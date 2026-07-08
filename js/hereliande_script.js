document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const showAllButtons = Array.from(document.querySelectorAll("#showAllLexicon, #showAllLexiconBottom"));
  const groups = Array.from(document.querySelectorAll(".lexicon .group"));

  let showAll = false;

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getRows() {
    return Array.from(document.querySelectorAll(".lexicon tbody tr"));
  }


  function resetRows() {
    getRows().forEach((row) => {
      row.classList.remove("hidden");
    });
  }

  function showOnlyFirstGroup() {
    groups.forEach((group, index) => {
      group.classList.toggle("hidden", index !== 0);
    });

    resetRows();
  }

  function showEveryGroup() {
    groups.forEach((group) => {
      group.classList.remove("hidden");
    });

    resetRows();
  }

  function filterLexicon() {
    const query = normalizeText(searchInput.value.trim());

    if (!query) {
      if (showAll) {
        showEveryGroup();
      } else {
        showOnlyFirstGroup();
      }

      return;
    }

    groups.forEach((group) => {
      const category = normalizeText(group.dataset.category || "");
      const rows = Array.from(group.querySelectorAll("tbody tr"));

      let groupHasVisibleRows = false;

      rows.forEach((row) => {
        const rowText = normalizeText(`${category} ${row.textContent}`);
        const rowMatches = rowText.includes(query);

        row.classList.toggle("hidden", !rowMatches);

        if (rowMatches) {
          groupHasVisibleRows = true;
        }
      });

      group.classList.toggle("hidden", !groupHasVisibleRows);
    });
  }

  function updateShowAllButtons() {
		  showAllButtons.forEach((button) => {
			button.classList.toggle("is-active", showAll);
			button.textContent = showAll ? "Réduire" : "Tout afficher";
		  });
		}

		showAllButtons.forEach((button) => {
		  button.addEventListener("click", () => {
			showAll = !showAll;
			updateShowAllButtons();
			filterLexicon();
		  });
		});
  searchInput.addEventListener("input", filterLexicon);

  updateShowAllButtons();
  showOnlyFirstGroup();
});