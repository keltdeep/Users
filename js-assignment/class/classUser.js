class User {
    constructor(name, password, group = [], authorized = false) {
        this.name = name;
        this.password = password;
        this.groups = group;
        this.authorized = authorized;
    }

    addGroupToUser(group) {

        this.groups.push(group);

    }

    removeUserFromGroup(group) {

        this.hasGroup(group);

        this.groups.splice(this.groups.indexOf(group), 1);

    }

    hasGroup(group) {
        if (this.groups.indexOf(group) === -1)
            throw new Error("Group not found");
    }
}