# Procrastinator's Task List
Priority Task List is a Progressive Web App (PWA) written with Vue.js and PouchDB

https://github.com/vuejs/vue

https://github.com/pouchdb/pouchdb

https://github.com/sadick254/vuepouch

https://github.com/apache/couchdb

https://developers.google.com/web/progressive-web-apps/

https://www.asp.net/single-page-application

## Why another "Task List" when there are already more than 30 others out there?

Many other task lists allow you to schedule a repeating task:

[ ] Water the cactus | Repeat every 14 days

[ ] Go to the gym | Repeat every 2 days

If you skip the task, you will just get another alert in 2 days and if you skip many tasks, you will get many more alerts. This constant nagging (and ignoring) isn't very motivational. When you finally manage to complete one task, the sense of reward feels shallow, because now you have many ✕ and one ✓ for that task on you calendar.

**Procrastinator's Task List** will not give you another alert if you don't do a task. Instead, the task's priority will continue to rise (with a specified factor) until you complete it. The task with the highest priority will always be on the top of your list. To make one task more important than another, simply give it a higher priority factor.