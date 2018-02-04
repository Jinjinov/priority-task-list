//-------------------------------------------------------------------------
// click-outside
//-------------------------------------------------------------------------
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
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

  // TODO:: collapse on click outside
  // https://stackoverflow.com/questions/36170425/detect-click-outside-element/36180348
  // https://jsfiddle.net/70vm3jrd/1/

  // template literal:
  template: `
    <li>
      <div v-on:click="onLeftClick()">
        <p>{{ priority }}</p>
        <p>{{ timeSinceLastActivity }}</p>
        <p>{{ activityCounter }}</p>
        <textarea v-model='taskText' />
      </div>
      <div v-if="expanded">
        <input v-model='priorityFactor' />
        <button v-on:click="onTaskActivity()">Task done</button>
        <button v-on:click="$emit('remove')">Delete</button>
      </div>
    </li>
  `,

  // TODO:: save changes
  // https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
  props: ['taskText'],
  data: function () {
    return {
      expanded: false,
      priority: 0,
      priorityFactor: 1,
      activityCounter: 0,
      lastUpdate: new Date(),
      lastActivity: new Date(),
      timeSinceLastActivity: new Date()
    }
  },
  methods: {
    onLeftClick() {
      this.expanded = !this.expanded;
    },
    onTaskActivity() {
      this.priority = 0;
      this.lastActivity = new Date();
      this.activityCounter++;
    }
  },
  created () {
    // TODO:: move to main Vue app
    setInterval(() => {
      var thisUpdate = new Date();
      var sinceLastUpdate = thisUpdate - this.lastUpdate;
      this.priority += Number(this.priorityFactor) * Math.round(sinceLastUpdate / 1000);
      this.lastUpdate = thisUpdate;

      this.timeSinceLastActivity = Math.round((thisUpdate - this.lastActivity) / 1000);
    }, 1000)
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
      // TODO:: sort by priority
      // https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results
      tasks() {
        return this.prioritytasklist.task;
      }
    },
    //-------------------------------------------------------------------------
    // methods
    //-------------------------------------------------------------------------
    methods: {
      addNewTask: function () {
        var task = {
          taskText: this.newTaskText
        };

        this.$pouchdbRefs.prioritytasklist.put('task', task);

        this.newTaskText = '';
      },
      onLeftClick(key) {
        if(key in this.prioritytasklist.task) {
          this.selectedTaskKey = key;
          //this.newTaskText = this.prioritytasklist.task[key].taskText;
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

        this.newTaskText = '';
      }
    },
    beforeCreate(){
      var found = false; // #1 , vuepouch -> #2
    },
    created(){
      var found = false; // #3
    },
    beforeMount(){
      var found = false; // #4 , computed -> #5
    },
    mounted(){ // template parsed
      var found = false; // #6 , vuepouch -> #7 initDB - then
    },
    beforeUpdate(){
      var found = false; // #8
    },
    updated(){ // v-for resolved
      var found = false; // #9
    }
  });