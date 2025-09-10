

// (function () {
//   // STEP 1: Get the config from the global variable
//   const config = window.REMOTE_CONFIG;

//   if (!config) {
//     console.error('REMOTE_CONFIG not found.');
//     return;
//   }

//   const pageSlug = document.body.getAttribute('data-page') || 'home';
//   const { global, pages, shared_sections } = config;

//   renderHeader(global.header);

//   const pageSections = pages[pageSlug]?.sections || [];
//   pageSections.forEach(section => renderSection(section, shared_sections));

//   renderFooter(global.footer);
// })();

// ==============================
// Section Rendering Functions
// ==============================


// (async function () {
//   const pageSlug = document.body.getAttribute('data-page') || 'home';

//   // const configUrl = '...';  // Remove this fetch line
//   // const config = await fetch(configUrl).then(res => res.json());

//   const config = window.REMOTE_CONFIG; // Use injected config directly
//   const { global, pages, shared_sections } = config;

//   renderHeader(global.header);

//   const pageSections = pages[pageSlug]?.sections || [];
//   pageSections.forEach(section => renderSection(section, shared_sections));

//   renderFooter(global.footer);
// })();

(function () {
    const pageSlug = document.body.getAttribute('data-page') || 'home';
    const config = window.REMOTE_CONFIG;

    if (!config) {
        console.error('REMOTE_CONFIG is not defined');
        return;
    }

    const { global, pages, shared_sections } = config;

    renderHeader(global.header);
    const sections = pages[pageSlug]?.sections || [];

    sections.forEach(section => renderSection(section, shared_sections));
    renderFooter(global.footer);
})();
function renderHeader(header) {
  const headerEl = document.createElement('header');
  headerEl.className = 'site-header';

  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = header.logo;
  logo.alt = 'Logo';

  const nav = document.createElement('nav');
  header.menu.forEach(item => {
    const a = document.createElement('a');
    a.href = item.link;
    a.textContent = item.label;
    nav.appendChild(a);
  });

  const cta = document.createElement('a');
  cta.href = header.cta_button.link;
  cta.textContent = header.cta_button.label;
  cta.className = 'button';

  headerEl.appendChild(logo);
  headerEl.appendChild(nav);
  headerEl.appendChild(cta);
  document.body.prepend(headerEl);
}

function renderSection(section, shared) {
  const el = document.createElement('section');
  el.className = 'section-' + section.type;

  switch (section.type) {
    case 'hero':
      const hero = shared.hero || section;
      el.style.backgroundImage = `url(${hero.background})`;
      el.innerHTML = `
        <h1>${hero.title}</h1>
        <p>${hero.subtitle}</p>
        <a class="button" href="${hero.button.link}">${hero.button.label}</a>
      `;
      break;

    case 'about':
    case 'content':
      el.innerHTML = `
        <div class="section-content">
          <h2>${section.title}</h2>
          <p>${section.content}</p>
        </div>
      `;
      break;

    case 'testimonials':
      const testimonials = shared.testimonials || [];
      el.innerHTML = testimonials.map(t => `
        <div class="testimonial">
          <blockquote>"${t.quote}"</blockquote>
          <p>- ${t.author}</p>
        </div>
      `).join('');
      break;

    case 'cta':
      el.innerHTML = `
        <h2>${section.text}</h2>
        <a class="button" href="${section.button.link}">${section.button.label}</a>
      `;
      break;

    case 'projects_list':
      el.classList.add('projects-grid');
      el.innerHTML = section.items.map(p => `
        <div class="project-item">
          <img src="${p.image}" alt="${p.title}">
          <h3>${p.title}</h3>
        </div>
      `).join('');
      break;

    case 'contact_form':
      el.innerHTML = `
        <div class="section-content">
          <h2>${section.title}</h2>
          <p>${section.description}</p>
          <form>
            <input type="text" placeholder="Name" required><br><br>
            <input type="email" placeholder="Email" required><br><br>
            <textarea placeholder="Message" required></textarea><br><br>
            <button type="submit">Send</button>
          </form>
        </div>
      `;
      break;
  }

  document.body.appendChild(el);
}

function renderFooter(footer) {
  const footerEl = document.createElement('footer');
  footerEl.className = 'site-footer';

    (function () {
  console.log('--- inject.php running ---');

  var css = document.createElement('link');
  // ...
  document.head.appendChild(css);
  console.log('Injected CSS');

  window.REMOTE_CONFIG = { /*...*/ };
  console.log('REMOTE_CONFIG:', window.REMOTE_CONFIG);

  var js = document.createElement('script');
  js.src = '.../script.js';
  document.body.appendChild(js);
  console.log('Injected script.js');
})();


  const links = footer.links.map(link => `<a href="${link.link}">${link.label}</a>`).join('');
  footerEl.innerHTML = `<p>${footer.text}</p><p>${links}</p>`;

  document.body.appendChild(footerEl);
}
