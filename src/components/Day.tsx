import React from 'react'

interface DayProps {
  day: number
  isFull: boolean
  onClick: (day: number) => void
  className?: string
}

const Day: React.FC<DayProps> = ({ day, isFull, onClick, className }) => {
  return (
    <button
      onClick={() => onClick(day)}
      className={`w-full h-8 flex items-center justify-center rounded-full 
        ${isFull ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} 
        ${className}`}
    >
      {day}
    </button>
  )
}

export default Day
