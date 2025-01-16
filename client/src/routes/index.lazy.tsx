import { createLazyFileRoute } from '@tanstack/react-router'
import CandleChart from '../component/CandleChart'
import { useEffect } from 'react'
export const Route = createLazyFileRoute('/')({
  component: Index,
  
})

function Index() {


  return (
    <div className="p-2 text-blue-300">
      <CandleChart />
    </div>
  )
}
