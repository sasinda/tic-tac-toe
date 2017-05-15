import uuid4 from 'uuid/v4';
class User {
    constructor(userName){

        this.name=userName;
        this.id=uuid4();
    }
}
export default User;