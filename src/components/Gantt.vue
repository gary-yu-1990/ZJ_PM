<template>
  <div ref="gantt" class="ganttContainer"></div>
</template>

<script>
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/locale/locale_cn' ; // 本地化
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },

  mounted: function () {
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      this.$emit('task-updated', id, 'inserted', task)
    })

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      this.$emit('task-updated', id, 'updated', task)
    })

    gantt.attachEvent('onAfterTaskDelete', (id) => {
      this.$emit('task-updated', id, 'deleted')
      if(!gantt.getSelectedId()) {
        this.$emit('task-selected', null)
      }
    })

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      this.$emit('link-updated', id, 'inserted', link)
    })

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      this.$emit('link-updated', id, 'updated', link)
    })

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      this.$emit('link-updated', id, 'deleted')
    })
    gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks)
  }
}
</script>


<style scoped >
  .left-ganttContainer {
    height: 600px;
  }
</style>