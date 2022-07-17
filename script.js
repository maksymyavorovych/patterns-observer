import { UsersListComponent } from './classes/components/users-list.class.js';
import { UsersPreviewComponent } from './classes/components/users-preview.class.js';
import { Observer } from './classes/observer.js';
const usersMock = [
    {
        id: 10,
        name: 'john',
        color: 'red',
        age: 33,
    },
];
const $usersList = new Observer(usersMock);
const usersComponent = new UsersListComponent('main', $usersList);
const usersPreviewComponent = new UsersPreviewComponent('preview', $usersList);
