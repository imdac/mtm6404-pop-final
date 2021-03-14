function randomNumber (min, max) {
  return (Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data: function () {
    return {
      show: false
    }
  },
  mounted: function () {
    this.popIn()
  },
  methods: {
    popIn: function () {
      const that = this

      setTimeout(function () {
        that.show = true
        that.popOut()
      }, randomNumber(1, 5) * 1000)
    },
    popOut: function () {
      const that = this

      setTimeout(function () {
        that.show = false
      }, randomNumber(2, 4) * 1000)
    },
    pop: function () {
      this.show = false
    }
  }
})

const vm = app.mount('#app')
