function randomNumber (min, max) {
  return (Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data: function () {
    return {
      score: 0,
      bubbles: 0,
      active: false,
      level: 'medium'
    }
  },
  methods: {
    addPoint: function () {
      this.score++
    },
    bubblePopped: function () {
      this.bubbles--
      if (!this.bubbles) {
        const that = this
        setTimeout(function () {
          that.active = false
        }, 1000)
      }
    },
    play: function (level) {
      this.level = level
      this.score = 0
      this.bubbles = 20
      this.active = true
    }
  }
})

app.component('bubble', {
  props: ['level'],
  data: function () {
    return {
      show: false,
      levels: {
        easy: 10,
        medium: 6,
        hard: 4
      }
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
        that.$emit('bubble-popped')
      }, randomNumber(that.levels[that.level] - 2, that.levels[that.level]) * 1000)
    },
    pop: function () {
      this.show = false
      this.$emit('add-point')
    }
  },
  template: `
    <div class="bubble-container">
      <transition enter-active-class="animate__animated animate__bounceIn">
        <div class="bubble" v-if="show" @click.once="pop"></div>
      </transition>
    </div>`
})

const vm = app.mount('#app')
