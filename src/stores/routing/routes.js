// child routes inherit the parents options
// variables are written as $name
// routes with child routes need to specify a $ route
// to be accessible without a child path, ie. /name/

module.exports = {
  $: { cover: true },
  'sign-in': {
    public: true,
    cover: {
      date: false,
      children: null,
      title: null
    }
  },
  notary: {},
  mail: {
    routes: {
      $: {
      },
      $id: {
        hej: 4
      }
    }
  },
  basicincome_co: {
    routes: {
      $: {
      },
      $id: {
        hej: 4
      }
    }
  },  
  dapps: {},
  services: {},
  notFound: { hidden: true }
};