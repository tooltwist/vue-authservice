// import Vue from 'vue'
import Component from './MyComponent.vue'
// export default Vue => Vue.component(Component.name, Component)


let obj = {
  install (vm, options) {
    console.log('my-component.install()', options)

    vm.component(Component.name, Component)
    vm.component('authservice-navbar', Component)

    console.log('done')
  },
  abc: 'def'
}

export default obj
