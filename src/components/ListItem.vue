<template>
  <tr :key="task.id">
    <td><router-link :to="{name: 'edit', params: {id: task.id}}">{{idx + 1}}</router-link></td>
    <td>{{task.title}}</td>
    <td class="description-len">
      <div class="text">{{task.description}}</div>
    </td>
        <td>{{new Date(this.task.dats).toLocaleDateString()}}</td>
    <td>{{task.status}}</td>
    <td>
      <router-link :to="{name: 'edit', params: {id: task.id}}" class="waves-effect waves-light btn">
        <i class="material-icons left">edit</i>
        Open
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ListItem',
  props: [
      'idx',
      'task'
  ]
}
</script>

<style scoped>
  .description-len {
    float: left;
    max-width: 450px;
  }
  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>