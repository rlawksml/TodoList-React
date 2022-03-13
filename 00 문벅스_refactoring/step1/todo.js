'use strict'

// localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기.따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

import {
  $
} from './dom.js'
import Store from './LocalStorage.js'

const $inputTag = $('#todo-form')
const $userInputTag = $('#todo-input')
const $todoList = $('#todo-list')
const $allItem = $('.all-item')
const $activeItem = $('.active-item')
const $completedItem = $('.completed-item')

function App() {

  this.Todos = []

  this.init = () => {
    if (Store.load('todolist')) {
      this.Todos = Store.load('todolist')
      itemRender(this.Todos)
    }
    initEventListner()
    CountTodos()
  }

  const itemRender = (todo) => {
    const template = todo.map((item, index) => {
      if (item.text.trim('') !== "") {
        return `<li data-index="${index}" class="${item.completed && "completed"}" >
        <div class="view">
          <input id=${index} class="toggle" type="checkbox" ${item.completed && 'checked'}/>
          <label class="label">${item.text}</label>
          <button class="destroy">X</button>
        </div>
        <input class="edit" value="${item.text}" />
        </li>`
      }

    }).join("")

    $todoList.innerHTML = (template)
    $userInputTag.value = ""
    CountTodos()

    Store.save('todolist', this.Todos)
  }

  // complete Item
  const CompleteTodo = (curItem, idx) => {
    if (!curItem.classList.contains('completed')) {
      this.Todos[idx].completed = true
    } else {
      this.Todos[idx].completed = false
    }
    itemRender(this.Todos)
  }

  // Delete Item
  const DeleteTodo = (e, idx) => {
    e.target.closest('li').remove()
    this.Todos.splice(idx, 1)
    itemRender(this.Todos)
  }

  // Count Items
  const CountTodos = () => {
    $('.count-item').innerHTML = "오늘 할 일 " + $todoList.querySelectorAll('li').length + "개"
  }


  const ShowAllItems = () => {
    const addedItemList = [...$todoList.querySelectorAll('li')]

    addedItemList.map((item) => {
      // item.className === "completed" 및의 조건식과 동일함
      item.style.display = "block"
    })
  }

  const ShowLeftItems = () => {
    // html collection 을 배열로 배꾸기
    // array.from을 사용 또는 ... 스레드 사용하기
    const addedItemList = [...$todoList.querySelectorAll('li')]

    addedItemList.map((item) => {
      if (item.classList.contains("completed")) {
        item.style.display = "none"
      } else {
        item.style.display = "block"
      }
    })
  }

  const ShowCompletedItes = () => {
    const addedItemList = [...$todoList.querySelectorAll('li')]

    addedItemList.map((item) => {
      if (!item.classList.contains("completed")) {
        item.style.display = "none"
      } else {
        item.style.display = "block"
      }
    })
  }

  const UpdateItem = (e) => {
    e.target.closest('li').classList.add('editing')
    const idx = e.target.closest('li').dataset.index
    const $curItemEditInput = e.target.closest('li').querySelector('.edit')

    const prevText = e.target

    $curItemEditInput.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        prevText.innerText = e.target.value

        this.Todos[idx].text = e.target.value
        e.target.closest('li').classList.remove('editing')

        this.Todos[idx].text = e.target.value
        itemRender(this.Todos)
      } else if (e.key == 'Escape') {
        e.target.closest('li').classList.remove('editing')
        e.target.value = prevText.innerText
      }
    })



  }

  // init 이벤트 리스너
  const initEventListner = () => {
    $inputTag.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoText = e.target.querySelector('input').value;
      this.Todos.push({
        text: todoText
      })
      itemRender(this.Todos);
    })

    // li item 이벤트 위임
    $todoList.addEventListener('click', (e) => {
      const $curTodoItem = e.target.closest('li')
      const idx = e.target.closest('li').dataset.index

      // 완료
      if (e.target.classList.contains('toggle')) {
        CompleteTodo($curTodoItem, idx);
      }
      // 삭제
      if (e.target.classList.contains('destroy')) {
        DeleteTodo(e, idx);
        CountTodos();
      }

      // li 더블클릭
      if ($curTodoItem) {
        e.target.addEventListener('dblclick', UpdateItem)
      }
    })
    // footer 이벤트
    $allItem.addEventListener('click', ShowAllItems)
    $activeItem.addEventListener('click', ShowLeftItems)
    $completedItem.addEventListener('click', ShowCompletedItes)
  }
}

const TodoWork = new App()
TodoWork.init();