<template>
   <div class="container">
    <div class="right-container">
      <ul class="gantt-messages">
        <li class="gantt-message" v-for="message in messages">{{message}}</li>
      </ul>
    </div>
    <gantt class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate"></gantt>
  </div>
</template>

<script>
import Gantt from '../components/Gantt.vue';

export default {
  name: 'ProjectManager',
  components: {Gantt},
  data () {
    return {
      tasks: {
        data: [
          {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
          {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
       messages: []
    }
  },
    methods: {  
    addMessage (message) {
      this.messages.unshift(message)
      if(this.messages.length > 40) {
        this.messages.pop()
      }
    },

    logTaskUpdate (id, mode, task) {
      let text = (task && task.text ? ' (${task.text})': '')
      let message = 'Task ${mode}: ${id} ${text}'
      this.addMessage(message)
    },

    logLinkUpdate (id, mode, link) {
      let message = 'Link ${mode}: ${id}'
      if(link){
        message += ' ( source: ${link.source}, target: ${link.target} )'
      }
      this.addMessage(message)
    }
  }
}
</script>


<style scoped >
  .left-container {
    height: 600px;
  }
</style>