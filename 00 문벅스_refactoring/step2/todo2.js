'use strict';

import {
  $
} from './dom.js';
import Store from './LocalStorage.js';

const $inputTag = $('#todo-form');
const $userInputTag = $('#todo-input');
const $todoList = $('#todo-list');
const $allItem = $('.all-item');
const $activeItem = $('.active-item');
const $completedItem = $('.completed-item');

const $userTitle = $('.test')

// user selec button
const $userList = $('#user-list');

// user create delete button
const $userCreateBtn = $('#create-user-btn');
const $userDeleteBtn = $('#delete-user-btn');

function App() {
  this.currentUser = '';

  this.userList = []

  this.Todos = {
    // user0: [],
  };

  this.init = () => {
    if (Store.load('userlist').length >= 1) {
      this.userList = Store.load('userlist')
      this.currentUser = this.userList[0]
      renderUser(this.userList)

      this.Todos = Store.load('todolist');
      itemRender(this.Todos[this.currentUser]);

    }
    // else {
    //   this.userList.map(users => {
    //     this.Todos[users] = []
    //   })
    // }
    initEventListner();
    CountTodos();
  };

  const User = {
    createUser: () => {
      const newUserName = prompt('사용자 이름 입력');
      if (newUserName.length >= 2) {
        this.Todos[newUserName] = [];
        this.userList.push(newUserName)
        renderUser(this.userList);
        this.currentUser = newUserName

        ChangeUserTitle()
        Store.save('userlist', this.userList)
      } else {
        alert('사용자 이름은 2글자 이상 입력');
        return;
      }
    },
    deleteUser: () => {
      this.userList = this.userList.filter((item) => {
        return item != this.currentUser
      })

      delete this.Todos[this.currentUser]
      renderUser(this.userList)

      if (this.userList[0]) {
        this.currentUser = this.userList[0]
        itemRender(this.Todos[this.currentUser])
      }
      ChangeUserTitle()
      Store.save('todolist', this.Todos);
      Store.save('userlist', this.userList)
    },
  };

  const ChangeUserTitle = () => {
    $userTitle.innerText = `${this.currentUser}의 할일 목록`
  }

  const itemRender = (todo) => {
    const template = todo.map((item, index) => {
        if (item.text.trim('') !== '') {
          return `<li data-index="${index}" class="${item.completed && 'completed'}" >
        <div class="view">
          <input id=${index} class="toggle" type="checkbox" ${item.completed && 'checked'}/>
          <label class="label">${item.text}</label>
          <button class="destroy">X</button>
        </div>
        <input class="edit" value="${item.text}" />
        </li>`;
        }
      })
      .join('');

    $todoList.innerHTML = template;
    $userInputTag.value = '';
    CountTodos();
    ChangeUserTitle()

    Store.save('todolist', this.Todos);
  };

  // user 생성
  const renderUser = () => {
    const template = this.userList.map((user) => {
      return `<button id="user-btn" class="user-btn" data-id="${user}">${user}</button>`;
    }).join('')

    ChangeUserTitle()
    $userList.innerHTML = template
  };

  // complete Item
  const CompleteTodo = (curItem, idx) => {
    if (!curItem.classList.contains('completed')) {
      this.Todos[this.currentUser][idx].completed = true;
    } else {
      this.Todos[this.currentUser][idx].completed = false;
    }
    itemRender(this.Todos[this.currentUser]);
  };

  // Delete Item
  const DeleteTodo = (e, idx) => {
    e.target.closest('li').remove();
    this.Todos[this.currentUser].splice(idx, 1);
    itemRender(this.Todos[this.currentUser]);
  };

  // Count Items
  const CountTodos = () => {
    $('.count-item').innerHTML = '오늘 할 일 ' + $todoList.querySelectorAll('li').length + '개';
  };

  const ShowAllItems = () => {
    const addedItemList = [...$todoList.querySelectorAll('li')];

    addedItemList.map((item) => {
      // item.className === "completed" 및의 조건식과 동일함
      item.style.display = 'block';
    });
  };

  const ShowLeftItems = () => {
    // html collection 을 배열로 배꾸기
    // array.from을 사용 또는 ... 스레드 사용하기
    const addedItemList = [...$todoList.querySelectorAll('li')];

    addedItemList.map((item) => {
      // item.className === "completed" 및의 조건식과 동일함
      if (item.classList.contains('completed')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  };

  const ShowCompletedItes = () => {
    const addedItemList = [...$todoList.querySelectorAll('li')];

    addedItemList.map((item) => {
      // item.className === "completed" 및의 조건식과 동일함
      if (!item.classList.contains('completed')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  };

  // todo item 수정
  const UpdateItem = (e) => {
    e.target.closest('li').classList.add('editing');
    const idx = e.target.closest('li').dataset.index;
    const $curItemEditInput = e.target.closest('li').querySelector('.edit');

    const prevText = e.target;

    $curItemEditInput.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        prevText.innerText = e.target.value;

        this.Todos[this.currentUser][idx].text = e.target.value;
        e.target.closest('li').classList.remove('editing');

        this.Todos[this.currentUser][idx].text = e.target.value;
        itemRender(this.Todos[this.currentUser]);
      } else if (e.key == 'Escape') {
        e.target.closest('li').classList.remove('editing');
        e.target.value = prevText.innerText;
      }
    });
  };

  const newusername = $userCreateBtn.addEventListener('click', User.createUser);

  $userDeleteBtn.addEventListener('click', User.deleteUser)

  // init 이벤트 리스너
  const initEventListner = () => {
    $userList.addEventListener('click', (e) => {
      if (e.target.classList.contains('user-btn')) {
        this.currentUser = e.target.innerText;

        itemRender(this.Todos[this.currentUser])
      }
    });

    $userDeleteBtn.addEventListener('click', (e) => {});

    $inputTag.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoText = e.target.querySelector('input').value;
      this.Todos[this.currentUser].push({
        text: todoText,
      });
      itemRender(this.Todos[this.currentUser]);
    });

    // li item 이벤트 위임
    $todoList.addEventListener('click', (e) => {
      const $curTodoItem = e.target.closest('li');
      const idx = e.target.closest('li').dataset.index;

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
        e.target.addEventListener('dblclick', UpdateItem);
      }
    });
    // footer 이벤트
    $allItem.addEventListener('click', ShowAllItems);
    $activeItem.addEventListener('click', ShowLeftItems);
    $completedItem.addEventListener('click', ShowCompletedItes);
  };
}

const TodoWork = new App();
TodoWork.init();

// this.init을 사용하기 위해서는 new app()으로 인스턴스화를 해줘야 함