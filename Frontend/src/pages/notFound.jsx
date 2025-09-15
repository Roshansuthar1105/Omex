import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-screen flex flex-col gap-6 justify-center items-center'>
        <h1 className='text-6xl font-bold text-gray-200'>Oops!</h1>
        <p className='text-2xl text-gray-400'>The page you're looking for doesn't exist.</p>
        <Link to = "/" className='text-xl underline'>Go to homepage</Link> 
     </div>
  )
}

export default NotFound