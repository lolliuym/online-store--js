import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => {

  return <div className=''>
    <button type="button" className="flex justify-center items-center text-center min-h-screen w-screen" disabled>
      <svg className="animate-spin h-10 w-10  " viewBox="0 0 24 24">
        <FontAwesomeIcon icon={faCircleNotch} />
      </svg>
    </button></div>
}


export default Spinner
