class Deals {
    constructor(id_promocion, id_shop, id_category, description, start_date, end_date, img, percentage) {
        this.id = id_promocion;
        this.id_shop = id_shop;
        this.description = description;
        this.startDate = start_date;
        this.endDate = end_date;
        this.img = img;
        this.percentage = percentage;
        this.id_category = id_category;
    }

    valid() {

        if (!this.id_shop || this.id_shop?.toString().length == 0) {
            throw { status: 400, message: "El id_shop es obligatorio" };
        }
        if (!this.id_category || this.id_category?.toString().length == 0) {
            throw { status: 400, message: "El id_category es obligatorio" };
        }
        if (!this.description || this.description?.toString().length == 0) {
            throw { status: 400, message: "El description es obligatorio" };
        }
        if (!this.startDate || this.startDate?.toString().length == 0) {
            throw { status: 400, message: "El startDate es obligatorio" };
        }
        if (!this.endDate || this.endDate?.toString().length == 0) {
            throw { status: 400, message: "El endDate es obligatorio" };
        }
        if (!this.percentage || this.percentage?.toString().length == 0) {
            throw { status: 400, message: "El percentage es obligatorio" };
        }

    }

    toJson() {
        return {
            id: this.id,
            id_shop: this.id_shop,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            img: this.img,
            percentage: this.percentage,
            id_category: this.id_category
        };
    }
}

module.exports = Deals;