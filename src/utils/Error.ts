export class FormError extends Error {
  static badRequest() {
    return 'Server error'
  }
  static emptyForm() {
    return 'Заполните обязательные поля'
  }
}