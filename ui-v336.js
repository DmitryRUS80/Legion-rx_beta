/* Legion RX v3.3.6 — Concept UI layer. Functional logic stays in app.js. */
(() => {
  'use strict';

  const SVG = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.2 12 3l9 8.2v9.3a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v3.5c0 3-1.7 5.4-4 5.4S8 10.5 8 7.5zM8 6H4v1.2c0 2.6 1.7 4.4 4.5 4.8M16 6h4v1.2c0 2.6-1.7 4.4-4.5 4.8M12 13v4m-4 3h8m-6-3h4"/></svg>',
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4m0 1h11l-2 3 2 3H5"/></svg>',
    qualify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V6m0 1c4-3 7 3 11 0v7c-4 3-7-3-11 0M16 5l2-2m-1 5h3"/></svg>',
    finals: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v3.5c0 3-1.7 5.4-4 5.4S8 10.5 8 7.5zM8 6H4v1c0 2.7 1.7 4.5 4.5 4.9M16 6h4v1c0 2.7-1.7 4.5-4.5 4.9M12 13v4m-4 3h8"/></svg>',
    results: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5zM8 9h8M8 13h8M8 17h5"/></svg>',
    pilots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6M4 9.5c-1.3.7-2 1.8-2 3.5s.7 2.8 2 3.5M20 9.5c1.3.7 2 1.8 2 3.5s-.7 2.8-2 3.5"/></svg>',
    archive: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v14H4zM3 3h18v4H3zM9 11h6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
    camera: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h4l1.3-2h5.4L16 7h4v12H4z"/><circle cx="12" cy="13" r="3.4"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="1.5"/><circle cx="9" cy="9" r="1.7"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3m-8 0 1 14h8l1-14M10 11v6m4-6v6"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 20h16"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.4 2c-.8.5-1.2 1-1.2 2M12 17h.01"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>'
  };

  const iconForRoute = (el) => {
    const route = el.dataset.route;
    const scroll = el.dataset.scroll || '';
    if (route === 'home') return 'home';
    if (route === 'championships') return 'trophy';
    if (route === 'pilots') return 'pilots';
    if (route === 'archive') return 'archive';
    if (route === 'settings') return 'settings';
    if (route === 'help') return 'help';
    if (scroll.includes('qualifying')) return 'qualify';
    if (scroll.includes('finals')) return 'finals';
    if (scroll.includes('protocol')) return 'results';
    if (route === 'race') return 'flag';
    return null;
  };

  function setIcon(el, key) {
    if (!el || !SVG[key]) return;
    el.innerHTML = SVG[key];
    el.classList.add('rxLineIcon');
  }

  function installIconSystem() {
    document.querySelectorAll('.menuCard').forEach(card => {
      const holder = card.querySelector('.menuIcon');
      const key = iconForRoute(card);
      if (holder && key) setIcon(holder, key);
      const arrow = card.querySelector('i');
      if (arrow) { arrow.innerHTML = SVG.chevron; arrow.classList.add('rxChevron'); }
    });

    document.querySelectorAll('.navItem').forEach(item => {
      const holder = item.querySelector(':scope > span');
      const key = iconForRoute(item);
      if (holder && key) setIcon(holder, key);
    });

    const homeIcon = document.querySelector('.homeButton > span');
    if (homeIcon) setIcon(homeIcon, 'home');

    const buttonIcons = [
      ['#takePilotPhoto', 'camera'], ['#uploadPilotPhoto', 'image'],
      ['#editTakePilotPhoto', 'camera'], ['#editUploadPilotPhoto', 'image'],
      ['#exportRace', 'download'], ['#showInstallInfo', 'help']
    ];
    buttonIcons.forEach(([selector, icon]) => {
      const btn = document.querySelector(selector);
      if (!btn || btn.querySelector('.buttonSvg')) return;
      btn.innerHTML = `<span class="buttonSvg">${SVG[icon]}</span><span>${btn.textContent.replace(/^[^\p{L}\p{N}]+/u, '').trim()}</span>`;
    });

    document.querySelectorAll('.settingsCard').forEach(card => {
      const holder = card.querySelector(':scope > span');
      if (!holder) return;
      const text = card.textContent.toLowerCase();
      let icon = text.includes('язык') || text.includes('language') ? 'globe' :
        text.includes('экспорт') || text.includes('export') ? 'download' :
        text.includes('отмен') || text.includes('cancel') ? 'trash' :
        text.includes('руковод') || text.includes('guide') ? 'help' : 'settings';
      setIcon(holder, icon);
    });
  }

  function addPageTransitions() {
    const screens = document.querySelectorAll('.appScreen');
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.attributeName !== 'class') return;
        const el = record.target;
        if (!el.classList.contains('hidden')) {
          el.classList.remove('rxScreenEnter');
          void el.offsetWidth;
          el.classList.add('rxScreenEnter');
        }
      });
    });
    screens.forEach(screen => observer.observe(screen, { attributes: true }));
  }

  function decorateHome() {
    const heading = document.querySelector('#homeView .sectionHeading span');
    if (heading) heading.textContent = 'RACE CONTROL';
    const title = document.querySelector('#homeView .sectionHeading h2');
    if (title) title.textContent = document.documentElement.lang === 'en' ? 'Control panel' : 'Панель управления';
  }

  function addCompactModeToggle() {
    const top = document.querySelector('.topBar');
    if (!top || document.querySelector('#rxDensityToggle')) return;
    const button = document.createElement('button');
    button.id = 'rxDensityToggle';
    button.className = 'rxDensityToggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Компактный режим');
    button.innerHTML = '<span></span><span></span><span></span>';
    button.addEventListener('click', () => {
      document.body.classList.toggle('rxCompact');
      try { localStorage.setItem('legionRxCompact', document.body.classList.contains('rxCompact') ? '1' : '0'); } catch (_) {}
    });
    if (localStorage.getItem('legionRxCompact') === '1') document.body.classList.add('rxCompact');
    top.appendChild(button);
  }

  function init() {
    document.body.classList.add('rxConceptUI');
    installIconSystem();
    addPageTransitions();
    decorateHome();
    addCompactModeToggle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
