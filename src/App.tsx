import { useState } from 'react'
import Calendar from './components/Calendar'
import AvailableTimeSlots from './components/AvailableTimeSlots'
import ResetButton from './components/ResetButton'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import { Info } from 'lucide-react'

dayjs.locale('fr')

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg'>
        <div className='relative'>
          <h1 className='text-xl bg-black text-white p-2 rounded-lg font-semibold text-center text-gray-800 w-full'>
            Réservation d'un rendez-vous
          </h1>

          <button
            onClick={openModal}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 p-2 rounded-full'
          >
            <Info />
          </button>
        </div>

        <div className='mb-6'>
          <Calendar setSelectedDate={setSelectedDate} />
        </div>

        {selectedDate && (
          <div className='mb-6'>
            <AvailableTimeSlots selectedDate={selectedDate} />
          </div>
        )}

        <div className='flex justify-center'>
          <ResetButton />
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-xl font-semibold mb-4'>
              À propos de l'application
            </h2>
            <p>
              Cette application permet aux utilisateurs de réserver un
              rendez-vous en sélectionnant une date et un créneau horaire
              disponibles. Vous pouvez voir un calendrier, choisir une date et
              vérifier les créneaux horaires disponibles pour cette journée. Il
              est également possible de réinitialiser la sélection.
            </p>
            <p className='mt-4'>
              Le système utilise un principe de créneaux horaires adjacents.
              Cela signifie que dès qu'un premier patient sélectionne un créneau
              horaire, seuls les créneaux adjacents à ce créneau seront
              disponibles pour les autres patients. Cela permet d'éviter que le
              médecin se retrouve avec des créneaux horaires vides entre deux
              rendez-vous. Par exemple, si un patient réserve le créneau de
              9h00, alors seuls les créneaux adjacents (8h45 et 9h15) seront
              accessibles aux autres patients. Les créneaux non adjacents
              resteront indisponibles.
            </p>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={closeModal}
                className='text-blue-600 hover:text-blue-800 font-semibold'
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
