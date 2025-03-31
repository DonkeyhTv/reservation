import React, { useState, useEffect } from 'react'
import { Dayjs } from 'dayjs'

interface AvailableTimeSlotsProps {
  selectedDate: Dayjs
}

const AvailableTimeSlots: React.FC<AvailableTimeSlotsProps> = ({
  selectedDate,
}) => {
  const [availableTimes, setAvailableTimes] = useState<{
    morning: string[]
    afternoon: string[]
  }>({
    morning: [],
    afternoon: [],
  })

  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<
    'morning' | 'afternoon' | null
  >(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  const timeSlotsMorning = [
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
  ]
  const timeSlotsAfternoon = [
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
  ]

  const getAvailableTimes = () => {
    const storedTimes = JSON.parse(
      localStorage.getItem(selectedDate.format('YYYY-MM-DD')) || '{}',
    )
    const reservedMorning = storedTimes.morning || []
    const reservedAfternoon = storedTimes.afternoon || []
    setAvailableTimes({
      morning: getAdjacentTimes(reservedMorning, timeSlotsMorning),
      afternoon: getAdjacentTimes(reservedAfternoon, timeSlotsAfternoon),
    })
  }

  const getAdjacentTimes = (reservedTimes: string[], timeSlots: string[]) => {
    let available: string[] = []
    if (reservedTimes.length === 0) {
      available = timeSlots
    } else {
      reservedTimes.forEach(reservedTime => {
        const index = timeSlots.indexOf(reservedTime)
        const prevTime = timeSlots[index - 1] || ''
        const nextTime = timeSlots[index + 1] || ''
        if (prevTime && !reservedTimes.includes(prevTime))
          available.push(prevTime)
        if (nextTime && !reservedTimes.includes(nextTime))
          available.push(nextTime)
      })
      available = [...new Set(available)]
    }
    return available
  }

  const handleTimeSelect = (time: string, section: 'morning' | 'afternoon') => {
    if (!availableTimes[section].includes(time)) return
    setSelectedTime(time)
    setSelectedSection(section)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (!selectedTime || !selectedSection) return
    const storedTimes = JSON.parse(
      localStorage.getItem(selectedDate.format('YYYY-MM-DD')) || '{}',
    )
    storedTimes[selectedSection] = [
      ...(storedTimes[selectedSection] || []),
      selectedTime,
    ]
    localStorage.setItem(
      selectedDate.format('YYYY-MM-DD'),
      JSON.stringify(storedTimes),
    )
    getAvailableTimes()
    setShowModal(false)
  }

  const handleCancel = () => setShowModal(false)

  useEffect(() => {
    getAvailableTimes()
  }, [selectedDate])

  const renderTimeSlots = (
    times: string[],
    section: 'morning' | 'afternoon',
  ) => (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
      {times.map(time => (
        <button
          key={time}
          onClick={() => handleTimeSelect(time, section)}
          className={`py-1 px-3 rounded-md text-sm text-center transition-all duration-200 ease-in-out ${
            availableTimes[section].includes(time)
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!availableTimes[section].includes(time)}
        >
          {time}
        </button>
      ))}
    </div>
  )

  return (
    <div className='p-4 bg-white rounded-lg'>
      <h2 className='text-xl font-semibold p-2 rounded text-center text-gray-800 mb-4 mt-4'>
        Disponibilité des créneaux pour le {selectedDate.format('DD/MM/YYYY')}
      </h2>
      <div className='grid gap-8 md:grid-cols-2'>
        <div>
          <h3 className='text-lg font-medium text-center mb-2'>Matin</h3>
          {renderTimeSlots(timeSlotsMorning, 'morning')}
        </div>

        <div>
          <h3 className='text-lg font-medium text-center mb-2'>Après-midi</h3>
          {renderTimeSlots(timeSlotsAfternoon, 'afternoon')}
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-md shadow-lg'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Confirmer la réservation pour le {selectedTime} ?
            </h3>
            <div className='flex justify-between'>
              <button
                onClick={handleConfirm}
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
              >
                Confirmer
              </button>
              <button
                onClick={handleCancel}
                className='bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200'
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvailableTimeSlots
