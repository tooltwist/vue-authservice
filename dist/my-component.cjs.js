'use strict';

var Component = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h1', [_vm._v("hello")]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-1754c3f3',
  name: 'my-component'
};

var index = (function (Vue) {
  return Vue.component(Component.name, Component);
});

module.exports = index;
