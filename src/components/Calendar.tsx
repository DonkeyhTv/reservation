import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Day from './Day'

interface CalendarProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
  const [fullDays, setFullDays] = useState<number[]>([])

  useEffect(() => {
    checkFullDays()
  }, [currentMonth])

  const checkFullDays = () => {
    let full: number[] = []
    for (let day = 1; day <= currentMonth.daysInMonth(); day++) {
      const storedTimes = JSON.parse(
        localStorage.getItem(currentMonth.format('YYYY-MM-') + day) || '{}',
      )
      if (
        (storedTimes.morning?.length || 0) +
          (storedTimes.afternoon?.length || 0) ===
        16
      ) {
        full.push(day)
      }
    }
    setFullDays(full)
  }

  return (
    <div className=' bg-white rounded-lg'>
      <div className='flex justify-between items-center my-6'>
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
          className='text-2xl text-blue-600 hover:text-blue-800 transition duration-200'
        >
          <ChevronLeft />
        </button>
        <h2 className='text-xl font-semibold text-gray-800'>
          {currentMonth.format('MMMM YYYY')}
        </h2>
        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
          className='text-2xl text-blue-600 hover:text-blue-800 transition duration-200'
        >
          <ChevronRight />
        </button>
      </div>

      <div className='grid grid-cols-7 gap-4 text-center'>
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, index) => (
          <div
            key={index}
            className='font-medium text-gray-600 bg-yellow-100 p-1 rounded-lg'
          >
            {day}
          </div>
        ))}

        {[...Array(currentMonth.daysInMonth())].map((_, i) => {
          const day = i + 1
          const isFull = fullDays.includes(day)

          return (
            <Day
              key={day}
              day={day}
              isFull={isFull}
              onClick={() => setSelectedDate(currentMonth.date(day))}
              className={`p-3 rounded-md cursor-pointer transition duration-300 ease-in-out ${
                isFull
                  ? 'bg-red-200 text-gray-400'
                  : 'bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
