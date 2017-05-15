import  User from '../model/user.mdl'

var users=new Map();

class UserService{
    constructor(){

    }

    createTempUser(userName :string){
        var user=new User(userName);
        users.set(user.id, user);
        return user;
    }

    getTempUser(userId){
       return users.get(userId)
    }

    deleteTempUser(userId){
        return users.delete(userId)
    }

}
export default UserService;