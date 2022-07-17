import { IUser } from '../../interfaces/user';
import { Observer } from '../observer';

export class UsersPreviewComponent {
  private userList: Array<IUser> = [];
  private $usersList: Observer<Array<IUser>>;
  private containerId: string;
  private conteinerElement!: HTMLElement;

  constructor(containerId: string, dataObserver: Observer<Array<IUser>>) {
    // this.userList = userList;
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
    // this.display();
  }

  private display() {
    const headerTemplate = `
          <h3>Users preview</h3>
    `;
    const usersTemplate =
      headerTemplate +
      '<div>' +
      this.userList
        .map((user, index) => {
          return `
          <span style="font-weight: bold; display: inline-block; width: 300px;"> ${index + 1}. ${
            user.name
          } - ${user.age} years. </span> 
          <button class="delete-user-btn" user-id="${
            user.id
          }">Delete user</button> 
          </br>
          `;
        })
        .join('') +
      '</div>';

    this.conteinerElement.innerHTML = usersTemplate;

    document.querySelectorAll('.delete-user-btn').forEach((btn) => {
      btn.addEventListener('click', (el: any) => {
        const id = el.target.getAttribute('user-id');
        this.deleteUser(Number(id));
      });
    });
  }

  private deleteUser(id: number): void {
    this.$usersList.value = this.userList.filter((u) => u.id !== id);
  }
}
