import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data))
  })

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <img src={process.env.REACT_APP_API_URL + device.img} alt="" className='h-72 mx-auto' />
        <div className="text-center">
          <h2 className="text-3xl">{device.name}</h2>
          <div className="relative mt-4 ">
            <FontAwesomeIcon icon={faStar} className=" inset-full_important fill-gray-500" />
            <span className="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute text-3xl  ">{device.rating}</span>
          </div>
        </div>
        <div className="w-full h-full border-4 flex flex-col justify-around items-center border-slate-300 ">
          <h1 className="text-2xl">От: {device.price} руб</h1>
          <button className="btn-secondary">Добавить в коризну</button>
        </div>
      </div>
      <div className="">
        <h1 className="text-3xl">Характеристика</h1>
        <ul className=" mt-2 ">

          {device.info.map(info =>
            <li className='flex row odd:bg-slate-300 p-2 ' key={info.id}>
              <span className="basis-1/2">{info.title}</span>
              <span className="basis-1/2">{info.description}</span>
            </li>

          )}

        </ul>
      </div>
    </div>
  )
}

export default DevicePage
