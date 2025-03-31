interface ModalProps {
  date: string
  time: string
  onClose: () => void
  onConfirm: () => void
}

const Modal: React.FC<ModalProps> = ({ date, time, onClose, onConfirm }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>Prendre un rendez-vous</h2>
        <p className='mb-4'>Date: {date}</p>
        <p className='mb-4'>Heure: {time}</p>

        <div className='mt-4 flex justify-between'>
          <button
            className='bg-gray-500 text-white p-2 rounded hover:bg-gray-600'
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className='bg-green-500 text-white p-2 rounded hover:bg-green-600'
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
