

<template lang="html">
  <div class="cmo-box left">


    <div v-if="!is_selected" class="cmo-input-2">
      <input class="arg" placeholder="beetho..." type="text" v-model="input">
    </div>



    <div v-if="is_selected" class="selected-flair">
      <img class="img" :src="selected.has_pic? 'https://classicalmusiconly.com/static/cmo/pics/profile/composers/64x64/'+selected.slug+'.jpg':'https://classicalmusiconly.com/static/cmo/pics/profile/no-image.png'" />
      <div class="name">
        <div class="last">{{selected.last_name}}</div>
        <div class="first">
          {{selected.first_name}}
        </div>
        <button class="cmo-btn s1 teal sh1 r1" @click="reset">Change</button>
      </div>
    </div>

    <div v-if="!is_selected && composers.length" class="cmp-list-small">
      <transition-group enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <a v-for="(c, idx) in composers" class="itm" @click="select_composer(c)" :key="idx">
            <img class="mi pic" :src="c.has_pic? 'https://classicalmusiconly.com/static/cmo/pics/profile/composers/64x64/'+c.slug+'.jpg':'https://classicalmusiconly.com/static/cmo/pics/profile/no-image.png'" />
            <div class="mi text">
              <div class="name">
                <p class="last">{{ c.last_name }}</p>
                <p class="first">{{ c.first_name }}</p>
              </div>
            </div>
        </a>
      </transition-group>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      is_selected: false,
      selected: null,
      input: null,
      composers: [],
    }
  },

  methods: {
    select_composer(c) {
      this.selected = c;
      this.is_selected = true;
      this.$emit('selected', c.slug);
    },

    reset() {
      this.input = null;
      this.composers = [];
      this.is_selected = false;
      this.$emit('reset');
    }
  },

  watch: {
    'input': function() {
      if (this.input == null || this.input.length === 0) {
        this.composers = []
        return
      }
      const arg = {
        q: this.input,
      };
      this.$http.get('/search/composers', {params: arg}).then(d => {
        this.composers = d.data.results
      }).catch(err => {
        this.$emit('error', err)
      })

    }
  },
}
</script>

<style lang="less">
.cmo-input-2 {
  width: 100%;
  display: block;
  margin-bottom: 1em;
  input {
    outline: none !important;
    &::placeholder {
        color: #aaa;
    }
    border: none;
    width: 100%;
    border-bottom: 2px solid #14a27b;
    transition: all 0.5s;
    font-weight: bold;
    font-size: 20px;
    background: transparent;
    color: #555;
    &:focus {
      border-color: #f23daa;
    }
  }

  &.s1 {
    input {
      font-size: 24px;
    }
  }
}

.selected-flair {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    .img {
        border-radius: 50%;
        border: 2px solid #17a5bf;
        width: 64px;
        height: 64px;
        margin-right: 15px;
    }
    .name {
        font-weight: bold;
        line-height: 1em;
        .last {
            font-size: 24px;
            color: #444;
            margin-bottom: 0.1em;
        }
        .first {
          color: #777;
            font-size: 16px;
            margin-bottom: 5px;
        }
    }
}


.cmp-list-small {
  margin: 0;
  display: block;
  border: 2px solid #ddd;
  border-radius: 5px;

  .itm {
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    align-items: center;
    align-content: center;
    transition: all 0.3s;

    &:first-child {
      .mi.pic {
        border-top-left-radius: 5px;
      }

      .mi.text {
        border-top-right-radius: 5px;
      }
    }

    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      .mi.pic {
        border-bottom-left-radius: 5px;
      }

      .mi.text {
        border-bottom-right-radius: 5px;
      }
    }

    > .mi.pic {
      margin: 0 !important;
      padding: 0 !important;
      width: 38px !important;
      height: 38px !important;
    }

    > .mi.text {
      padding: 0.3em 0.3em 0.3em 0.6em;
      flex: 1;
      color: #666;
      background: #fff;
      transition: all 0.3s;
      width: 100%;
      display: flex;
      align-items: center;
      .name {
        display: inline-block;
        flex: 1;
        font-weight: bold;
        .last {
          display: block;
          line-height: 1em;
          margin: 0;
          font-size: 16px;
          // color: #555;
        }

        .first {
          display: block;
          font-size: 11px;
          line-height: 1em;
          margin: 0;
        }
      }

      > .count {
        display: inline-block;
        float: right;
        font-size: 11px;
        border-radius: 5px;
        background: #555;
        color: #fff;
        padding: 0.1em 0.6em;
      }

      > .tl0 {
        display: inline-block;
        float: right;
      }
      > .follows {
        background: #42a2af;
        color: #fff;
        border-radius: 5px;
        padding: 0.1em 0.3em;
        line-height: 1em;
        .count {
          display: block;
          font-size: 12px;

        }
        .txt {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
        }

      }
    }

    &:hover {
      .mi.text {
        color: #1a9dc4 !important;
        background: transparent;
      }
    }
  }
}
</style>
