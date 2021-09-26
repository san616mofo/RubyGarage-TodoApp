<template>
  <div class="container mx-auto overflow-hidden border border-gray-100 border-solid rounded-sm shadow-xl
  2xl:max-h-80vh xl:max-h-80vh lg:max-h-80vh md:max-h-screen sm:max-h-screen">
    <div class="grid min-h-750px 2xl:grid-rows-1 xl:grid-rows-1 lg:grid-rows-1 md:grid-rows-2 sm:grid-rows-2">
      <div class="grid 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-1 sm:grid-cols-1">
        <div class="p-0 2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-full sm:col-span-full">
          <LeftSection class="p-3" user="RubyGarage" :todoTags="todoTags" :todos="todos"/>
        </div>
        <div class="p-0 2xl:col-span-9 xl:col-span-9 lg:col-span-9 md:col-span-full sm:col-span-full">
          <div class="h-full p-5 overflow-x-hidden overflow-y-scroll bg-white max-h-80vh no-scrollbar">
            <div class="mb-2 text-2xl font-medium">Todos List</div>
            <div class="flex">
              <input
                  type="text"
                  class="flex-grow flex-shrink py-4 pl-2 pr-4 m-0 text-xl font-normal leading-5 border-none
                  shadow focus:outline-none bg-gray-50"
                  v-model="newTodo"
                  placeholder="Enter your todos"
                  autocomplete="off"
                  @keyup.enter="addTodo()"
              />
              <button
                  class="px-4 py-2 ml-4 font-semibold text-blue-500 bg-transparent border border-blue-500 rounded
                  hover:bg-blue-500 hover:text-white hover:border-transparent"
                  @click="addTodo()">
                Save
              </button>
            </div>
            <div class="flex items-center mt-2 h-9">
              <div v-for="tag in todoTags" :key="tag" class="flex inline-block mr-2">
                <input
                    type="radio"
                    v-model="newTodoTag"
                    :id="tag"
                    :value="tag"
                    :class="tag"
                    class="hidden"
                />
                <label
                    class="p-1 transition duration-700 ease-out border-2 border-gray-200 border-solid outline-none
                    cursor-pointer rounded-2xl"
                    :for="tag"
                    :class="tag">
                </label>
              </div>
            </div>
            <TodosList :todos="todos" display="active"/>
            <TodosList :todos="todos" display="completed"/>
            <div class="flex flex-col items-center py-5">
              <span
                  class="text-xs font-hairline tracking-widest text-gray-500 cursor-pointer"
                  @click="clearAll()">
                Clear all
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSection from "../components/LeftSection.vue";
import TodosList from "../components/TodosList.vue";

export default {
  components: {
    LeftSection,
    TodosList
  },
  name: "Main",
  props: {},
  data() {
    return {
      todoStorage: {
        STORAGE_KEY: "todos-vuejs",
        uid: 0
      },
      todos: [],
      todoTags: ["all", "red", "orange", "yellow", "green", "blue", "purple"],
      newTodo: "",
      newTodoTag: "all",
      hoverTodo: ""
    };
  },
  "created": function () {
    this.todos = this.fetch();
  },
  watch: {
    todos: {
      "handler": function (todos) {
        this.save(todos);
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    fetch: function () {
      let todos = JSON.parse(
          localStorage.getItem(this.todoStorage.STORAGE_KEY) || "[]"
      );
      todos.forEach(function (todo, index) {
        todo.id = index;
      });
      this.todoStorage.uid = todos.length;
      return todos;
    },
    save: function (todos) {
      localStorage.setItem(this.todoStorage.STORAGE_KEY, JSON.stringify(todos));
    },
    addTodo: function () {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) return;
      this.todos.push({
        id: this.todoStorage.uid++,
        title: value,
        completed: false,
        tag: this.newTodoTag
      });
      this.newTodo = "";
    },
    clearAll: function () {
      this.todos = [];
    }
  }
};
</script>

<style lang="sass">
label
  &.all
    background-color: #ffffff

  &.red
    background-color: #ee5b65

  &.orange
    background-color: #f49c59

  &.yellow
    background-color: #fff59d

  &.green
    background-color: #72bc6a

  &.blue
    background-color: #3cafe7

  &.purple
    background-color: #be82c6
</style>