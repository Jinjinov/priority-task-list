//-------------------------------------------------------------------------
// class Task
//-------------------------------------------------------------------------
class Task {
  constructor(text) {
    this.text = text;
    this.priority = 0;
    this.priorityFactor = 1;
    this.activityCounter = 0;
    this.lastUpdate = new Date();
    this.lastActivity = new Date();
  }
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
// task-item
//-------------------------------------------------------------------------
Vue.component('task-item', {
  // https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d
  // https://sebastiandedeyne.com/posts/2016/dealing-with-templates-in-vue-20

  // https://stackoverflow.com/questions/36170425/detect-click-outside-element/36180348
  // https://jsfiddle.net/70vm3jrd/1/

  // https://stackoverflow.com/questions/11805352/floatleft-vs-displayinline-vs-displayinline-block-vs-displaytable-cell
  // https://stackoverflow.com/questions/15172520/advantages-of-using-displayinline-block-vs-floatleft-in-css
  template: `
    <li v-click-outside="onClickOutside">
      <div v-on:click="onLeftClick()">
        <p>{{ priority }}</p><p>{{ timeSinceLastActivity }}</p><p>{{ activityCounter }}</p>
        <textarea :value="text" @input="$emit('update:text', $event.target.value)" />
      </div>
      <div v-if="expanded">
        <input :value="priorityFactor" @input="$emit('update:priorityFactor', $event.target.value)" /><button v-on:click="$emit('activity')">Task done</button><button v-on:click="$emit('remove')">Delete</button>
      </div>
    </li>
  `,

  // TODO:: save changes
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
      return Math.round((this.lastUpdate - this.lastActivity) / 1000);
    }
  },
  watch: {
    text(val, oldval) {
      this.$emit('update:text', val);
    },
    priorityFactor(val, oldval) {
      this.$emit('update:priorityFactor', val);
    }
  },
  methods: {
    onLeftClick() {
      this.expanded = true;
    },
    onClickOutside() {
      this.expanded = false;
    }
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
      newTaskText: ''
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
        return sortable.sort((a,b) => a.priority - b.priority);
      }
    },
    //-------------------------------------------------------------------------
    // methods
    //-------------------------------------------------------------------------
    methods: {
      addNewTask: function () {
        var task = new Task(this.newTaskText);

        this.$pouchdbRefs.prioritytasklist.put('task', task);

        this.newTaskText = '';
      },
      onLeftClick(key) {
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

          var sinceLastUpdate = thisUpdate - task.lastUpdate;
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
    },
    beforeUpdate(){
      // var found = false; // #8
    },
    updated(){ // v-for resolved
      // var found = false; // #9
    }
  });