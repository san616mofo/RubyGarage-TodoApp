<template>
  <div class="mt-2">
    <div class="flex items-center justify-between p-2">
      <strong>{{ headerMsg }}</strong>
      <span class="pt-1 ml-3 mr-auto text-xs font-hairline tracking-widest text-gray-500">
        {{ filteredTodos.length }}/{{ todos.length }}
      </span>
      <span @click="hide = !hide" class="cursor-pointer">
        <strong v-if="hide === false" @click="hideTodosList()">Hide</strong>
        <strong v-else>Show</strong>
      </span>
    </div>
    <div>
      <ul class="list-none" v-if="!hide">
        <li v-for="todo in filteredTodos"
            :key="todo.id"
            @mouseenter="hoverTodo = todo.id"
            @mouseleave="hoverTodo = null">
          <div class="relative flex p-2 m-2 overflow-x-hidden border border-gray-100 border-solid">
            <input type="checkbox" v-model="todo.completed" @input="toggleTodo(todo)"/>
            <div class="flex flex-wrap ml-3">
              <div class="break-all">{{ todo.title }}</div>
              <div class="w-9/12 p-px bg-transparent"></div>
              <div class="flex items-center" v-if="todo.tag !== 'all' || todo.completed">
                <label
                    class="p-1 mr-4 transition duration-700 ease-out border-2 border-gray-200 border-solid outline-none cursor-pointer rounded-2xl"
                    :class="todo.tag">
                </label>
                <!-- todo.time чомусь працює через раз і не там де потрібно -->
                <span
                    class="text-xs font-hairline tracking-widest text-gray-500"
                    v-if="todo.time">
                  {{ todo.time }}
                </span>
              </div>
            </div>
            <div class="w-8 h-6 ml-auto overflow-hidden">
              <div class="flex items-center justify-between w-full h-full pr-1 cursor-pointer">
                <button @click="removeTodo(todo)">🗑️</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let filters = {
  "all": function (todos) {
    return todos;
  },
  "active": function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed && !todo.starred && !todo.secret;
    });
  }
};
let header = {
  active: "Active",
  completed: "Completed"
};
export default {
  name: "TodosList",
  props: {
    todos: Array,
    display: String
  },
  data() {
    return {
      hoverTodo: null,
      hide: false,
      starIcon: ["far", "star"],
      trashIcon: ["far", "trash-alt"]
    };
  },
  computed: {
    filteredTodos: function () {
      return filters[this.display](this.todos);
    },
    headerMsg: function () {
      return header[this.display];
    }
  },
  methods: {
    toggleTodo: function (todo) {
      if (todo.completed) {
        todo.time = new Date().toLocaleString("en-US").replace(",", "");
      } else {
        todo.time = null;
      }
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    hideTodosList: function () {
    }
  }
};
</script>