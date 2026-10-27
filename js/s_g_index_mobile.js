/* V13: comportement mobile uniquement. Le lexique original reste intact. */
(function () {
  const mobile = window.matchMedia('(max-width: 600px)');
  function init() {
    const input = document.getElementById('searchInput');
    const container = document.getElementById('lexiconGroups');
    const firstPanel = document.querySelector('body.grimoire-index > article > .core:first-of-type');
    const vernissage = firstPanel && firstPanel.querySelector(':scope > .vernissage-feature');
    const article = firstPanel && firstPanel.parentElement;
    if (!input || !container || !firstPanel || !article || !vernissage) return;
    const groups = Array.from(container.querySelectorAll(':scope > .group'));
    const rows = new Map(groups.map(group => [group, Array.from(group.querySelectorAll('tbody tr'))]));
    const normalize = value => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    let showAll = false;
    function apply() {
      if (!mobile.matches) return;
      const query = normalize(input.value);
      const active = Boolean(query) || showAll;
      container.classList.toggle('mobile-search-active', active);
      container.classList.toggle('mobile-lexicon-idle', !active);
      groups.forEach(group => {
        const category = normalize(group.dataset.category || group.querySelector('.group-title')?.textContent);
        let count = 0;
        rows.get(group).forEach(row => {
          const match = !query || category.includes(query) || normalize(row.textContent).includes(query);
          row.hidden = !match;
          row.style.setProperty('display', match ? 'table-row' : 'none', 'important');
          if (match) count++;
        });
        const visible = (active && count > 0) || (!active && group === groups[0]);
        group.hidden = !visible;
        group.style.setProperty('display', visible ? 'block' : 'none', 'important');
        const wrap = group.querySelector('.table-wrap');
        if (wrap) {
          wrap.hidden = !visible;
          wrap.style.setProperty('display', visible ? 'block' : 'none', 'important');
          if (visible) {
            wrap.style.setProperty('height', 'auto', 'important');
            wrap.style.setProperty('max-height', 'none', 'important');
          }
        }
      });
    }
    function layout() {
      if (mobile.matches) {
        if (vernissage.parentElement !== article) article.insertBefore(vernissage, firstPanel);
        apply();
      } else {
        if (vernissage.parentElement !== firstPanel) firstPanel.insertBefore(vernissage, firstPanel.firstElementChild);
        container.classList.remove('mobile-search-active', 'mobile-lexicon-idle');
        groups.forEach(group => {
          group.hidden = false;
          group.style.removeProperty('display');
          rows.get(group).forEach(row => { row.hidden = false; row.style.removeProperty('display'); });
          const wrap = group.querySelector('.table-wrap');
          if (wrap) {
            wrap.hidden = false;
            ['display', 'height', 'max-height'].forEach(p => wrap.style.removeProperty(p));
          }
        });
      }
    }
    ['input', 'search', 'change', 'keyup'].forEach(type => {
      window.addEventListener(type, event => {
        if (!mobile.matches || event.target !== input) return;
        event.stopImmediatePropagation();
        showAll = false;
        apply();
      }, true);
    });
    ['showAllLexicon', 'showAllLexiconBottom'].forEach(id => {
      const button = document.getElementById(id);
      if (button) button.addEventListener('click', event => {
        if (!mobile.matches) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        input.value = '';
        showAll = true;
        apply();
      }, true);
    });
    mobile.addEventListener?.('change', layout);
    layout();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

