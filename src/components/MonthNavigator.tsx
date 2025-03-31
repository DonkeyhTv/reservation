import React from 'react'

interface MonthNavigatorProps {
  onPreviousMonth: () => void
  onNextMonth: () => void
  currentMonth: string
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  onPreviousMonth,
  onNextMonth,
  currentMonth,
}) => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <button onClick={onPreviousMonth} className='text-xl'>
        &lt;
      </button>
      <h2 className='text-xl font-bold'>{currentMonth}</h2>
      <button onClick={onNextMonth} className='text-xl'>
        &gt;
      </button>
    </div>
  )
}

export default MonthNavigator
