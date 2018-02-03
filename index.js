
//-------------------------------------------------------------------------
// task-item
//-------------------------------------------------------------------------
Vue.component('task-item', {
  // https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d
  // https://sebastiandedeyne.com/posts/2016/dealing-with-templates-in-vue-20

  // TODO::
  // - expanded mode
  // - sort by priority

  // template literal:
  template: `
    <li>
      <div v-on:click="onLeftClick()">
        {{ priority }}
        <textarea v-model='taskText' />
      </div>
      <div v-if="expanded">
        <input v-model='priorityFactor' />
        <button v-on:click="resetPriority()">Reset Priority</button>
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
      date: new Date().toDateString(),
      time: new Date().toTimeString()
    }
  },
  methods: {
    onLeftClick() {
      this.expanded = !this.expanded;
    },
    resetPriority() {
      this.priority = 0;
    }
  },
  created () {
    setInterval(() => {
      this.date = new Date().toDateString();
      this.time = new Date().toTimeString();
      this.priority += Number(this.priorityFactor);
    }, 1000)
  }
})

//-------------------------------------------------------------------------
// this is the Vue.js app
//-------------------------------------------------------------------------
var app = new Vue({
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