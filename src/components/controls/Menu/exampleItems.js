module.exports = [
  { content: 'Dashboard', icon: { set: 'xbnx', type: 'dashboard' }, href: 'test' },
  { content: 'DApp Library', icon: { set: 'xbnx', type: 'dapp-library' }, href: 'test' },
  { content: 'My DApps', icon: { set: 'xbnx', type: 'my-dapps' }, href: 'yo' },
  { content: 'Utilities', icon: { set: 'xbnx', type: 'utilities' }, href: 'yo', items: [
    { content: 'My DApps', icon: 'search', href: 'yo' },
    { content: 'My Data', icon: 'envelope', href: 'yo' },
    { content: 'Services', icon: 'service', href: 'yo', items: [
      { content: 'My DApps', icon: 'cog', href: 'yo' },
      { content: 'My Data', icon: 'data', href: 'yo' },
      { content: 'Services', icon: 'test', href: 'yo' }
    ] }
  ] },
  { content: 'My Data', icon: { set: 'xbnx', type: 'my-data' }, href: 'yo' },
  { content: 'Services', icon: { set: 'xbnx', type: 'services' }, href: 'yo' }
];