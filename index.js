
//-------------------------------------------------------------------------
// task-item
//-------------------------------------------------------------------------
Vue.component('task-item', {
  // TODO:: real html template

  // TODO:: add div, margin, padding
  template: '\
    <li v-on:click="onLeftClick()">\
      <textarea v-if="expanded" v-model=\'title\' />\
      <input v-else v-model=\'title\' />\
      <button v-on:click="$emit(\'remove\')">X</button>\
      {{ expanded }}\
    </li>\
  ',
  // TODO:: save changes
  props: ['title'],
  data: function () {
    return {
      expanded: false
    }
  },
  methods: {
    onLeftClick() {
      this.expanded = !this.expanded;
    }
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
          title: this.newTaskText
        };
        //this.tasks.push(task);

        this.$pouchdbRefs.prioritytasklist.put('task', task);

        this.newTaskText = '';
      },
      onLeftClick(key) {
        //if(0 < index && index < this.tasks.length) {
        if(key in this.prioritytasklist.task) {
          this.selectedTaskKey = key;
          //this.newTaskText = this.tasks[index].title;
          this.newTaskText = this.prioritytasklist.task[key].title;
        }
      },
      deleteSelected() {
        if(this.selectedTaskKey != -1) {
          this.deleteTask(this.selectedTaskKey);
        }
      },
      deleteTask(key) {
        //var task = this.tasks[this.selectedIndex];

        var task = this.prioritytasklist.task[key];

        this.$pouchdbRefs.prioritytasklist.remove(task);

        //this.tasks.splice(this.selectedIndex, 1);

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