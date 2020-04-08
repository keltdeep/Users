class Group {
    constructor(name, right = []) {
        this.name = name;
        this.rights = right;
    }

    addRight(right) {

        this.noRightOrDeleted(right);

        this.rights.push(right)
    }

    removeRight(right) {

        this.noRightOrDeleted(right);

        if (this.rights.indexOf(right, 0) === -1)
            throw new Error('not found'); //наличие права у группы

        this.rights.splice(this.rights.indexOf(right), 1)
    }

    noRightOrDeleted(right) {
        if(!right || allRights.indexOf(right) === -1)
            throw new Error("no right or deleted");
    }

}
