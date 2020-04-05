class User {
    constructor(name, password, group = []) {
        this.name = name;
        this.password = password;
        this.groups = group;
        // this.authorized = authorized;
    }

    addGroupToUser(group) {
        this.deletedGroup(group);

        this.badArg(group);

        this.groups.push(group);
    }

    removeUserFromGroup(group) {
        this.deletedGroup(group);

        this.badArg(group);

        this.hasGroup(group);

        this.groups.splice(this.groups.indexOf(group, 0), 1);

    }

    deletedGroup(group) {
        if(allGroups.indexOf(group) === -1)
            throw new Error("Deleted group");
    }

    hasGroup(group) {
        if (this.groups.indexOf(group) === -1)
            throw new Error("Group not found");
    }

    badArg(group) {
        if (!group)
            throw new Error("Not group");
    }
}

class Group {
    constructor(name, right = []) {
        this.name = name;
        this.rights = right;
    }

    addRight(right) {
        if(!right)
            throw new Error("no right");

        if(allRights.indexOf(right) === -1)
                throw new Error("Deleted right");

        this.rights.push(right)
    }

    removeRight(right) {
        if (!right)
            throw new Error('not right'); //правльность аргумента

        if (this.rights.indexOf(right, 0) === -1)
            throw new Error('not found'); //наличие права у группы

        if (allRights.indexOf(right) === -1) //проверка на передачу удаленного права
            throw new Error("right not found");

        this.rights.splice(this.rights.indexOf(right), 1)
    }

}

class Right {
    constructor(name) {
        this.name = name;
    }
}

const allUsers = [];
const allGroups = [];
const allRights = [];

// Возвращает массив всех пользователей.
function users() {return allUsers}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) {
    const user = new User(name, password);

    if (allUsers.indexOf(user) !== -1)
        throw new Error('User is added');

    allUsers.push(user);

    return user
}

// Удаляет пользователя user
function deleteUser(user) {
    if (!user) {
        throw new Error('User is undefined');
    }

    const index = allUsers.indexOf(user);

    if (index === -1) {
        throw new Error('User not found');
    }

    allUsers.splice(index, 1);
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
    return user.groups
}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {

    if (allUsers.indexOf(user) === -1) {
        throw new Error('User not found');
    }

    user.addGroupToUser(group);

}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {

    if (allUsers.indexOf(user) === -1) {
        throw new Error('User not found');
    }

    user.removeUserFromGroup(group);

}

// Возвращает массив прав
function rights() {
    return allRights;
}

// Создает новое право с именем name и возвращает его
function createRight(name) {

    const right = new Right(name);

    if (allRights.indexOf(right) !== -1)
        throw new Error("Right is added");

    allRights.push(right);

    return right
}

// Удаляет право right
function deleteRight(right) {

    if (allRights.indexOf(right) === -1) {
        throw new Error('Right not found');
    }

    if (!right) {
        throw new Error("Not right");
    }

    for (let i = 0; i < allGroups.length; i++) {

        allGroups[i].rights.splice(allGroups[i].rights.indexOf(right), 1);

    }

    allRights.splice(allRights.indexOf(right), 1);

}

// Возвращает массив групп
function groups() {
    return allGroups;
}

// Создает новую группу и возвращаетеё.
function createGroup(name) {
    const group = new Group(name);

    if (allGroups.indexOf(group) !== -1)
        throw new Error("Group is added");

    allGroups.push(group);

    return group
}

// Удаляет группу group
function deleteGroup(group) {

    if (allGroups.indexOf(group) === -1) {
        throw new Error('Group not found');
    }

    if (!group) {
        throw new Error("Not group");
    }

    for (let i = 0; i < allUsers.length; i++) {

        allUsers[i].groups.splice(allUsers[i].groups.indexOf(group), 1);
    }

    allGroups.splice(allGroups.indexOf(group, 0), 1);

}

// Добавляет право right к группе group
function addRightToGroup(right, group) {

    if (allGroups.indexOf(group) === -1) {
        throw new Error('Group not found');
    }

    group.addRight(right);

}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {

    if (allGroups.indexOf(group) === -1) {
        throw new Error('Group not found');
    }

    group.removeRight(right);
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {

    return group.rights;

}

let sessions = [];

function login(name, password) {

    // const user = createUser(name, password);

    if (sessions.indexOf(createUser(name, password)) !== -1) //не авторизовываться 2й раз
        return false;

    sessions.splice(0, 1, createUser(name, password)); //переписываем активную сессию

    return true
}

function currentUser() {

    return sessions[0];


    // НЕ РАБОТАЕТ
    // if (sessions !== createUser(name, password)){
    //     console.log("not a curent user");
    //      return undefined;
    // }
    //
    // return createUser(name, password);
}


function logout() {



    // НЕ РАБОТАЕТ
    // if(currentUser(name, password) === undefined)
    //     throw new Error("cant logout, because is not current user");
    //
    sessions.splice(0, 1, undefined);


}

// Group= [admin, basic, work]
//
// users = [r2d2, cowboy, noob]
//
// right =



function isAuthorized(user, right) {



    // return group.users.indexOf(user) !== -1 && group.users.indexOf(right) !== -1;


}

// вывести массив групп пользователя, к которым он принадлежит
//
