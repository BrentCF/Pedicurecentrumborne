/* @ds-bundle: {"format":3,"namespace":"FlootDesignSystem_019e21","components":[],"sourceHashes":{"ui_kits/floot/App.jsx":"2da046d6d3bf","ui_kits/floot/components/Atoms.jsx":"3c1afcb3dc95","ui_kits/floot/components/Sidebar.jsx":"6379bf0cae06","ui_kits/floot/data.js":"f9b8cd870d0e","ui_kits/floot/screens/ProjectDetail.jsx":"d56d633a1253","ui_kits/floot/screens/ProjectsScreen.jsx":"1171d66fe0ca","ui_kits/floot/screens/TakenScreen.jsx":"d8efafe736d5","ui_kits/floot/screens/WerkbonScreen.jsx":"b44b24f269d6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FlootDesignSystem_019e21 = window.FlootDesignSystem_019e21 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/floot/App.jsx
try { (() => {
/* global React, ReactDOM, Sidebar, ProjectsScreen, ProjectDetail, TakenScreen, WerkbonScreen */
// App.jsx — tiny client-side router. Persists state to window.location.hash
// so refresh keeps you on the same screen (a common dev-iteration need).

const {
  useEffect: useEffectApp,
  useState: useStateApp
} = React;
function App() {
  // route shapes:
  //   { screen: 'taken' }
  //   { screen: 'projecten' }
  //   { screen: 'project', nr: 'B250744' }
  //   { screen: 'werkbon' }
  const [route, setRoute] = useStateApp(parseHash());
  useEffectApp(() => {
    function onHash() {
      setRoute(parseHash());
    }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  function go(next) {
    window.location.hash = encodeHash(next);
  }
  function navItem(key) {
    switch (key) {
      case 'taken':
        return go({
          screen: 'taken'
        });
      case 'projecten':
        return go({
          screen: 'projecten'
        });
      case 'werkbon':
        return go({
          screen: 'werkbon'
        });
      default:
        // Sections we did not recreate — keep the user where they are; show toast-ish hint via title attr.
        return go({
          screen: 'todo',
          key
        });
    }
  }
  let currentSidebarKey = route.screen === 'project' ? 'projecten' : route.screen;
  let body;
  switch (route.screen) {
    case 'taken':
      body = /*#__PURE__*/React.createElement(TakenScreen, null);
      break;
    case 'projecten':
      body = /*#__PURE__*/React.createElement(ProjectsScreen, {
        onOpenProject: p => go({
          screen: 'project',
          nr: p.nr
        })
      });
      break;
    case 'project':
      {
        const proj = window.FlootProjects.find(p => p.nr === route.nr) || window.FlootProjects[0];
        body = /*#__PURE__*/React.createElement(ProjectDetail, {
          project: proj,
          onBack: () => go({
            screen: 'projecten'
          })
        });
        break;
      }
    case 'werkbon':
      body = /*#__PURE__*/React.createElement(WerkbonScreen, null);
      break;
    case 'todo':
      body = /*#__PURE__*/React.createElement(NotRecreated, {
        label: route.key
      });
      break;
    default:
      body = /*#__PURE__*/React.createElement(TakenScreen, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    current: currentSidebarKey,
    onNav: navItem
  }), /*#__PURE__*/React.createElement("main", {
    className: "shell-content"
  }, body));
}
function NotRecreated({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Not recreated"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Niet gerecre\xEBerd")), /*#__PURE__*/React.createElement("div", {
    className: "page-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 32,
      color: 'var(--fg-3)',
      fontSize: 14,
      lineHeight: 1.6
    }
  }, "De sectie ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-2)'
    }
  }, label), " is niet onderdeel van de hi-fi recreatie in deze UI kit. Templates, stamdata, accounts en het interne design-systeem volgen dezelfde lay-out- en componentpatronen als Projecten en Taken \u2014 dezelfde tabel, paginering, knoppen en cards.")));
}
function parseHash() {
  const h = (window.location.hash || '').replace(/^#/, '');
  if (!h) return {
    screen: 'projecten'
  };
  const parts = h.split('/');
  if (parts[0] === 'project' && parts[1]) return {
    screen: 'project',
    nr: parts[1]
  };
  if (parts[0] === 'todo' && parts[1]) return {
    screen: 'todo',
    key: parts[1]
  };
  return {
    screen: parts[0]
  };
}
function encodeHash(r) {
  if (r.screen === 'project') return 'project/' + r.nr;
  if (r.screen === 'todo') return 'todo/' + r.key;
  return r.screen;
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/components/Atoms.jsx
try { (() => {
/* global React */
// Atoms.jsx — small reusable bits for the Floot UI kit.

const {
  useEffect,
  useRef
} = React;

// Lucide icon wrapper. Uses the global `lucide` namespace from CDN
// to create the SVG on mount. Falls back gracefully if not loaded yet.
function Icon({
  name,
  size,
  className,
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.5,
          width: size || 16,
          height: size || 16
        }
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(style || {})
    }
  });
}
function Button({
  variant,
  size,
  icon,
  children,
  onClick,
  disabled
}) {
  const klass = ['btn', `btn-${variant || 'primary'}`, size ? `btn-${size}` : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", {
    className: klass,
    onClick: onClick,
    disabled: disabled
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), children);
}
function Pill({
  fg,
  bg,
  dot,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      background: bg,
      color: fg
    }
  }, dot !== false && /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), children);
}
function StatusPill({
  status
}) {
  const m = window.FlootStatusMap[status];
  if (!m) return null;
  return /*#__PURE__*/React.createElement(Pill, {
    fg: m.fg,
    bg: m.bg
  }, m.label);
}
function TaskStatusPill({
  status
}) {
  const m = window.FlootTaskStatusMap[status];
  if (!m) return null;
  return /*#__PURE__*/React.createElement(Pill, {
    fg: m.fg,
    bg: m.bg
  }, m.label);
}
function SearchInput({
  value,
  onChange,
  placeholder,
  width
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "input-with-icon",
    style: {
      width: width || 280
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder || 'Zoeken...'
  }));
}
Object.assign(window, {
  Icon,
  Button,
  Pill,
  StatusPill,
  TaskStatusPill,
  SearchInput
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/components/Atoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/components/Sidebar.jsx
try { (() => {
/* global React, Icon */
// Sidebar.jsx — the fixed 96 px dark sidebar.

function Sidebar({
  current,
  onNav
}) {
  const item = (key, label, icon, opts = {}) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: 'sidebar-item' + (current === key ? ' active' : ''),
    onClick: () => onNav(key)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, label));
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar",
    "data-screen-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/floot-logo-dark.svg",
    alt: "floot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-search",
    title: "Snelzoeken"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10
    }
  }, "Zoek"), /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav"
  }, item('taken', 'Taken', 'check-square'), item('projecten', 'Projecten', 'layout-grid')), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section-label"
  }, "Extern", /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 10
  })), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav"
  }, item('werkbon', 'Werkbon', 'file-text')), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section-label"
  }, "Templates"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav"
  }, item('product', 'Product', 'package'), item('werk', 'Werk', 'wrench'), item('mat', 'Mat.', 'box')), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section-label"
  }, "Beheer"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav"
  }, item('stamdata', 'Stam', 'database'), item('accounts', 'Acc.', 'users'), item('design', 'Design', 'palette'), item('feedback', 'Feedb.', 'message-square')), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user",
    title: "Demo \xB7 demo@visschertraffic.nl"
  }, /*#__PURE__*/React.createElement("b", null, "Demo"), /*#__PURE__*/React.createElement("span", {
    className: "email"
  }, "demo@\u2026"), /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 10,
    className: "extlink"
  })));
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/components/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/data.js
try { (() => {
// Stubbed Dutch data for the Floot UI kit.
// Loaded via <script src> — exposes globals.

window.FlootProjects = [{
  nr: 'B250744',
  name: 'Den Haag Binckhorst',
  client: 'Gemeente Den Haag',
  start: '12-04-2026',
  end: '28-06-2026',
  status: 'in-progress'
}, {
  nr: 'B250692',
  name: 'N201 — fase 3',
  client: 'Provincie Noord-Holland',
  start: '03-05-2026',
  end: '17-05-2026',
  status: 'quote'
}, {
  nr: 'B250688',
  name: 'Rotterdam Centrum — Coolsingel',
  client: 'Stadsbeheer Rotterdam',
  start: '21-05-2026',
  end: '03-06-2026',
  status: 'to-calculate'
}, {
  nr: 'B250671',
  name: 'A12 Oost-omleiding',
  client: 'Rijkswaterstaat',
  start: '04-02-2026',
  end: '22-02-2026',
  status: 'completed'
}, {
  nr: 'B250664',
  name: 'Eindhoven Strijp-S',
  client: 'Gemeente Eindhoven',
  start: '15-03-2026',
  end: '02-08-2026',
  status: 'calc-definitive'
}, {
  nr: 'B250651',
  name: 'Utrecht Lombok herinrichting',
  client: 'Gemeente Utrecht',
  start: '08-06-2026',
  end: '30-09-2026',
  status: 'calculating'
}, {
  nr: 'B250640',
  name: 'A1 Apeldoorn brugwerk',
  client: 'Rijkswaterstaat',
  start: '01-04-2026',
  end: '15-04-2026',
  status: 'in-progress'
}, {
  nr: 'B250631',
  name: 'Almere Poort fietspad',
  client: 'Gemeente Almere',
  start: '12-01-2026',
  end: '20-01-2026',
  status: 'financial'
}, {
  nr: 'B250628',
  name: 'Den Bosch Vughterpoort',
  client: 'Gemeente \u2019s-Hertogenbosch',
  start: '06-05-2026',
  end: '02-06-2026',
  status: 'prep'
}, {
  nr: 'B250615',
  name: 'Leiden Stationsplein',
  client: 'Gemeente Leiden',
  start: '18-11-2025',
  end: '04-12-2025',
  status: 'expired'
}];
window.FlootStatusMap = {
  'prep': {
    label: 'In voorbereiding',
    fg: '#6B7280',
    bg: '#F3F4F6'
  },
  'to-calculate': {
    label: 'Te calculeren',
    fg: '#F97316',
    bg: '#FFF7ED'
  },
  'calculating': {
    label: 'In calculatie',
    fg: '#EAB308',
    bg: '#FEFCE8'
  },
  'calc-definitive': {
    label: 'Calculatie definitief',
    fg: '#14B8A6',
    bg: '#F0FDFA'
  },
  'quote': {
    label: 'Offerte verstuurd',
    fg: '#2663EB',
    bg: '#EFF6FF'
  },
  'in-progress': {
    label: 'In uitvoering',
    fg: '#8B5CF6',
    bg: '#F5F3FF'
  },
  'completed': {
    label: 'Gereed',
    fg: '#14B8A6',
    bg: '#F0FDFA'
  },
  'expired': {
    label: 'Vervallen',
    fg: '#EF4444',
    bg: '#FEF2F2'
  },
  'financial': {
    label: 'Financieel afgehandeld',
    fg: '#DC6843',
    bg: '#FFF4EE'
  }
};
window.FlootTasks = [{
  id: 1,
  title: 'Werkbon B250744 \u2014 nameting Binckhorstlaan',
  project: 'B250744 Den Haag Binckhorst',
  due: '16-05-2026',
  assignee: 'J. de Wit',
  status: 'in-progress'
}, {
  id: 2,
  title: 'Calculatie verkeersplan N201',
  project: 'B250692 N201 fase 3',
  due: '18-05-2026',
  assignee: 'M. Bakker',
  status: 'calculating'
}, {
  id: 3,
  title: 'Offerte versturen Rotterdam Centrum',
  project: 'B250688 Rotterdam Centrum',
  due: '19-05-2026',
  assignee: 'L. van Dijk',
  status: 'to-calculate'
}, {
  id: 4,
  title: 'Beoordeling A1 brugwerk',
  project: 'B250640 A1 Apeldoorn',
  due: '20-05-2026',
  assignee: 'J. de Wit',
  status: 'to-calculate'
}, {
  id: 5,
  title: 'Materialen inkoop Strijp-S afzettingen',
  project: 'B250664 Eindhoven Strijp-S',
  due: '22-05-2026',
  assignee: 'R. Visscher',
  status: 'prep'
}, {
  id: 6,
  title: 'Werkbon Lombok \u2014 controle uitvoering',
  project: 'B250651 Utrecht Lombok',
  due: '23-05-2026',
  assignee: 'M. Bakker',
  status: 'in-progress'
}, {
  id: 7,
  title: 'Afsluiten dossier Almere Poort',
  project: 'B250631 Almere Poort',
  due: '24-05-2026',
  assignee: 'L. van Dijk',
  status: 'executed'
}];
window.FlootTaskStatusMap = {
  'prep': {
    label: 'In voorbereiding',
    fg: '#6B7280',
    bg: '#F3F4F6'
  },
  'confirm': {
    label: 'Bevestigen',
    fg: '#2663EB',
    bg: '#EFF6FF'
  },
  'to-calculate': {
    label: 'Te plannen',
    fg: '#F97316',
    bg: '#FFF7ED'
  },
  'calculating': {
    label: 'Gepland',
    fg: '#EAB308',
    bg: '#FEFCE8'
  },
  'in-progress': {
    label: 'In uitvoering',
    fg: '#8B5CF6',
    bg: '#F5F3FF'
  },
  'review': {
    label: 'Beoordeling',
    fg: '#F97316',
    bg: '#FFF7ED'
  },
  'executed': {
    label: 'Uitgevoerd',
    fg: '#14B8A6',
    bg: '#F0FDFA'
  },
  'completed': {
    label: 'Afgerond',
    fg: '#14B8A6',
    bg: '#F0FDFA'
  },
  'expired': {
    label: 'Geannuleerd',
    fg: '#EF4444',
    bg: '#FEF2F2'
  }
};

// Werkbegroting (project detail) sample rows
window.FlootWerkbegroting = [{
  group: 'Binckhorstlaan \u2014 noordzijde',
  locationColor: '#F97316',
  rows: [{
    name: 'Afzetting kruising Binckhorstlaan / Mercuriusweg',
    material: 'Bakens type T-1',
    hours: 14,
    uurtype: 'Dag',
    unit: '14 st',
    price: '\u20ac 2.450,00'
  }, {
    name: 'Bebording omleiding N \u2192 W',
    material: 'Borden B6/B7 + statief',
    hours: 8,
    uurtype: 'Dag',
    unit: '6 st',
    price: '\u20ac 980,00'
  }, {
    name: 'Plaatsen verkeersregelaar (avonduren)',
    material: '\u2014',
    hours: 12,
    uurtype: 'Nacht',
    unit: '12 u',
    price: '\u20ac 1.620,00'
  }]
}, {
  group: 'Mercuriusweg \u2014 oostzijde',
  locationColor: '#EAB308',
  rows: [{
    name: 'Tijdelijke markering rijbaan',
    material: 'Geel folie 100 m',
    hours: 5,
    uurtype: 'Dag',
    unit: '100 m',
    price: '\u20ac 1.150,00'
  }, {
    name: 'Weekendinzet afsluiting',
    material: 'Hekwerk + dranghekken',
    hours: 16,
    uurtype: 'Weekend',
    unit: '16 u',
    price: '\u20ac 2.880,00'
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/data.js", error: String((e && e.message) || e) }); }

// ui_kits/floot/screens/ProjectDetail.jsx
try { (() => {
/* global React, Icon, Button, StatusPill */
// ProjectDetail — single project header + tab bar + Werkbegroting tab body.

const {
  useState: useStateD
} = React;
function ProjectDetail({
  project,
  onBack
}) {
  const [tab, setTab] = useStateD('werkbegroting');
  const tabs = [{
    id: 'werkbegroting',
    label: 'Werkbegroting',
    icon: 'table'
  }, {
    id: 'werkzaamheden',
    label: 'Werkzaamheden',
    icon: 'list-checks'
  }, {
    id: 'beoordeling',
    label: 'Beoordeling',
    icon: 'star'
  }, {
    id: 'prijslijst',
    label: 'Prijslijst',
    icon: 'tag'
  }, {
    id: 'notities',
    label: 'Notities',
    icon: 'sticky-note'
  }, {
    id: 'tekeningen',
    label: 'Tekeningen',
    icon: 'pencil-ruler'
  }, {
    id: 'bestanden',
    label: 'Bestanden',
    icon: 'folder'
  }, {
    id: 'events',
    label: 'Events',
    icon: 'list'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Project detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header",
    style: {
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
      color: 'var(--fg-muted)',
      fontSize: 12,
      fontWeight: 500,
      cursor: 'pointer'
    },
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 14
  }), "Terug naar Projecten"), /*#__PURE__*/React.createElement("div", {
    className: "page-title-row"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, project.nr, "  \xB7  ", project.name), /*#__PURE__*/React.createElement(StatusPill, {
    status: project.status
  }))), /*#__PURE__*/React.createElement("div", {
    className: "page-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "share-2"
  }, "Delen"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "download"
  }, "Exporteren"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "check"
  }, "Status wijzigen"))), /*#__PURE__*/React.createElement("div", {
    className: "meta-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Organisatie"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, project.client)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Uitvoerder"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "J. de Wit")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Uitvoerdatum"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, project.start)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Einddatum"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, project.end)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Type werk"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "Omleiding \xB7 fase 2")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Begroting"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "\u20AC 84.350,00")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Werkbonnen"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "14 / 22")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Locatie"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "Binckhorstlaan \xB7 Zone B"))), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: 'tab' + (tab === t.id ? ' active' : ''),
    onClick: () => setTab(t.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon
  }), t.label))), /*#__PURE__*/React.createElement("div", {
    className: "page-content",
    style: {
      paddingTop: 20
    }
  }, tab === 'werkbegroting' && /*#__PURE__*/React.createElement(WerkbegrotingTab, null), tab !== 'werkbegroting' && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 48,
      textAlign: 'center',
      color: 'var(--fg-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "Tab content niet gerecre\xEBerd in deze UI kit."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 6
    }
  }, "De Werkbegroting-tab is de hoofdrecreatie. Andere tabs volgen dezelfde tabel- en kaart-patronen."))));
}
function WerkbegrotingTab() {
  const groups = window.FlootWerkbegroting;
  const uurtypeColor = {
    'Dag': {
      fg: '#2563EB',
      bg: '#EFF6FF'
    },
    'Nacht': {
      fg: '#8B5CF6',
      bg: '#F5F3FF'
    },
    'Weekend': {
      fg: '#F97316',
      bg: '#FFF7ED'
    },
    'Zondag': {
      fg: '#EF4444',
      bg: '#FEF2F2'
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "toolbar",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "chip active"
  }, "Alle posten"), /*#__PURE__*/React.createElement("div", {
    className: "chip"
  }, "Dag"), /*#__PURE__*/React.createElement("div", {
    className: "chip"
  }, "Nacht / Weekend"), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "sliders-horizontal"
  }, "Filters"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "plus"
  }, "Groep toevoegen")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40
    }
  }), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40
    }
  }), /*#__PURE__*/React.createElement("th", null, "Werkzaamheid"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 200
    }
  }, "Materiaal"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90
    }
  }, "Uurtype"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 70
    },
    className: "right"
  }, "Aantal"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 130
    },
    className: "right"
  }, "Bedrag"))), /*#__PURE__*/React.createElement("tbody", null, groups.map((g, gi) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: gi
  }, /*#__PURE__*/React.createElement("tr", {
    className: "group-row"
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "loc-circle",
    style: {
      background: g.locationColor
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 12
  }))), /*#__PURE__*/React.createElement("td", {
    colSpan: 4
  }, g.group), /*#__PURE__*/React.createElement("td", {
    className: "right"
  }, g.rows.length, " posten")), g.rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    className: "sub-row"
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Icon, {
    name: "grip-vertical"
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Icon, {
    name: "square"
  })), /*#__PURE__*/React.createElement("td", null, r.name), /*#__PURE__*/React.createElement("td", {
    className: "muted"
  }, r.material), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      background: uurtypeColor[r.uurtype].bg,
      color: uurtypeColor[r.uurtype].fg,
      padding: '1px 8px',
      fontSize: 11
    }
  }, r.uurtype)), /*#__PURE__*/React.createElement("td", {
    className: "right muted"
  }, r.unit), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontWeight: 600
    }
  }, r.price))))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 6,
    className: "right",
    style: {
      fontSize: 12,
      color: 'var(--fg-muted)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "Totaal"), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg-2)'
    }
  }, "\u20AC 9.080,00"))))));
}
Object.assign(window, {
  ProjectDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/screens/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/screens/ProjectsScreen.jsx
try { (() => {
/* global React, Icon, Button, StatusPill, SearchInput */
// ProjectsScreen — /projecten/alle. Searchable + filter chips + paginated table.

const {
  useState,
  useMemo
} = React;
function ProjectsScreen({
  onOpenProject
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const filterOptions = [{
    id: 'all',
    label: 'Alle'
  }, {
    id: 'in-progress',
    label: 'In uitvoering'
  }, {
    id: 'quote',
    label: 'Offerte verstuurd'
  }, {
    id: 'to-calculate',
    label: 'Te calculeren'
  }, {
    id: 'completed',
    label: 'Gereed'
  }];
  const rows = useMemo(() => {
    return window.FlootProjects.filter(p => {
      if (filter !== 'all' && p.status !== filter) return false;
      if (query && !(p.nr + ' ' + p.name + ' ' + p.client).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, filter]);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Projecten"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-title-row"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Projecten")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--fg-muted)',
      fontSize: 13
    }
  }, window.FlootProjects.length, " projecten \xB7 ", rows.length, " zichtbaar")), /*#__PURE__*/React.createElement("div", {
    className: "page-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "sliders-horizontal"
  }, "Filters"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus"
  }, "Project toevoegen"))), /*#__PURE__*/React.createElement("div", {
    className: "page-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, filterOptions.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    className: 'chip' + (filter === o.id ? ' active' : ''),
    onClick: () => setFilter(o.id)
  }, o.label)), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: query,
    onChange: setQuery,
    placeholder: "Zoek op nummer, project of opdrachtgever..."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tbl-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 110
    }
  }, "Nummer"), /*#__PURE__*/React.createElement("th", null, "Project"), /*#__PURE__*/React.createElement("th", null, "Opdrachtgever"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 220
    }
  }, "Periode"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 180
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.nr,
    className: "clickable",
    onClick: () => onOpenProject(p)
  }, /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, p.nr), /*#__PURE__*/React.createElement("td", null, p.name), /*#__PURE__*/React.createElement("td", null, p.client), /*#__PURE__*/React.createElement("td", {
    className: "muted"
  }, p.start, " \u2192 ", p.end), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: p.status
  })))), rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      textAlign: 'center',
      padding: 32,
      color: 'var(--fg-muted)'
    }
  }, "Geen projecten gevonden.")))), /*#__PURE__*/React.createElement("div", {
    className: "pagination"
  }, /*#__PURE__*/React.createElement("span", null, "1 \u2013 ", rows.length, " van ", window.FlootProjects.length), /*#__PURE__*/React.createElement("div", {
    className: "pages"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: true
  }, "Eerste"), /*#__PURE__*/React.createElement("button", {
    disabled: true
  }, "Vorige"), /*#__PURE__*/React.createElement("button", null, "Volgende"), /*#__PURE__*/React.createElement("button", null, "Laatste"))))));
}
Object.assign(window, {
  ProjectsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/screens/ProjectsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/screens/TakenScreen.jsx
try { (() => {
/* global React, Icon, Button, TaskStatusPill, SearchInput */
// TakenScreen — task management overview (root `/`).

const {
  useState: useStateT
} = React;
function TakenScreen() {
  const [query, setQuery] = useStateT('');
  const [view, setView] = useStateT('mijn');
  const tasks = window.FlootTasks.filter(t => !query || (t.title + ' ' + t.project + ' ' + t.assignee).toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Taken"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Taken"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--fg-muted)',
      fontSize: 13
    }
  }, tasks.length, " openstaande taken")), /*#__PURE__*/React.createElement("div", {
    className: "page-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "calendar"
  }, "Week"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus"
  }, "Taak toevoegen"))), /*#__PURE__*/React.createElement("div", {
    className: "page-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'chip' + (view === 'mijn' ? ' active' : ''),
    onClick: () => setView('mijn')
  }, "Mijn taken"), /*#__PURE__*/React.createElement("div", {
    className: 'chip' + (view === 'team' ? ' active' : ''),
    onClick: () => setView('team')
  }, "Team"), /*#__PURE__*/React.createElement("div", {
    className: 'chip' + (view === 'alle' ? ' active' : ''),
    onClick: () => setView('alle')
  }, "Alle"), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: query,
    onChange: setQuery,
    placeholder: "Zoek taak, project of uitvoerder..."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tbl-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40
    }
  }), /*#__PURE__*/React.createElement("th", null, "Taak"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 240
    }
  }, "Project"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 140
    }
  }, "Uitvoerder"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 130
    }
  }, "Deadline"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 160
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, tasks.map(t => /*#__PURE__*/React.createElement("tr", {
    key: t.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Icon, {
    name: "square"
  })), /*#__PURE__*/React.createElement("td", null, t.title), /*#__PURE__*/React.createElement("td", {
    className: "muted"
  }, t.project), /*#__PURE__*/React.createElement("td", null, t.assignee), /*#__PURE__*/React.createElement("td", {
    className: "muted"
  }, t.due), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(TaskStatusPill, {
    status: t.status
  })))))))));
}
Object.assign(window, {
  TakenScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/screens/TakenScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/floot/screens/WerkbonScreen.jsx
try { (() => {
/* global React, Icon, Button, StatusPill */
// WerkbonScreen — sample read-only "Externe pagina" work order.

function WerkbonScreen() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Werkbon"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--fg-muted)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 12
  }), "Externe pagina"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Werkbon WB-2026-0143")), /*#__PURE__*/React.createElement("div", {
    className: "page-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "printer"
  }, "Afdrukken"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "check"
  }, "Goedkeuren"))), /*#__PURE__*/React.createElement("div", {
    className: "page-content",
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "meta-grid",
    style: {
      padding: 0,
      background: 'transparent',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px 24px',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Project"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "B250744 \xB7 Den Haag Binckhorst")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Datum uitvoering"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "14-05-2026")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Uitvoerder"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "J. de Wit")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, "Locatie"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "Binckhorstlaan / Mercuriusweg"))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--fg-2)',
      margin: '0 0 12px',
      letterSpacing: '.02em',
      textTransform: 'uppercase'
    }
  }, "Gewerkte posten"), /*#__PURE__*/React.createElement("table", {
    className: "tbl",
    style: {
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Werkzaamheid"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90
    },
    className: "right"
  }, "Aantal"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90
    }
  }, "Uurtype"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 120
    },
    className: "right"
  }, "Bedrag"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Plaatsen afzetting kruising"), /*#__PURE__*/React.createElement("td", {
    className: "right"
  }, "14 st"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      background: '#EFF6FF',
      color: '#2563EB',
      padding: '1px 8px',
      fontSize: 11
    }
  }, "Dag")), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontWeight: 600
    }
  }, "\u20AC 2.450,00")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Bebording omleiding"), /*#__PURE__*/React.createElement("td", {
    className: "right"
  }, "6 st"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      background: '#EFF6FF',
      color: '#2563EB',
      padding: '1px 8px',
      fontSize: 11
    }
  }, "Dag")), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontWeight: 600
    }
  }, "\u20AC 980,00")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Verkeersregelaar avond"), /*#__PURE__*/React.createElement("td", {
    className: "right"
  }, "12 u"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      background: '#F5F3FF',
      color: '#8B5CF6',
      padding: '1px 8px',
      fontSize: 11
    }
  }, "Nacht")), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontWeight: 600
    }
  }, "\u20AC 1.620,00")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "right",
    colSpan: 3,
    style: {
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: 12,
      letterSpacing: '.06em',
      color: 'var(--fg-muted)'
    }
  }, "Totaal"), /*#__PURE__*/React.createElement("td", {
    className: "right",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg-2)'
    }
  }, "\u20AC 5.050,00"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h",
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-muted)',
      marginBottom: 12
    }
  }, "Status"), /*#__PURE__*/React.createElement(StatusPill, {
    status: "in-progress"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      color: 'var(--fg-3)',
      fontSize: 13,
      lineHeight: 1.5
    }
  }, "In uitvoering \xB7 uitvoerder logt voortgang via mobiel werkbon-formulier. Goedkeuring activeert facturatie.")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h",
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-muted)',
      marginBottom: 12
    }
  }, "Opmerking uitvoerder"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--fg-3)',
      fontSize: 13,
      lineHeight: 1.6
    }
  }, "Bebording oostzijde aangepast i.v.m. afwijking trottoir. Foto's toegevoegd. Materialen geleverd 07:15.")))));
}
Object.assign(window, {
  WerkbonScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/floot/screens/WerkbonScreen.jsx", error: String((e && e.message) || e) }); }

})();
