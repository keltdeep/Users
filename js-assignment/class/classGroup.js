class Group {
    constructor(name, right = []) {
        this.name = name;
        this.rights = right;
    }

    addRight(right) {

        this.rights.push(right)
    }

    removeRight(right) {

        if (this.rights.indexOf(right) === -1)
            throw new Error('not found'); //наличие права у группы


        this.rights.splice(this.rights.indexOf(right), 1)
    }

}
