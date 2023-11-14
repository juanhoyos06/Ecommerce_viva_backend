class User {
    constructor(id_user, id_rol, name, img, email, password, status=1) {
      this.id = id_user;
      this.id_rol = id_rol;
      this.name = name;
      this.img = img;
      this.email = email;
      this.password = password;
      this.status = status;
    }
  
    valid() {
      if (!this.id_rol || this.id_rol?.toString().length == 0) {
      
        throw { status: 400, message: "El id_rol es obligatorio" };
      }
      if (!this.name || this.name?.toString().length == 0) {
        throw { status: 400, message: "El name es obligatorio" };
      }
      if (!this.email || this.email?.toString().length == 0) {
        throw { status: 400, message: "El email es obligatorio" };
      }
      if (!this.password || this.password?.toString().length == 0) {
        throw { status: 400, message: "El password es obligatorio" };
      }
      if (!this.status || this.status?.toString().length == 0) {
        throw { status: 400, message: "El status es obligatorio" };
      }
    }
  
    toJson() {
      return {
        id: this.id,
        id_rol: this.id_rol,
        name: this.name,
        img: this.img,
        email: this.email,
        password: this.password,
        status: this.status,
      };
    }
  }
  
  module.exports = User;