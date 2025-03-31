const ResetButton = () => {
  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <button
      onClick={handleReset}
      className='bg-red-500 text-white py-2 px-4 rounded-full mt-4'
    >
      Réinitialiser
    </button>
  )
}

export default ResetButton
