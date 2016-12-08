const routes = [{
  path: '/goods',
  component: (resolve) => {
    require.ensure(['components/goods/goods.vue'], require => {
      resolve(require('components/goods/goods.vue'));
    });
  }
}, {
  path: '/ratings',
  component: (resolve) => {
    require.ensure(['components/ratings/ratings.vue'], require => {
      resolve(require('components/ratings/ratings.vue'));
    });
  }
}, {
  path: '/seller',
  component: (resolve) => {
    require.ensure(['components/seller/seller.vue'], require => {
      resolve(require('components/seller/seller.vue'));
    });
  }
}, {
  path: '',
  component: (resolve) => {
    require.ensure(['components/goods/goods.vue'], require => {
      resolve(require('components/goods/goods.vue'));
    });
  }
}];

export default routes;
