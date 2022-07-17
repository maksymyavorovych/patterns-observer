import { UsersListComponent } from './classes/components/users-list.class.js';
import { UsersPreviewComponent } from './classes/components/users-preview.class.js';
import { Observer } from './classes/observer.js';
import { IUser } from './interfaces/user';

const usersMock: Array<IUser> = [
  {
    id: 10134123412,
    name: 'John',
    color: 'red',
    age: 33,
  },
];

const $usersList = new Observer<Array<IUser>>(usersMock);

const usersComponent = new UsersListComponent('main', $usersList);
const usersPreviewComponent = new UsersPreviewComponent('preview', $usersList);
