export class UsersPreviewComponent {
    constructor(containerId, dataObserver) {
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
        // this.display();
    }
    display() {
        const headerTemplate = `
          <h3>Users preview</h3>
    `;
        const usersTemplate = headerTemplate +
            '<div>' +
            this.userList
                .map((user, index) => {
                return `
          <span style="font-weight: bold; display: inline-block; width: 300px;"> ${index + 1}. ${user.name} - ${user.age} years. </span> 
          <button class="delete-user-btn" user-id="${user.id}">Delete user</button> 
          </br>
          `;
            })
                .join('') +
            '</div>';
        this.conteinerElement.innerHTML = usersTemplate;
        document.querySelectorAll('.delete-user-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.getAttribute('user-id');
                this.deleteUser(Number(id));
            });
        });
    }
    deleteUser(id) {
        this.$usersList.value = this.userList.filter((u) => u.id !== id);
    }
}
