class Products {
    constructor(id_product, id_category, id_brand, name, img, price, status=1) {
      this.id = id_product;
      this.id_category = id_category;
      this.id_brand = id_brand;
      this.name = name;
      this.img = img;
      this.price = price;
      this.status = status;
    }
  
    valid() {
      
      if (!this.id_category || this.id_category?.toString().length == 0) {
        throw { status: 400, message: "El id_category es obligatorio" };
      }
      if (!this.id_brand || this.id_brand?.toString().length == 0) {
        throw { status: 400, message: "El id_brand es obligatorio" };
      }
      if (!this.name || this.name?.toString().length == 0) {
        throw { status: 400, message: "El name es obligatorio" };
      }
      if (!this.price || this.price?.toString().length == 0) {
        throw { status: 400, message: "El price es obligatorio" };
      }
      if (!this.status || this.status?.toString().length == 0) {
        throw { status: 400, message: "El status es obligatorio" };
      }
      
    }
  
    toJson() {
      return {
        id: this.id,
        id_category: this.id_category,
        id_brand: this.id_brand,
        name: this.name,
        img: this.img,
        price: this.price,
        status: this.status,
      };
    }
  }
  
  module.exports = Products;