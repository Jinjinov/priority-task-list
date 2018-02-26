# Procrastinator's Task List

Priority Task List is a Progressive Web App (PWA) written with Vue.js and PouchDB

https://github.com/vuejs/vue

https://github.com/pouchdb/pouchdb

https://github.com/sadick254/vuepouch

https://github.com/apache/couchdb

## Why another "Task List" when there are already more than 30 others out there?

Many other task lists allow you to schedule a repeating task:

[ ] Water the cactus | Repeat every 14 days

[ ] Go to the gym | Repeat every 2 days

If you skip the task, you will just get another alert in 2 days and if you skip many tasks, you will get many more alerts. This constant nagging (and ignoring) isn't very motivational. When you finally manage to complete one task the sense of reward feels shallow because now you have many ✕ and one ✓ for that task on your calendar. **Most importantly:** you have no obvious clue about which task you are negelecting the most (until you check all the tasks).

**Procrastinator's Task List** will not give you another alert if you don't do a task. Instead, the task's priority will continue to rise (with a specified factor) until you complete it. The task with the highest priority will always be on the top of your list. To make one task more important than another, simply give it a higher priority factor. **Most importantly:** when you complete a task it moves to the bottom and on the top is the task that needs your attention the most.

## Features:

- single page application - https://www.asp.net/single-page-application
- progressive web app - https://developers.google.com/web/progressive-web-apps/
- works offline
- auto sync online
- icon and shortcut for mobile phones
- prioritized activity list
<!-- -->
- task are sorted by priority
- priority of a task is increased based on a priority factor
- each task has a counter that show how many times it has been completed
- you can see how much time has elapsed since the task was last completed

## TODO:

- pause task priority growth
- repeat interval
- scheduled time / date
- compact mode - one row per task
- vue-linkify - https://github.com/phanan/vue-linkify
- vue-authenticate - https://github.com/dgrubelic/vue-authenticate
- one database per user - https://gist.github.com/nolanlawson/9676093
- labels / groups with base priority offset
- suggested priority factor based on frequency