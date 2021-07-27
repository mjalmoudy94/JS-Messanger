class Users {}

Users.User = class {
    constructor() {
        this.ID = 0;
        this.UserName = '';
        this.FirstName = '';
        this.LastName = '';
        this.IsDeletedAccount = false;
    }
}

export default Users;