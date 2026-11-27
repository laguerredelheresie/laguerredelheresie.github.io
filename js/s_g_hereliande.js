/* Search the Héréliande dictionary in both languages. */
(() => {
    const input = document.getElementById('lex-search-input');
    const clear = document.getElementById('lex-clear');
    const count = document.getElementById('lex-count');
    const groups = [...document.querySelectorAll('#lexique .her-group')];
    const normalize = text => text.toLocaleLowerCase('fr').normalize('NFD').replace(/\p{M}/gu, '').replace(/[‘’]/g, "'").replace(/œ/g, 'oe').replace(/æ/g, 'ae').trim();
    const data = groups.map(group => ({
        group,
        rows: [...group.querySelectorAll('tbody tr')].map(row => ({
            row,
            text: normalize([...row.cells].map(cell => cell.textContent).join(' ') + ' ' + group.dataset.category)
        }))
    }));
    const size = data.reduce((total, item) => total + item.rows.length, 0);

    function filter() {
        const query = normalize(input.value);
        let total = 0;
        for (const { group, rows } of data) {
            let matches = 0;
            for (const { row, text } of rows) {
                const match = query.split(/\s+/).every(part => text.includes(part));
                row.hidden = !match;
                if (match) matches++;
            }
            group.hidden = matches === 0;
            group.querySelector('.her-badge').textContent = matches + (matches === 1 ? ' entrée' : ' entrées');
            total += matches;
        }
        count.textContent = total + ' / ' + size + ' entrées affichées';
        document.getElementById('her-empty').hidden = total !== 0;
    }

    input.addEventListener('input', filter);
    clear.addEventListener('click', () => {
        input.value = '';
        filter();
        input.focus();
    });
    filter();
})();
