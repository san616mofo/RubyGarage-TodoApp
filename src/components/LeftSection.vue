<template>
  <div class="h-full bg-gray-100 border-r-2 border-gray-100 border-solid">
    <div class="flex flex-col items-center font-medium tracking-wide">
      Hi, {{ user }}!
      <div class="text-xs font-hairline tracking-widest text-gray-500">{{ date }}</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="w-9/12 p-px my-2 bg-gray-300"></div>
    </div>
    <div class="mb-2 text-xs font-hairline tracking-widest text-gray-500">Tag</div>
    <ul class="list-none">
      <li v-for="tag in this.todoTags" :key="tag.id" :class="tag" class="flex items-center m-1">
        <label
            :class="tag"
            class="mr-3 p-1.5 border-4 border-solid border-gray-200 rounded-2xl shadow-2xl outline-none transition ease-out duration-700 cursor-pointer">
        </label>
        <span>{{ tag.charAt(0).toUpperCase() + tag.slice(1) }}</span>
        <span class="ml-auto text-xs font-hairline tracking-widest text-gray-500">{{ todosLength(tag) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftSection",
  props: {
    user: String,
    todos: Array,
    todoTags: Array
  },
  computed: {
    date: () => new Date().toDateString()
  },
  methods: {
    todosLength(tag) {
      return this.todos.filter(todo => todo.tag === tag).length;
    }
  }
};
</script>