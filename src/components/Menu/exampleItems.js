module.exports = [
  { text: 'Dashboard', icon: 'icon-dashboard', href: 'test' },
  { text: 'DApp Library', icon: 'icon-dapp-library', href: 'test' },
  { text: 'My DApps', icon: 'icon-my-dapps', href: 'yo' },
  { text: 'My Data', icon: 'icon-my-data', href: 'yo' },
  { text: 'Services', icon: 'icon-services', href: 'yo' },
  { text: 'Utilities', icon: 'icon-utilities', href: 'yo', items: [
    { text: 'My DApps', icon: 'icon-my-dapps', href: 'yo' },
    { text: 'My Data', icon: 'icon-my-data', href: 'yo' },
    { text: 'Services', icon: 'icon-services', href: 'yo', items: [
      { text: 'My DApps', icon: 'icon-my-dapps', href: 'yo' },
      { text: 'My Data', icon: 'icon-my-data', href: 'yo' },
      { text: 'Services', icon: 'icon-services', href: 'yo' },
    ] }
  ] }
];