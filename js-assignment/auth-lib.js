const allUsers = [];
const allGroups = [];
const allRights = [];

function isContainEntityArray(array, entity, message) {
    if (array.indexOf(entity) === -1)
        exception(message);
}

function isNotContainEntityArray(array, entity, message) {
    if (array.indexOf(entity) !== -1)
        exception(message);
}

function exception(message) {
    throw new Error(message);
}

function spliceArray(array, index) {
    array.splice(index, 1)
}

function notEntityOrEntityNotFound(entity, index, massage) {


    if (!entity || index === -1) {
        exception(massage);
    }

}
// Возвращает массив всех пользователей.
function users() {return allUsers}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) {
    const user = new User(name, password);

    isNotContainEntityArray(allUsers, user, 'User is added');

    allUsers.push(user);

    return user;
}

// Удаляет пользователя user
function deleteUser(user) {
    const index = allUsers.indexOf(user);

    notEntityOrEntityNotFound(user, index, "User is undefined or not found");

    spliceArray(allUsers, index);
}

// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
    return user.groups
}

// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {
    isContainEntityArray(allUsers, user, 'User not found');
    user.addGroupToUser(group);
}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) {
    isContainEntityArray(allUsers, user, 'User not found');
    user.removeUserFromGroup(group);

}

// Возвращает массив прав
function rights() {
    return allRights;
}

// Создает новое право с именем name и возвращает его
function createRight(name) {
    const right = new Right(name);

    isNotContainEntityArray(allRights, right, 'Right is added');

    allRights.push(right);

    return right
}

// Удаляет право right
function deleteRight(right) {

    notEntityOrEntityNotFound(right, allRights.indexOf(right), "Not right or Right not found");

    for (let i = 0; i < allGroups.length; i++) {
        const rights = allGroups[i].rights;
        spliceArray(rights, rights.indexOf(right));

    }

    spliceArray(allRights, allRights.indexOf(right));
}

// Возвращает массив групп
function groups() {
    return allGroups;
}

// Создает новую группу и возвращаетеё.
function createGroup(name) {
    const group = new Group(name);

    isNotContainEntityArray(allGroups, group, 'Group is added');

    allGroups.push(group);

    return group
}

// Удаляет группу group
function deleteGroup(group) {

    notEntityOrEntityNotFound(group, allGroups.indexOf(group), "Not group or Group not found");

    for (let i = 0; i < allUsers.length; i++) {

        const groups = allUsers[i].groups;

        spliceArray(groups, groups.indexOf(group));

    }

    spliceArray(allGroups, allGroups.indexOf(group));

}

// Добавляет право right к группе group
function addRightToGroup(right, group) {

    isContainEntityArray(allGroups, group, 'Group not found');

    group.addRight(right);

}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {

    isContainEntityArray(allGroups, group, 'Group not found');

    group.removeRight(right);
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {

    return group.rights;

}

function login(name, password) {
    const user = allUsers.find(user => user.name === name && user.password === password);

    if (!user || user.authorized)
       return false;

    user.authorized = true;

    return true;
}
//вернуть авторизованного пользователя
function currentUser() {

    for (let i = 0; i < allUsers.length; i++) {
        if(allUsers[i].authorized) {
            return allUsers[i];
        }
    }

    return undefined
}

function logout() {
    const user = currentUser();
    if(user)
        user.authorized = false

}

function isAuthorized(user, right) {

    if (!user || !right)
        throw new Error('Not user or right');

    if (allUsers.indexOf(user) === -1 || allRights.indexOf(right) === -1)
        throw new Error('user or right was deleted');

    for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i].rights.indexOf(right) !== -1)
            return true;
    }

    return false
}

