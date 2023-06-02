import { useEffect, useRef, useState } from "react"
import { IWord } from "../models/model"
import { useCreateEnglistWordsMutation } from "../store/english/english.api"
import { formValidate, handleForm, removeFormValues } from "../utils/formValidate"
import { FormError } from "../utils/Error"

interface ModalProps {
  openModal: boolean,
  setModalOpen: (openModal: boolean) => void,
  className: string,
  children: React.ReactNode
}

export default function Modal({openModal, setModalOpen, className, children}: ModalProps) {
  const [error, setError] = useState('')
  const [notification, setNotification] = useState(false)
  const overlay = useRef<HTMLDivElement>(null)

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {

    overlay.current?.classList.remove('opacity-100')
    overlay.current?.classList.add('opacity-0')
    
    setTimeout(() => {
      setModalOpen(false)
    }, 300)
  }

  return <div ref={overlay} onClick={closeModal} className={`fixed z-10 top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center transition-opacity duration-300 ${className}`}>
    <div onClick={(e) => e.stopPropagation()} className="w-[500px] h-[400px] bg-white rounded-xl py-4 px-4 md:max-w-full md:mx-2">
      {children}
    </div>
  </div>
}