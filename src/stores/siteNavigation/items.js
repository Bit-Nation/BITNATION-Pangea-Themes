module.exports = [
  {
    link: 'Dashboard',
    href: '#!',
    icon: { set: 'xbnx', type: 'dashboard' }
  },
  {
    link: 'Public Notary',
    href: '#!/notary',
    icon: { set: 'fa', type: 'list' }
  },
  {
    link: 'DApp Library',
    href: '#!/dapps/library',
    icon: { set: 'xbnx', type: 'dapp-library' }
  },
  {
    link: 'My DApps',
    href: '#!/dapps',
    icon: { set: 'xbnx', type: 'my-dapps' }
  },
  {
    link: 'My Data',
    href: '#!/data',
    icon: { set: 'xbnx', type: 'my-data' }
  },
  {
    link: 'Services',
    href: '#!/services',
    icon: { set: 'xbnx', type: 'services' }
  },
  {
    link: 'Utilities',
    href: '#!/utilities',
    icon: { set: 'xbnx', type: 'utilities' }
  },
  {
    link: 'Profile',
    icon: { set: 'fa', type: 'user' },
    items: [
      {
        link: 'Encrypted Email',
        href: '#!/mail'
      },
      {
        link: 'Wallet',
        href: '#!/wallet'
      },
      {
        link: 'Peers',
        href: '#!/peers'
      }
    ]
  },
  {
    link: 'My Nation',
    href: '#!/nation',
    icon: { set: 'fa', type: 'group' }
  }
];