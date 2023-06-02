import { useEffect, useRef, useState } from "react"
import { useCreateEnglistWordsMutation } from "../store/english/english.api"
import { handleForm, removeFormValues } from "../utils/formValidate"
import { IWord } from "../models/model"
import { FormError } from "../utils/Error"
import { Notification } from "./Notifications"

interface FormProps {
  error: string,
  setError: (error: string) => void
  setModalOpen: (openModal: boolean) => void,
  openModal: boolean,
}

export function Form({error, setError, setModalOpen, openModal}: FormProps) {
  const [addNewEnglish, responce] = useCreateEnglistWordsMutation()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if(!openModal) {
      formRef.current?.reset()
    }
  }, [openModal])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    const form = e.currentTarget
    const resultForm = handleForm(form)
    
    if(typeof resultForm === 'string') {
      setError(resultForm)
      return
    }

    const formData2 = new FormData()
    formData2.append('eng', form.eng.value)
    formData2.append('rus', form.rus.value)
    formData2.append('example', form.example.value)
    formData2.append('transcription', form.transcription.value)
    if(form.img.files[0]) {
      formData2.append('img', form.img?.files[0], form.img?.files[0]?.filename)
    }
    
    
    try {
      addNewEnglish(formData2)
    } catch (e) {
      
      if (typeof e === "string") {
          setError(e)
      } else if (e instanceof Error) {
        setError(e.message)
      }
      
      throw FormError.badRequest()
    } finally {
      formRef.current?.reset()
      setModalOpen(false)
    }
    
  }

  return <>
    <Notification error={error} setError={setError}/>
    <form ref={formRef} onSubmit={onSubmit}>
      <input type="text" name="eng" placeholder="English" className="w-full h-full mb-3 border-2 border-gray-500 p-1 rounded-lg focus:outline-none focus:border-blue-500"/>
      <input type="text" name="rus" placeholder="Russian" className="w-full h-full mb-3 border-2 border-gray-500 p-1 rounded-lg focus:outline-none focus:border-blue-500"/>
      <input type="text" name="example" placeholder="Example" className="w-full h-full mb-3 border-2 border-gray-500 p-1 rounded-lg focus:outline-none focus:border-blue-500"/>
      <input type="text" name="transcription" placeholder="Transcription" className="w-full h-full mb-3 border-2 border-gray-500 p-1 rounded-lg focus:outline-none focus:border-blue-500"/>
      <input type="file" name="img" className="mb-4"/>
      <button className="bg-blue-700 px-4 py-2 rounded-lg text-white mb-4  hover:bg-blue-800 transition-all w-full md:ml-2 md:py-1">Submit</button>
    </form>
  </> 
}