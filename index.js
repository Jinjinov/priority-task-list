// The JSON standard specifies that all key/value pairs should be in double quotes.

//-------------------------------------------------------------------------
// class Task
//-------------------------------------------------------------------------
class Task {
  constructor(text, factor) {
    this.text = text;
    this.priority = 0;
    this.priorityFactor = factor;
    this.activityCounter = 0;
    this.lastUpdate = new Date();
    this.lastActivity = new Date();
  }
}

function getWidthOfText(txt, fontsize, fontname){
  if(getWidthOfText.c === undefined){
      getWidthOfText.c=document.createElement('canvas');
      getWidthOfText.ctx=getWidthOfText.c.getContext('2d');
  }
  getWidthOfText.ctx.font = fontsize + ' ' + fontname;
  return getWidthOfText.ctx.measureText(txt).width;
}

/*
function getWidthOfText(txt, fontsize, fontname){
  if(getWidthOfText.e === undefined){
      getWidthOfText.e = document.createElement('span');
      getWidthOfText.e.style.display = "none";
      document.body.appendChild(getWidthOfText.e);
  }
  getWidthOfText.e.style.fontSize = fontsize;
  getWidthOfText.e.style.fontFamily = fontname;
  getWidthOfText.e.innerText = txt;
  return getWidthOfText.e.offsetWidth;
}
/**/

//-------------------------------------------------------------------------
// click-outside
//-------------------------------------------------------------------------
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it was, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  },
});

//-------------------------------------------------------------------------
// task-item
//-------------------------------------------------------------------------
Vue.component('task-item', {
  // https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d
  // https://sebastiandedeyne.com/posts/2016/dealing-with-templates-in-vue-20

  // https://stackoverflow.com/questions/36170425/detect-click-outside-element/36180348
  // https://jsfiddle.net/70vm3jrd/1/

  // https://stackoverflow.com/questions/11805352/floatleft-vs-displayinline-vs-displayinline-block-vs-displaytable-cell
  // https://stackoverflow.com/questions/15172520/advantages-of-using-displayinline-block-vs-floatleft-in-css

  // https://github.com/egoist/vue-autosize-textarea
  // https://github.com/egoist/vue-autosize-textarea/issues/1
  // https://github.com/mage3k/vue-autosize
  // https://github.com/Nerdinacan/vue-autosize-textarea

  // TODO:: center
  // TODO:: shadow
  // TODO:: soft colors

  // TODO:: - sign in: using Google, Facebook, Twitter, ...
  // TODO:: - https://github.com/websanova/vue-auth
  // TODO:: X - https://github.com/auth0-blog/vue-jwt-authentication - NodeJS, JSON Web Token
  // TODO:: - https://github.com/dgrubelic/vue-authenticate

  // TODO:: one database per user - https://gist.github.com/nolanlawson/9676093

  // TODO:: repeat interval: fixed interval
  // TODO:: scheduled time: time in day / day in week / day in month / day in year
  // TODO:: fixed date
  // TODO:: task: active / not active
  // TODO:: - duration is more important: sleep, work - scheduled time
  // TODO:: - ‎number of repetitions is more important: brush teeth, shower, shave - time elapsed since last repetition

  // TODO:: groups with base priority offset: y = k * x + n
  // - sleep / rest
  // - work
  // - groom
  // - cook / eat
  // - chores
  // - body
  // - mind
  // - relax / enjoy

  // TODO:: counter of minutes spent on task
  // TODO:: detailed first step plan: what, when, where, who, why, how, ...

  // TODO:: completed: too soon / on time / too late --> auto priority adjustment
  // TODO:: suggested priority

  // TODO:: parse URL
  // https://github.com/SoapBox/linkifyjs
  // https://github.com/phanan/vue-linkify
  // https://github.com/bryanwoods/autolink-js/blob/master/autolink-min.js
  // https://github.com/alexcorvi/anchorme.js/blob/gh-pages/dist-browser/anchorme.min.js
  // https://github.com/nfrasser/linkify-shim/blob/master/linkify.min.js
  // https://github.com/gregjacobs/Autolinker.js/blob/master/dist/Autolinker.min.js
  // https://github.com/ljosa/urlize.js/blob/master/urlize.js
  
  // TODO:: update github Projects
  // TODO:: update github Wiki
  // TODO:: update github Insights / Community
  // TODO:: update github Pages -> demo version

  // TODO:: compact mode - all in one row, Enter for next task + arrows
  // TODO:: mini PC -> server

  // TODO:: image for priority
  // TODO:: image for age
  // TODO:: image for count
  // TODO:: image for delete
  // TODO:: image for factor
  // TODO:: tooltip text for images

  // https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs

  template: `
    <li v-click-outside="onClickOutside">
      <div v-on:click="onLeftClick()" class="task">
        <span>pri: {{ priority }}</span>
        <span>age: {{ timeSinceLastActivity }}</span>
        <span v-if="!expanded">{{ activityCounter }}x</span>
        <span v-if="expanded">
          fac: <input ref="factor" v-on:keyup="inputAdjust()" :value="priorityFactor" @input="$emit('update:priority-factor', $event.target.value)" />
          <button v-on:click="$emit('activity')">{{ activityCounter }}x</button>
          <button v-on:click="$emit('remove')">Del</button>
        </span>
        <textarea ref="message" v-on:keyup="textAreaAdjust()" :value="text" @input="$emit('update:text', $event.target.value)"></textarea>
      </div>
    </li>
  `,

  // https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
  // https://vuejs.org/v2/guide/components.html#sync-Modifier
  // https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c
  props: ['text', 'priority', 'priorityFactor', 'activityCounter', 'lastUpdate', 'lastActivity'],
  data: function () {
    return {
      expanded: false
    }
  },
  computed: {
    timeSinceLastActivity() {
      //return new Date(new Date(this.lastUpdate) - new Date(this.lastActivity)).toLocaleTimeString('en-GB');
      
      var sec_num = Math.floor((new Date(this.lastUpdate) - new Date(this.lastActivity)) / 1000);

      var weeks   = Math.floor(sec_num / 604800);
      var days    = Math.floor((sec_num % 604800) / 86400);
      var hours   = Math.floor((sec_num % 86400) / 3600);
      var minutes = Math.floor((sec_num % 3600) / 60);
      var seconds = Math.floor(sec_num % 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}

      var time = hours+':'+minutes+':'+seconds;

      if(days == 1) {
        time = days+' day '+time;
      }

      if(days > 1) {
        time = days+' days '+time;
      }

      if(weeks == 1) {
        time = weeks+' week '+time;
      }

      if(weeks > 1) {
        time = weeks+' weeks '+time;
      }

      return time;
    }
  },
  methods: {
    onLeftClick() {
      this.expanded = true;

      this.$nextTick(() => {
        this.inputAdjust();
     })
    },
    onClickOutside() {
      if(this.expanded) {
        this.expanded = false;
        this.$emit('outside');
      }
    },
    textAreaAdjust() {
      var o = this.$refs.message;
      o.style.height = "1px";
      o.style.height = (20+o.scrollHeight)+"px";
    },
    inputAdjust() {
      var o = this.$refs.factor;
      o.style.minWidth = "20px";
      var style = window.getComputedStyle(o, null);
      var size = style.getPropertyValue('font-size');
      var font = style.getPropertyValue('font-family');
      o.style.width = getWidthOfText(o.value, size, font)+5+"px";
    }
  },
  mounted(){
    this.textAreaAdjust();
  }
})

//-------------------------------------------------------------------------
// this is the Vue.js app
//-------------------------------------------------------------------------
new Vue({
    el: '#app',
    //-------------------------------------------------------------------------
    // data
    //-------------------------------------------------------------------------
    data: {
      selectedTaskKey: -1,
      newTaskText: '',
      newTaskFactor: 1,
      expanded: false
    },
    //-------------------------------------------------------------------------
    // pouchdb
    //-------------------------------------------------------------------------
    pouchdb: {
      prioritytasklist: {
        localDB: "prioritytasklist",
        remoteURL: "http://127.0.0.1:5984/prioritytasklist"
      }
    },
    //-------------------------------------------------------------------------
    // computed
    //-------------------------------------------------------------------------
    computed: {
      tasks() {
        return this.prioritytasklist.task;
      },
      // https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results
      tasksByPriority() {
        var sortable = [];
        for (var key in this.prioritytasklist.task) {
            sortable.push(this.prioritytasklist.task[key]);
        }
        return sortable.sort((a,b) => b.priority - a.priority);
      }
    },
    //-------------------------------------------------------------------------
    // methods
    //-------------------------------------------------------------------------
    methods: {
      textAreaAdjust() {
        var o = this.$refs.message;
        o.style.height = "1px";
        o.style.height = (20+o.scrollHeight)+"px";
      },
      inputAdjust() {
        var o = this.$refs.factor;
        o.style.minWidth = "20px";
        var style = window.getComputedStyle(o, null);
        var size = style.getPropertyValue('font-size');
        var font = style.getPropertyValue('font-family');
        o.style.width = getWidthOfText(o.value, size, font)+5+"px";
      },
      addNewTask: function () {
        if(this.expanded) {
          this.expanded = false;
        }
        
        if(this.newTaskText == "") {
          return;
        }

        var task = new Task(this.newTaskText, this.newTaskFactor);

        this.$pouchdbRefs.prioritytasklist.put('task', task);

        this.newTaskText = "";
        this.newTaskFactor = 1;
      },
      onLeftClick() {
        this.expanded = true;
  
        this.$nextTick(() => {
          this.inputAdjust();
       })
      },
      onLeftClickTask(key) {
        if(key in this.prioritytasklist.task) {
          this.selectedTaskKey = key;
          //this.newTaskText = this.prioritytasklist.task[key].text;
        }
      },
      deleteSelected() {
        if(this.selectedTaskKey != -1) {
          this.deleteTask(this.selectedTaskKey);
        }
      },
      deleteTask(key) {
        var task = this.prioritytasklist.task[key];

        this.$pouchdbRefs.prioritytasklist.remove(task);

        if(this.selectedTaskKey == key) {
          this.selectedTaskKey = -1;
        }
      },
      updateTask(key) {
        var task = this.prioritytasklist.task[key];

        this.$pouchdbRefs.prioritytasklist.update(task);
      },
      clickOutsideTask(key) {
        this.updateTask(key);

        if(this.selectedTaskKey == key) {
          this.selectedTaskKey = -1;
        }
      },
      onTaskActivity(key) {
        var task = this.prioritytasklist.task[key];

        task.priority = 0;
        task.lastActivity = new Date();
        task.activityCounter++;

        this.$pouchdbRefs.prioritytasklist.update(task);
      }
    },
    beforeCreate(){
      // var found = false; // #1 , vuepouch -> #2
    },
    created(){
      // var found = false; // #3

      setInterval(() => {
        var thisUpdate = new Date();

        for (var key in this.prioritytasklist.task) {
          var task = this.prioritytasklist.task[key];

          var sinceLastUpdate = thisUpdate - new Date(task.lastUpdate);
          task.priority += Number(task.priorityFactor) * Math.round(sinceLastUpdate / 1000);
          task.lastUpdate = thisUpdate;
        }
      }, 1000);
    },
    beforeMount(){
      // var found = false; // #4 , computed -> #5
    },
    mounted(){ // template parsed
      // var found = false; // #6 , vuepouch -> #7 initDB - then

      //this.inputAdjust();
      this.textAreaAdjust();
    },
    beforeUpdate(){
      // var found = false; // #8
    },
    updated(){ // v-for resolved
      // var found = false; // #9
    }
  });