import React, { useEffect, useState } from 'react';
import { useGetEnglishWordsQuery } from './store/english/english.api';
import { Card } from './components/Card';
import Modal from './components/Modal';
import { IWord } from './models/model';
import { Form } from './components/Form';

function App() {
  const { isLoading, data } = useGetEnglishWordsQuery(null, {pollingInterval: 1000});
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState('')

  return (
    <div className='bg-gray-100 h-full'>
      <Modal openModal={openModal} setModalOpen={setModalOpen} className={openModal ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}>
        <h1 className="text-center font-bold text-lg mb-4">Add new word</h1>
        <Form openModal={openModal} setModalOpen={setModalOpen} error={error} setError={setError}/>
      </Modal>
      <div className='w-[640px] mx-auto py-[32px] md:max-w-full '>
        {isLoading && 'Loading...'}
        <button onClick={() => setModalOpen(true)} className='bg-blue-700 px-4 py-2 rounded-lg text-white mb-4  hover:bg-blue-800 transition-all md:ml-2 md:py-1'>Add new word</button>
        {data && data.map(word => (
          <Card word={word} key={word.id}/>
        ))}
      </div>
    </div>
    
  );
}

export default App
