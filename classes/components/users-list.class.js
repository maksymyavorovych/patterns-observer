import { Names, Colors } from '../../data/data.js';
export class UsersListComponent {
    constructor(containerId, 
    // userList: Array<IUser>,
    dataObserver) {
        this.userList = [];
        // this.userList = userList;
        this.containerId = containerId;
        this.$usersList = dataObserver;
        this.init();
    }
    init() {
        this.conteinerElement = document.getElementById(this.containerId);
        if (!this.conteinerElement) {
            console.warn('Wrong init element ID', this.containerId);
            return;
        }
        this.$usersList.subscribe((data) => {
            this.userList = data;
            this.display();
        }, true);
    }
    display() {
        const headerTemplate = `
          <h2>Users - common</h2>
          <div>
            <button id="add-user">Add user</button>
          </div>
          <div class="user-row user-header-row">
            <div class="user-id"> ID </div>
            <div class="user-name"> Name </div>
            <div class="user-age"> Age </div>
            <div class="user-actions"> Actions </div>
          </div>
    `;
        const usersTemplate = headerTemplate +
            this.userList
                .map((user) => {
                return `

          <div class="user-row" user-id="${user.id}">
            <div class="user-id"> ${user.id}</div>
            <div class="user-name" style="color:${user.color}">${user.name} </div>
            <div class="user-age"> ${user.age}</div>
            <div class="user-actions" user-id="${user.id}">
              <button class="change-user-name-btn">Change name</button>
              <button class="change-user-color-btn">Change color</button>
              <button class="delete-user-btn">Delete user</button>
            </div>

          </div>
          `;
            })
                .join('');
        this.conteinerElement.innerHTML = usersTemplate;
        document.querySelectorAll('.change-user-name-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.cangeUserName(Number(id));
            });
        });
        document.querySelectorAll('.change-user-color-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.changeUserColor(Number(id));
            });
        });
        document.querySelectorAll('.delete-user-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.deleteUser(Number(id));
            });
        });
        document.querySelectorAll('#add-user').forEach((el) => el.addEventListener('click', () => {
            this.addUser();
        }));
    }
    addUser() {
        const newUser = {
            id: Date.now(),
            color: Colors[Math.round(Math.random() * (Colors.length - 1))],
            name: Names[Math.round(Math.random() * (Names.length - 1))],
            age: Math.round(Math.random() * 40 + 25),
        };
        this.$usersList.value = [...this.userList, newUser];
        // this.userList.push(newUser);
        // this.display();
    }
    cangeUserName(id) {
        const user = this.userList.find((u) => u.id === id);
        if (user) {
            const nameId = Math.round(Math.random() * (Names.length - 1));
            user.name = Names[nameId];
            this.$usersList.value = [...this.userList];
            // this.display();
        }
    }
    changeUserColor(id) {
        const user = this.userList.find((u) => u.id === id);
        if (user) {
            const colorId = Math.round(Math.random() * (Colors.length - 1));
            ;
            user.color = Colors[colorId];
            this.$usersList.value = [...this.userList];
            // this.display();
        }
    }
    deleteUser(id) {
        this.$usersList.value = this.userList.filter((u) => u.id !== id);
        // this.userList = this.userList.filter((u) => u.id !== id);
        // this.display();
    }
}
