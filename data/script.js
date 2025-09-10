(async function () {
  const pageSlug = document.body.getAttribute('data-page') || 'home';

  const configUrl = 'https://raw.githubusercontent.com/vineettiwari1708/remote-theme-api-server/v1.2/data/config.json';
  const config = await fetch(configUrl).then(res => res.json());
  const { global, pages, shared_sections } = config;

  renderHeader(global.header);

  const pageSections = pages[pageSlug]?.sections || [];
  pageSections.forEach(section => renderSection(section, shared_sections));

  renderFooter(global.footer);
})();

function renderHeader(header) {
  const headerEl = document.createElement('header');
  headerEl.className = 'site-header';

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.textContent = 'LOGO'; // or use image

  const nav = document.createElement('nav');
  header.menu.forEach(item => {
    const a = document.createElement('a');
    a.href = item.link;
    a.textContent = item.label;
    nav.appendChild(a);
  });

  headerEl.appendChild(logo);
  headerEl.appendChild(nav);
  document.body.prepend(headerEl);
}

function renderSection(section, shared) {
  let el = document.createElement('section');
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
      const testimonials = shared.testimonials;
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
      el.className += ' projects-grid';
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

  const links = footer.links.map(link => `<a href="${link.link}">${link.label}</a>`).join('');
  footerEl.innerHTML = `<p>${footer.text}</p><p>${links}</p>`;

  document.body.appendChild(footerEl);
}
