class Shops {
    constructor(id_shop, name, img, webSite, phone, status = 1) {
        this.id = id_shop;
        this.name = name;
        this.img = img;
        this.webSite = webSite;
        this.phone = phone;
        this.status = status;
    }

    valid() {
        if (!this.name || this.name?.toString().length == 0) {
            throw { status: 400, message: "El name es obligatorio" };
        }
        if (!this.phone || this.phone?.toString().length == 0) {
            throw { status: 400, message: "El email es obligatorio" };
        }
        if (!this.status || this.status?.toString().length == 0) {
            throw { status: 400, message: "El estado es obligatorio" };
        }

    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            img: this.img,
            webSite: this.webSite,
            phone: this.phone,
            status: this.status
        };
    }
}

module.exports = Shops;