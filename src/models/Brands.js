
class Brands {
    constructor(id_brand, name, status = 1) {
        this.id = id_brand;
        this.name = name;
        this.status = status;
    }

    valid() {
        if (!this.name || this.name?.toString().length == 0) {
            throw { status: 400, message: "El name es obligatorio" };
        }
        if (!this.status || this.status?.toString().length == 0) {
            throw { status: 400, message: "El estado es obligatorio" };
        }

    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            status: this.status
        };
    }
}

module.exports = Brands;