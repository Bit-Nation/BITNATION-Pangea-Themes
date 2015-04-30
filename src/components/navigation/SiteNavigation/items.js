module.exports = [
  {
    link: 'Dashboard',
    href: '#!',
    icon: { set: 'xbnx', type: 'dashboard' }
  },
  {
    link: 'Notary',
    href: '#!notary',
    icon: { set: 'xbnx', type: 'my-data' }
  },
  {
    link: 'Mail',
    href: '#!mail',
    icon: { set: 'xbnx', type: 'dapp-library' }
  },
  {
    link: 'Test mail',
    href: '#!mail/3',
    icon: { set: 'xbnx', type: 'my-dapps' }
  },
  {
    link: 'Test menu',
    icon: { set: 'xbnx', type: 'dashboard' },
    items: [
      {
        link: 'Google',
        href: 'http://www.google.com',
        icon: { set: 'xbnx', type: 'dapp-library' }
      },
      {
        link: 'Not Found',
        href: '#!notFound',
        icon: { set: 'xbnx', type: 'my-data' }
      }
    ]
  }
];