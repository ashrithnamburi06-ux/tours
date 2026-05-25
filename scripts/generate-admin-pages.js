const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '..', 'admin');

const NAV = [
  { href: 'index.html', label: 'Dashboard', icon: 'bi-grid' },
  { href: 'packages.html', label: 'Packages', icon: 'bi-box-seam' },
  { href: 'destinations.html', label: 'Destinations', icon: 'bi-geo-alt' },
  { href: 'categories.html', label: 'Categories', icon: 'bi-tags' },
  { href: 'inspirations.html', label: 'Inspirations', icon: 'bi-lightbulb' },
  { href: 'guiders.html', label: 'Guiders', icon: 'bi-people' },
  { href: 'faq.html', label: 'FAQ', icon: 'bi-question-circle' },
  { href: 'testimonials.html', label: 'Testimonials', icon: 'bi-chat-quote' },
  { href: 'gallery.html', label: 'Gallery', icon: 'bi-images' },
];

const MODULES = [
  { key: 'packages', title: 'Packages', list: 'packages.html', form: 'packages-form.html' },
  { key: 'destinations', title: 'Destinations', list: 'destinations.html', form: 'destinations-form.html' },
  { key: 'categories', title: 'Categories', list: 'categories.html', form: 'categories-form.html' },
  { key: 'inspirations', title: 'Inspirations', list: 'inspirations.html', form: 'inspirations-form.html' },
  { key: 'guiders', title: 'Guiders', list: 'guiders.html', form: 'guiders-form.html' },
  { key: 'faqs', title: 'FAQ', list: 'faq.html', form: 'faq-form.html' },
  { key: 'testimonials', title: 'Testimonials', list: 'testimonials.html', form: 'testimonials-form.html' },
  { key: 'gallery', title: 'Gallery', list: 'gallery.html', form: 'gallery-form.html' },
];

function head(title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="../css/bootstrap.min.css" rel="stylesheet">
  <link href="../css/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="css/admin.css">
  <title>${title} — GoFly Admin</title>
  <link rel="icon" href="../images/fav-icon.svg" type="image/svg+xml">
</head>`;
}

function sidebar() {
  const links = NAV.map(
    (n) =>
      `<li><a href="${n.href}"><i class="bi ${n.icon}"></i> ${n.label}</a></li>`
  ).join('\n          ');
  return `<aside class="admin-sidebar">
      <div class="brand">
        <a href="index.html">GoFly Admin</a>
        <span>Content Management</span>
      </div>
      <ul class="admin-nav" id="admin-nav">
          ${links}
      </ul>
    </aside>`;
}

function scripts() {
  return `<script src="js/admin-mock-data.js"></script>
  <script src="js/admin-auth.js"></script>
  <script src="js/admin-api.js"></script>
  <script src="js/admin-modules.js"></script>`;
}

function topbarUser() {
  return `<div class="d-flex align-items-center gap-3">
          <span class="text-muted small">Signed in as <strong id="admin-user-name">Guest</strong></span>
          <a href="../login.html" class="btn btn-sm btn-outline-secondary">Login</a>
          <button type="button" class="btn btn-sm btn-outline-danger" id="admin-logout-btn">Logout</button>
        </div>`;
}

function shell(bodyAttrs, title, inner) {
  return `${head(title)}
${bodyAttrs}>
  <div class="admin-wrapper">
    ${sidebar()}
    <main class="admin-main">
      ${inner}
    </main>
  </div>
  ${scripts()}
</body>
</html>
`;
}

function dashboard() {
  return shell(
    '<body class="admin-body" data-page="dashboard"',
    'Dashboard',
    `<div class="admin-topbar">
        <h1>Dashboard</h1>
        ${topbarUser()}
      </div>
      <p class="text-muted mb-4">Overview of CMS modules. Data loads from API with mock fallback.</p>
      <div class="admin-stats" id="admin-stats-grid">
        <div class="admin-stat"><p class="text-muted">Loading stats…</p></div>
      </div>`
  );
}

function listPage(m) {
  return shell(
    `<body class="admin-body" data-module="${m.key}" data-page="list"`,
    m.title,
    `<div class="admin-topbar">
        <h1>${m.title}</h1>
        <div class="d-flex flex-wrap align-items-center gap-2">
          <a href="${m.form}" class="primary-btn1" style="padding:10px 20px;font-size:14px;"><span>Add New</span></a>
          ${topbarUser()}
        </div>
      </div>
      <div class="admin-card">
        <div class="admin-table-wrap" id="admin-table-wrap">
          <p class="text-muted">Loading…</p>
        </div>
      </div>`
  );
}

function formPage(m) {
  return shell(
    `<body class="admin-body" data-module="${m.key}" data-page="form"`,
    `Edit ${m.title}`,
    `<div class="admin-topbar">
        <h1 id="admin-form-title">Add ${m.title.replace(/s$/, '')}</h1>
        <div class="d-flex flex-wrap align-items-center gap-2">
          <a href="${m.list}" class="btn btn-outline-secondary btn-sm">← Back to list</a>
          ${topbarUser()}
        </div>
      </div>
      <div class="admin-card">
        <form id="admin-form" class="admin-form">
          <div class="row" id="admin-form-fields"></div>
          <div class="mt-4">
            <button type="submit" class="primary-btn1" style="padding:12px 28px;"><span>Save</span></button>
            <a href="${m.list}" class="btn btn-link ms-2">Cancel</a>
          </div>
        </form>
      </div>`
  );
}

fs.writeFileSync(path.join(adminDir, 'index.html'), dashboard());
MODULES.forEach((m) => {
  fs.writeFileSync(path.join(adminDir, m.list), listPage(m));
  fs.writeFileSync(path.join(adminDir, m.form), formPage(m));
});

console.log('Generated', 1 + MODULES.length * 2, 'admin HTML files.');
