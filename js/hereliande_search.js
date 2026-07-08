const searchInput = document.querySelector('#searchInput');
const groups = [...document.querySelectorAll('.group')];
const rows = [...document.querySelectorAll('tbody tr')];
const visibleCount = document.querySelector('#visibleCount');

function updateCount() {
  const visibleRows = rows.filter(row => !row.classList.contains('hidden')).length;
  visibleCount.textContent = `${visibleRows} entrée${visibleRows > 1 ? 's' : ''}`;
}

function filterLexicon() {
  const query = searchInput.value.trim().toLowerCase();

  groups.forEach(group => {
	const category = group.dataset.category.toLowerCase();
	const groupRows = [...group.querySelectorAll('tbody tr')];
	let hasVisibleRow = false;

	groupRows.forEach(row => {
	  const text = `${category} ${row.textContent}`.toLowerCase();
	  const isMatch = !query || text.includes(query);
	  row.classList.toggle('hidden', !isMatch);
	  if (isMatch) hasVisibleRow = true;
	});

	group.classList.toggle('hidden', !hasVisibleRow);
  });

  updateCount();
}

searchInput.addEventListener('input', filterLexicon);
updateCount();