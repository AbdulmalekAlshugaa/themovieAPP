import { makeObservable, observable, action } from "mobx";

interface Todo {
  id: number;
  text: string;
}

class TodoStore {
  todoList: Todo[] = [];

  constructor() {
    // Make the todoList observable
    makeObservable(this, {
      todoList: observable,
      addTodo: action,
      removeTodo: action,
    });
  }

  // Action to add a new todo
  addTodo = (newTodo: Todo): void => {
    this.todoList.push(newTodo);
  };

  // Action to remove a todo
  removeTodo = (todoId: number): void => {
    this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
  };
}

// Create an instance of the TodoStore
const todoStore = new TodoStore();

export default todoStore;
