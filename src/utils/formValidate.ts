import { FormError } from "./Error"

export function handleForm(form: HTMLFormElement) {
  if(typeof formValidate(form.eng.value) != 'boolean') {
    return 'Заполните поле English'
  }
  if(typeof formValidate(form.rus.value) != 'boolean') {
    return 'Заполните поле Russian'
  }
  
  return true
}

export function formValidate(value: string) {
  if(value.length < 1) {
    return FormError.emptyForm()
  }
  return true
}

export function removeFormValues(form: HTMLFormElement) {
  form.eng.value = ''
  form.rus.value = ''
  form.example.value = ''
  form.transcription.value = ''
}