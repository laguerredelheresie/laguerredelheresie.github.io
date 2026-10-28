/* --------------------------------------------------------------------------
   Lexiques des Livres 1 à 4 - Recherche et filtrage des définitions
   -------------------------------------------------------------------------- */
(() => {
    'use strict';

    const input = document.getElementById('lex-search-input');
    const clear = document.getElementById('lex-clear');
    const count = document.getElementById('lex-count');
    const empty = document.getElementById('lex-empty');
    const chapters = [...document.querySelectorAll('.lex-chapter')];
    const total = document.querySelectorAll('.lex-entry').length;

    const normalize = text => text.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('fr')
        .replace(/[’']/g, "'");

    function filter() {
        const query = normalize(input.value.trim());
        let visible = 0;

        chapters.forEach(chapter => {
            let matches = 0;

            chapter.querySelectorAll('.lex-entry').forEach(entry => {
                const show = !query || normalize(entry.querySelector('dt').textContent.trim()).includes(query);
                entry.hidden = !show;

                if (show) {
                    visible++;
                    matches++;
                }
            });

            chapter.hidden = matches === 0;
            const link = document.querySelector(`.lex-alphabet a[href="#${chapter.id}"]`);

            if (link) {
                link.hidden = matches === 0;
            }
        });

        // Masquer aussi les lettres sans définition pendant une recherche.
        // Elles réapparaissent lorsque le champ est vidé.
        document.querySelectorAll('.lex-alphabet .lex-letter-disabled').forEach(letter => {
            letter.hidden = Boolean(query);
        });

        count.textContent = `${visible} définition${visible > 1 ? 's' : ''} affichée${visible > 1 ? 's' : ''} sur ${total}`;
        empty.hidden = visible !== 0;
    }

    input.addEventListener('input', filter);
    clear.addEventListener('click', () => {
        input.value = '';
        filter();
        input.focus();
    });

    filter();
})();
