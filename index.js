/* global Vue tasks */

// The JSON standard specifies that all key/value pairs should be in double quotes.

//-------------------------------------------------------------------------
// class Task
//-------------------------------------------------------------------------
class Task {
  constructor(text, factor, group) {
    this.text = text;
    this.group = group;
    this.priority = 0;
    this.priorityFactor = factor;
    this.paused = false;
    this.activityCounter = 0;
    this.lastActivity = new Date();
    this.lastUpdate = new Date();
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
// compact-task-item
//-------------------------------------------------------------------------
Vue.component('compact-task-item', {

  template: `
    <div class="task-compact" v-bind:style="{ 'background-color': color }">
      <div v-html="autolinkedText" aria-label="Task text" class="task-compact-textarea" v-bind:style="{ 'background-color': color }"></div>
      <button v-on:click="$emit('activity')">
        <img src="icons/count.png" alt="Number of times task was completed" title="Number of times task was completed" height="20" width="20">{{ activityCounter }}x
      </button>
    </div>
  `,

  props: ['text', 'activityCounter', 'color'],

  computed: {
    autolinkedText() {
      return this.text.autoLink({ target: "_blank", onclick: "event.stopPropagation();" });
    }
  }
})

//-------------------------------------------------------------------------
// task-item
//-------------------------------------------------------------------------
Vue.component('task-item', {

  template: `
    <div v-on:click="onLeftClick()" v-click-outside="onClickOutside" class="task" v-bind:style="{ 'background-color': color }">
      <div class="task-top-row">
        <span class="task-top-row-span">
          <img src="icons/priority.png" alt="Task priority" title="Task priority" height="20" width="20"> {{ priority }}
        </span>
        <span class="task-top-row-span">
          <img src="icons/age.png" alt="Time since task was last completed" title="Time since task was last completed" height="20" width="20"> {{ timeSinceLastActivity.weeks }}
          <img src="icons/week.png" alt="Weeks since task was last completed" title="Weeks since task was last completed" height="20" width="20"> {{ timeSinceLastActivity.days }}
          <img src="icons/day.png" alt="Days since task was last completed" title="Days since task was last completed" height="20" width="20"> {{ timeSinceLastActivity.time }}
        </span>
        <span v-if="!expanded" class="task-top-row-span">
          <img src="icons/count.png" alt="Number of times task was completed" title="Number of times task was completed" height="20" width="20">{{ activityCounter }}x
        </span>
        <span v-if="expanded" class="task-top-row-span">
          <img src="icons/increase.png" alt="Task priority factor" title="Task priority factor" height="20" width="20">
          <input type="text" ref="factor" v-on:input="inputAdjust()" :value="priorityFactor" @input="$emit('update:priority-factor', $event.target.value)" aria-label="Task factor" class="task-top-row-input" />%
        </span>
        <span v-if="expanded" class="task-top-row-span">
          <img src="icons/tag.png" alt="Task group" title="Task group" height="20" width="20">
          <select :value="group" @input="$emit('update:group', $event.target.value)">
            <option v-for="(value, key) in this.$parent.taskGroups" v-bind:value="key" v-bind:style="{ 'background-color': value }">
              {{ key }}
            </option>
          </select>
        </span>
        <button v-if="expanded" v-on:click="$emit('toggle')" class="task-top-row-button">
          <img v-if="!paused" src="icons/pause.png" alt="Pause task" title="Pause task" height="20" width="20">
          <img v-if="paused" src="icons/play.png" alt="Resume task" title="Resume task" height="20" width="20">
        </button>
        <button v-if="expanded" v-on:click="$emit('activity')" class="task-top-row-button">
          <img src="icons/count.png" alt="Number of times task was completed" title="Number of times task was completed" height="20" width="20">{{ activityCounter }}x
        </button>
        <button v-if="expanded" v-on:click="$emit('remove')" class="task-top-row-button">
          <img src="icons/delete.png" alt="Delete task" title="Delete task" height="20" width="20">
        </button>
        <button v-if="expanded" v-on:click="$emit('save')" class="task-top-row-button">
          <img src="icons/save.png" alt="Save task" title="Save task" height="20" width="20">
        </button>
      </div>
      <textarea v-if="expanded" ref="message" v-on:input="textAreaAdjust()" :value="text" @input="$emit('update:text', $event.target.value)" aria-label="Task text" class="task-textarea" v-bind:style="{ 'background-color': color }"></textarea>
      <div v-else v-html="autolinkedText" aria-label="Task text" class="task-formatted-textarea" v-bind:style="{ 'background-color': color }"></div>
    </div>
  `,

  props: ['text', 'group', 'priority', 'priorityFactor', 'paused', 'activityCounter', 'lastUpdate', 'lastActivity', 'color'],
  data: function () {
    return {
      expanded: false
    }
  },
  computed: {
    autolinkedText() {
      return this.text.autoLink({ target: "_blank", onclick: "event.stopPropagation();" });
    },
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

      var obj = {
        weeks:  weeks,
        days: days,
        time: time
      };

      return obj;
    }
  },
  methods: {
    onLeftClick() {
      if(!this.expanded) {
        this.expanded = true;

        this.$nextTick(() => {
          this.inputAdjust();
          this.textAreaAdjust();
        })
      }
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
      o.style.height = (o.scrollHeight)+"px";
      o.focus();
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
    // this.textAreaAdjust();
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
      //selectedTaskKey: -1,
      newTaskText: '',
      newTaskFactor: 50,
      newTaskGroup: 'all',
      expanded: false,
      expandedMenu: false,
      expandedHelp: false,
      compactMode: false,

      selectedGroup: 'all',
      taskGroups: {
        'all': "silver",
        'relax / enjoy': "#d7fea8",
        'cook / eat': "#fefea6",
        'chores': "#feda9c",
        'mind': "#9ec2fe",
        'grooming': "#bafeee",
        'body': "#9ce0fe"
      }
    },
    //-------------------------------------------------------------------------
    // pouchdb
    //-------------------------------------------------------------------------
    pouchdb: {
      prioritytasklist: {
        localDB: "prioritytasklist",
        remoteURL: "http://93.103.155.251:5984/prioritytasklist"
      }
    },
    //-------------------------------------------------------------------------
    // computed
    //-------------------------------------------------------------------------
    computed: {
      tasks() {
        return this.prioritytasklist.task;
      },
      
      tasksByPriority() {
        var sortable = [];
        for (var key in this.prioritytasklist.task) {
          var task = this.prioritytasklist.task[key];
          if(this.selectedGroup == 'all' || task.group == this.selectedGroup) {
            sortable.push(task);
          }
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
        o.style.height = (o.scrollHeight)+"px";
      },
      inputAdjust() {
        var o = this.$refs.factor;
        o.style.minWidth = "20px";
        var style = window.getComputedStyle(o, null);
        var size = style.getPropertyValue('font-size');
        var font = style.getPropertyValue('font-family');
        o.style.width = getWidthOfText(o.value, size, font)+5+"px";
      },
      addAllTasks() {
        for(var key in tasks) {
          var task = new Task(tasks[key].text, tasks[key].priorityFactor, tasks[key].group);
          this.$pouchdbRefs.prioritytasklist.put('task', task);
        }
      },
      addNewTask() {
        if(this.expanded) {
          this.expanded = false;
        
          if(this.newTaskText == "") {
            this.newTaskGroup = "all";
            this.newTaskFactor = 50;
            return;
          }

          var task = new Task(this.newTaskText, this.newTaskFactor, this.newTaskGroup);
          this.$pouchdbRefs.prioritytasklist.put('task', task);

          this.newTaskText = "";
          this.newTaskGroup = "all";
          this.newTaskFactor = 50;
        }
      },
      onLeftClick() {
        if(!this.expanded) {
          this.expanded = true;
    
          this.$nextTick(() => {
            this.inputAdjust();
          })
        }
      },
      //onLeftClickTask(key) {
      //  if(key in this.prioritytasklist.task) {
      //    this.selectedTaskKey = key;
      //  }
      //},
      //deleteSelected() {
      //  if(this.selectedTaskKey != -1) {
      //    this.deleteTask(this.selectedTaskKey);
      //  }
      //},
      deleteTask(key) {
        var task = this.prioritytasklist.task[key];
        this.$pouchdbRefs.prioritytasklist.remove(task);

        //if(this.selectedTaskKey == key) {
        //  this.selectedTaskKey = -1;
        //}
      },
      updateTask(key) {
        var task = this.prioritytasklist.task[key];
        this.$pouchdbRefs.prioritytasklist.update(task);
      },
      clickOutsideTask(key) {
        this.updateTask(key);

        //if(this.selectedTaskKey == key) {
        //  this.selectedTaskKey = -1;
        //}
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
          if(!task.paused) {
            task.priority += Number(task.priorityFactor) * Math.round(sinceLastUpdate / 1000);
          }
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