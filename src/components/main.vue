



<template>
<div class="list-select-wrp">
  <div>
    <div class="err-msg" v-if="merr.is_active" @click="merr.is_active = false">
      <div class="msg">{{merr.message}}</div>
      <div class="footer">Click to close</div>
    </div>
    <div class="cmo-list-select-wrp">

      <div class="cmo-box st1">
        <div class="cmo-header s2">
          Listen to a random work
        </div>
        <div class="cmo-btn-wrp grp1 center">
          <button class="cmo-btn pink sz2 r2 br2 sh2" @click="get_lucky('masterpiece')">Masterpiece</button>
          <button class="cmo-btn pink sz2 r2 br2 sh2" @click="get_lucky('obscure')">Obscure</button>
          <button class="cmo-btn pink sz2 r2 br2 sh2" @click="get_lucky('random')">I'm Feeling Lucky!</button>
          <button v-if="is_user" class="cmo-btn pink sz2 r2 br2 sh2" @click="get_lucky('follows')">From Followed Composers</button>
          <button v-if="is_user" class="cmo-btn pink sz2 r2 br2 sh2" @click="get_lucky('stars')">From Starred Works</button>
        </div>
      </div>
      <div class="ui horizontal divider">Or</div>
      <div class="cmo-box st1">
        <div class="cmo-header s2">
          Listen to a playlist filtered by composer, genre or period
        </div>
        <div class="cmo-box ml1">
          <div class="cmo-header s1">Choose by Composer</div>
          <select-composer @selected="select_composer" @reset="search.is_selected = false" @error="error_handler"></select-composer>
          <div v-if="search.is_selected" class="cmo-box mt1">
            <div class="cmo-btn-wrp grp1">
              <div class="cmo-box mb1">
                <button class="cmo-btn s1 r1 sh2 green" @click="select_composer_genre(null, null)">Play All</button>
              </div>
              <div v-for="parent in search.selected.info.genres" class="cmo-box mb1">
                <button class="cmo-btn s1 r1 sh2 teal"
                @click="select_composer_genre(parent, null)">{{parent.name}}</button>
                <a v-for="child in parent.children" class="cmo-btn sz1 r2 sh2 pink"
                @click="select_composer_genre(parent, child)">{{child.name}}
              </a>
              </div>
            </div>
          </div>

          <div class="ui horizontal divider">Or</div>
          <div class="cmo-header s1">
            Choose by Category
            <div class="cmo-label">
              step {{idx+1}}/3
            </div>
          </div>


          <div class="cmo-list-select">
            <div v-if="idx == 0" class="page p1">
              <div class="cmo-btn-wrp grp1">
                <button class="cmo-btn pink iv br2 r2 s9" @click="go_next(null)">Any</button>
                <button class="cmo-btn pink br2 sh2 r2 s9" v-for="s in style.options.slice(1).reverse()" @click="go_next(s)">{{s.name}}</button>
              </div>
            </div>
            <div v-if="idx == 1" class="page p2">
              <div class="cmo-btn-wrp grp1">
                <button class="cmo-btn pink br2 sh2 r2 s9" v-for="s in parent.options" @click="go_next(s)">{{s.name}}</button>
              </div>
            </div>
            <div v-if="idx == 2" class="page p3">
              <div class="cmo-btn-wrp grp1">
                <button class="cmo-btn pink iv br2 r2 s9" @click="go_next(null)">Any</button>
                <button class="cmo-btn pink br2 sh2 r2 s9" v-for="s in child.options.slice(1)" @click="go_next(s)">{{s.name}}</button>
              </div>
            </div>
          </div>

          <div class="cmo-btn-wrp right">
            <button v-if="idx > 0" class="cmo-btn blue sh2 r2 s9" @click="idx--">Back</button>
          </div>
          <div class="ui horizontal divider">Or</div>

          <div class="cmo-header s1">Choose directly a recommended list</div>

          <div class="cmo-box">
            <div class="cmo-btn-wrp grp1">
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/lists/works/all')">Top Works</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/lists/works/orchestral/violin-concerto/style/romantic')">Top Romantic Violin Concertos</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/lists/works/chamber-music/string-quartet/style/romantic')">Top Romantic String Quartets</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/lists/works/orchestral/symphony/style/romantic')">Top Romantic Symphonies</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/lists/works/solo/piano-sonata')">Top Piano Sonatas</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/composer/ludwig-van-beethoven/works/solo/piano-sonata')">Beethoven - Piano Sonatas</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/composer/johannes-brahms/works/chamber-music')">Brahms - Chamber Music</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/composer/gustav-mahler/works/orchestral/symphony')">Mahler - Symphonies</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/composer/johann-sebastian-bach/works/sacred-music/choral-orchestral')">JS Bach -  Choral Orchestral</button>
              <button class="cmo-btn teal s1 sh2 r2"
              @click="default_lists('/composer/ludwig-van-beethoven/works/orchestral/symphony')">Beethoven - Symphonies</button>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
  <div class="links-wrp">
    <div class="items">
      <div class="item" @click="__click('/on-this-day')">On this Day</div>
      <div class="item" @click="__click('/lists')">Lists</div>
      <div class="item" @click="__click('/posts')">Top Posts</div>
    </div>
    <div class="items-ftr">
      <div class="item" @click="__click_ext('https://github.com/classicalmusiconly/classicalmusiconly-extension')">View Source Code on Github</div>
      <div class="item" @click="__click_ext('https://github.com/classicalmusiconly/classicalmusiconly-extension/issues')">Request Features/ Report Bugs</div>
    </div>
  </div>
</div>
</template>



<script>


import cmo_cat from '../js/cmo_cat.js';
import CMPSelect from './select_composer.vue';
const styles_l = ['medieval', 'renaissance', 'baroque', 'classical', 'romantic', 'modern'];


export default {
  name: 'list-select',
  components: {
    'select-composer': CMPSelect,
  },

  data() {
    return {
      mroot: 'https://classicalmusiconly.com',
      merr: {
        is_active: false,
        message: null,
      },
      search: {
        input: null,
        composers: [],
        selected: null,
        is_selected: false,
      },
      root: cmo_cat,
      idx: 0,
      is_chosen: false,
      answer: null,
      is_user: false,
      style: {
        options: [{
            id: 'all',
            name: 'All'
          },
          {
            id: 'medieval',
            name: 'Medieval'
          },
          {
            id: 'renaissance',
            name: 'Renaissance'
          },
          {
            id: 'baroque',
            name: 'Baroque'
          },
          {
            id: 'classical',
            name: 'Classical'
          },
          {
            id: 'romantic',
            name: 'Romantic'
          },
          {
            id: 'modern',
            name: 'Modern'
          }
        ],
        select: null,

      },
      parent: {
        options: this.root,
        select: null,
      },
      child: {
        options: null,
        select: null,
      },
      level: {
        options: [{
          id: 'all',
          name: 'All'
        }, {
          id: 'top',
          name: 'Top'
        }],
        select: null,
      }
    }
  },

  methods: {
    __click(url) {
      chrome.tabs.create({url: this.mroot + url})
    },
    __click_ext(url) {
      chrome.tabs.create({url: url})
    },
    error_handler(re) {
      if (re.message) {
        this.merr.message = re.message
      } else {
        this.merr.message = re.response
      }
      this.merr.is_active = true
    },
    default_lists(url) {
      chrome.tabs.create({url: this.mroot + url + '/tv'})
    },
    get_lucky(typ) {
      this.$http.get(`/community/tv/lucky/${typ}`).then(res => {
        chrome.tabs.create({url: this.mroot + res.data.page.url})
      }).catch(err => {
        this.error_handler(err)
      })

    },
    select_composer_genre(parent, child) {
      let murl = `/composer/${this.search.selected.slug}/works`;
      if (child) {
        murl += `/${parent.slug}/${child.slug}`;
      } else if (parent) {
        murl += `/${parent.slug}`;
      } else {
      }
      chrome.tabs.create({url: this.mroot + murl + '/tv'})
    },
    select_composer(c) {
      this.$http.get(`/resource/composer/${c}`).then(d => {
        this.search.selected = d.data

        this.search.is_selected = true;
      }).catch(err => {
        this.error_handler(err)
      })
    },
    reset() {
      this.c_answer = null;
      this.is_chosen = false;
      this.idx = 0;
    },

    go_next(arg) {
      if (this.idx == 0) {
        this.style.select = arg;
        // this.style.select = arg == 'all'?;
        if (!arg) {
          this.parent.options = this.root;
        } else {
          this.parent.options = this.root.filter((item) => {
            return styles_l.indexOf(item.least_style) <= styles_l.indexOf(this.style.select.id);
          });
        }
        this.idx++;
      } else if (this.idx == 1) {
        this.parent.select = arg;
        if (!this.style.select) {
          this.child.options = this.parent.select.children;
        } else {
          this.child.options = this.parent.select.children.filter((item) => {
            return styles_l.indexOf(item.least_style) <= styles_l.indexOf(this.style.select.id);
          });
        }
        this.child.options = [{
          id: null,
          name: 'Any',
          least_style: 'medieval'
        }].concat(this.child.options);
        this.idx++;
      } else if (this.idx == 2) {
        this.child.select = arg;
        this.get_list_cat();
      }
    },



    get_list_cat() {
      let answer = {
        type_id: 1,
      };
      let murl = '/lists/works';
      if (this.parent.select) {
        murl += `/${this.parent.select.id}`;
      } else {
        murl += `/all`
      }
      if (this.child.select) {
        murl += `/${this.child.select.id}`;
      }
      if (this.style.select) {
        murl += `/style/${this.style.select.id}`;
      }

      chrome.tabs.create({url: this.mroot + murl + '/tv'})
    },
  },

}
</script>

<style lang="less">

.err-msg {
  padding: 1em;
  font-weight: bold;
  color: #fff;
  border-radius: 5px;
  background: #d02247;
  font-size: 16px;
  position: fixed;
  margin: 1em;
  // width: 100%;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 1px 2px 0 #999;
  transition: all 0.5s;
  > .msg {
    font-size: 16px;
  }
  > .footer {
    margin-top: 4px;
    font-size: 11px;
  }
}

.create-list-selected-cmp {
  display: flex;
  .img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    border: 2px solid #2dac9d;
    margin-right: 1em;
  }

  .txt {
    .first {
      font-weight: bold;
      font-size: 16px;
      line-height: 1em;
      margin-bottom: 1em;
    }
    .last {
      font-weight: bold;
      font-size: 20px;
      line-height: 1em;
    }
  }
}

.cmo-list-select {
  > .page {
    transition: all 0.5s;
  }
  &.c1 {

    > .page.p1 {
      left: 0;
    }
    > .page.p2 {
      left: 100%;
    }
    > .page.p3 {
      left: 200%;
    }
  }

  &.c2 {

    > .page.p1 {
      left: -100%;
    }
    > .page.p2 {
      left: 0;
    }
    > .page.p3 {
      left: 100%;
    }
  }

  &.c3 {

    > .page.p1 {
      left: -200%;
    }
    > .page.p2 {
      left: -100%;
    }
    > .page.p3 {
      left: 0;
    }
  }
}

.links-wrp {
  border-top: 1px solid #ccc;
  padding: 1em 0;
  > .items {
    display: flex;
    align-items: center;
    justify-content: center;
    > .item {
      transition: all 0.5s;
      cursor: pointer;
      // color: #777;
      color: #32bce0;
      padding: 0.5em;
      font-weight: bold;
      &:hover {
        color: #444;
      }
    }
  }

  > .items-ftr {
    display: flex;
    align-items: center;
    justify-content: center;
    > .item {
      transition: all 0.5s;
      font-size: 10px;
      cursor: pointer;
      color: #777;
      padding: 0.5em;
      font-weight: bold;
      &:hover {
        color: #444;
      }
    }
  }
}

.cmo-label {
  font-size: 14px;
  padding: 0.2em 0.5em;
  margin: 0 0.3em;
  font-weight: bold;
  color: #fff;
  background: #dd2064;
  background: #14a6ba;
  box-shadow: 0 1px 1px 0 #bbb;
  display: inline-block;
  border-radius: 4px;
}
</style>
