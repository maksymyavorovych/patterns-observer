import { IUser } from '../../interfaces/user';
import { Names, Colors } from '../../data/data.js';
import { Observer } from '../observer';

export class UsersListComponent {
  private userList: Array<IUser> = [];
  private $usersList: Observer<Array<IUser>>;
  private containerId: string;
  private conteinerElement!: HTMLElement;

  constructor(
    containerId: string,
    dataObserver: Observer<Array<IUser>>
  ) {
    this.containerId = containerId;
    this.$usersList = dataObserver;

    this.init();
  }

  private init() {
    this.conteinerElement = document.getElementById(
      this.containerId
    ) as HTMLElement;

    if (!this.conteinerElement) {
      console.warn('Wrong init element ID', this.containerId);
      return;
    }

    this.$usersList.subscribe((data) => {
      this.userList = data;
      this.display();
    }, true);
  }

  private display() {
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
    const usersTemplate =
      headerTemplate +
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
      btn.addEventListener('click', (el: any) => {
        const id = el.target.parentElement.getAttribute('user-id');
        this.cangeUserName(Number(id));
      });
    });

    document.querySelectorAll('.change-user-color-btn').forEach((btn) => {
      btn.addEventListener('click', (el: any) => {
        const id = el.target.parentElement.getAttribute('user-id');
        this.changeUserColor(Number(id));
      });
    });

    document.querySelectorAll('.delete-user-btn').forEach((btn) => {
      btn.addEventListener('click', (el: any) => {
        const id = el.target.parentElement.getAttribute('user-id');
        this.deleteUser(Number(id));
      });
    });

    document.querySelectorAll('#add-user').forEach((el) =>
      el.addEventListener('click', () => {
        this.addUser();
      })
    );
  }

  private addUser(): void {
    const newUser: IUser = {
      id: Date.now(),
      color: Colors[Math.round(Math.random() * (Colors.length - 1))],
      name: Names[Math.round(Math.random() * (Names.length - 1))],
      age: Math.round(Math.random() * 40 + 25),
    };
    this.$usersList.value = [...this.userList, newUser];
  }

  private cangeUserName(id: number): void {
    const user = this.userList.find((u) => u.id === id);
    if (user) {
      const nameId = Math.round(Math.random() * (Names.length - 1));
      user.name = Names[nameId];
      this.$usersList.value = [...this.userList];
    }
  }

  private changeUserColor(id: number): void {
    const user = this.userList.find((u) => u.id === id);
    if (user) {
      const colorId = Math.round(Math.random() * (Colors.length - 1));;
      user.color = Colors[colorId];
      this.$usersList.value = [...this.userList];
    }
  }

  private deleteUser(id: number): void {
    this.$usersList.value = this.userList.filter((u) => u.id !== id);
  }
}
