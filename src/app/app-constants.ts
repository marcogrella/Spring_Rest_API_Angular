export class AppConstants {

  public static get baseServidor(): string {
    return "http://localhost:8080/"
  }

  public static get baseLogin(): string{
    return this.baseServidor + "springrestapi/login"
  }

  public static get baseUrl(): string {
    return this.baseServidor + "springrestapi/usuario/"
  }

  public static getBaseUrlPath() : string {
    return this.baseServidor + "springrestapi/profissao/"
  }

  public static getBaseUrlPathRecupear() : string {
    return this.baseServidor + "springrestapi/recuperar/"
  }
}
