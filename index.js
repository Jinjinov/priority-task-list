
const Question = {
  template: '<div>Question {{ $route.params.question }}</div>'
}

const router = new VueRouter({
  base: '/PriorityTaskList/',
  //mode: 'history',
  routes: [
    // dynamic segments start with a colon
    { path: '/:question' }
  ]
})

Vue.component('task-item', {
  template: '\
    <li v-on:click="onLeftClick()">\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
      {{ selected }}\
    </li>\
  ',
  props: ['title'],
  data: function () {
    return {
      selected: false
    }
  },
  methods: {
    onLeftClick() {
      this.selected = true;
    }
  }
})

// this is the Vue.js app
var app = new Vue({
    el: '#app',
    router,
    watch:{
      '$route.params': function (newVal, oldVal){
        var found = false;
      },
      '$route.params.question': function(newVal, oldVal){
        this.question = newVal;
      }
    },
    //-------------------------------------------------------------------------
    // data
    //-------------------------------------------------------------------------
    data: {
      selectedIndex: -1,
      newTaskText: '',
      tasks: [
        {
          id: 1,
          title: 'Do the dishes',
        },
        {
          id: 2,
          title: 'Take out the trash',
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTaskId: 4
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
      categoriesMap() {
        return this.prioritytasklist.categories;
      },
      categories() {
        return this.prioritytasklist.category;
      },
      answers() {
        return this.prioritytasklist.answer;
      }
    },
    //-------------------------------------------------------------------------
    // methods
    //-------------------------------------------------------------------------
    methods: {
      addNewTask: function () {
        this.tasks.push({
          id: this.nextTaskId++,
          title: this.newTaskText
        })
        this.newTaskText = '';
      },
      onLeftClick(index) {
        this.selectedIndex = index;
        this.newTaskText = this.tasks[index].title;
      },
      deleteSelected() {
        if(this.selectedIndex != -1) {
          this.tasks.splice(this.selectedIndex, 1);
          this.selectedIndex = -1;
          this.newTaskText = '';
        }
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