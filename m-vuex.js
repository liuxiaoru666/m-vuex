(function () {
  let _Vue;
  class Store {
    constructor(options) {
      this.state = new Vue({
          data:options.state
      })
      this.actions = options.actions || {};
      this.mutations = options.mutations || {};
      this.getters = {};

      
      //实现响应式getters
      Object.keys(options.getters).forEach((key) => {
        Object.defineProperty(this.getters,key,{
            get:()=>{
                return options.getters[key](this.state)
            }
        })
      });
    }
    //commit
    commit = (type,arg)=>{
        this.mutations[type](this.state,arg)
      }
    //dispatch    
    dispatch= (type, arg)=> {
        this.actions[type]({
            commit:this.commit,
            state:this.state
          }, arg)

    }

  }

  const install = (Vue, options) => {
    _Vue = Vue;
    init(options);
  };

  function init() {
    _Vue.mixin({
      beforeCreate() {
        let vm = this;
        if (vm.$options.store) {
          vm.$store = vm.$options.store;
        } else {
          vm.$store = vm.$parent && vm.$parent.store;
        }
      },
    });
  }

  window.Vuex = {
    Store,
    install,
  };
  if (Vue) {
    Vue.use(Vuex);
  }
})();
