import { useEffect, useRef, useState } from "react"

interface NotificationProps {
  error: string,
  setError: (error: string) => void
}

export function Notification ({ error, setError }: NotificationProps) {

  useEffect(() => {
    if(error.length > 0) {
      setNotification(true)
      notificationRef.current?.classList.add(...['block', 'opacity-100'])

      setTimeout(() => {
        notificationRef.current?.classList.remove('opacity-100')
        notificationRef.current?.classList.add('duration-[6000ms]')
        setTimeout(() => {
          notificationRef.current?.classList.remove('duration-[6000ms]')
          notificationRef.current?.classList.remove('opacity-100')
          setNotification(false)
          setError('')
        }, 6000)
        
      }, 1000)
      
    } 
  }, [error])

  const [notification, setNotification] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  return <div ref={notificationRef} className="absolute right-4 top-[10px] bg-red-300 p-4 opacity-0 none text-red-700 transition-opacity duration-300">{error}</div>
}