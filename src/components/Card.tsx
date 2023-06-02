import {IWord} from '../models/model'
import trashIcon from '../assets/img/trash.png'
import { useCreateEnglistWordsMutation, useDeleteEnglishWordMutation } from '../store/english/english.api'

interface CardProps {
  word: IWord
}

export function Card({word}: CardProps) {

  const [deleteEnglishWord] = useDeleteEnglishWordMutation()

  const deleteCard = () => {
    deleteEnglishWord(Number(word.id))
  }

  return <div className='relative group rounded-lg shadow-md bg-white p-4 mb-4 last:mb-0 md:max-w-full md:mx-2'>
    <div className="absolute opacity-0 right-3 top-4 cursor-pointer group-hover:opacity-100 transition-all duration-300">
      <img onClick={deleteCard} className='w-4' src={trashIcon} alt="" />
    </div>
    <div className="mb-2">
      <span className='mr-1'>{word.eng}</span>
      -
      <span className='ml-1'>{word.rus}</span>
    </div>
      {word.transcription && <div className='opacity-75 mb-1'>{word.transcription}</div>}
      {word.example && <div className='mb-1'>{word.example}</div>}
      {word.img && <img className='max-w-[200px]' src={`http://localhost:5000/${word.img}`} alt=''/>}
  </div>
}