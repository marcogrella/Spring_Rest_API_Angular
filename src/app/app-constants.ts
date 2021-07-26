export class AppConstants {

  public static get baseServidor(): string {
    return "https://springrest-api.herokuapp.com/"
  }

  public static get baseLogin(): string{
    return this.baseServidor + "login"
  }

  public static get baseUrl(): string {
    return this.baseServidor + "usuario/"
  }

  public static getBaseUrlPath() : string {
    return this.baseServidor + "profissao/"
  }

  public static getBaseUrlPathRecupear() : string {
    return this.baseServidor + "recuperar/"
  }

  public static getConsultarCep(): string{
    return this.baseServidor + "usuario/"
  }

  public static getConsultarLogin(): string{
    return this.baseServidor + "usuario/"
  }

}
