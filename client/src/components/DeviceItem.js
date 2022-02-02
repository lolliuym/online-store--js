import React from 'react'
import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'


const DeviceItem = ({ device }) => {
  const history = useHistory()
 
  return (
    <div className="cursor-pointer" onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
      <img className="w-40 h-40 " src={process.env.REACT_APP_API_URL + device.img} alt="" />
      <div className="mt-1 flex   justify-between text-gray-600">
        <div className=" ">Samsung</div>
        <div className="flex justify-end items-center">
          <div className="">{device.rating}</div>
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
      <div className="">{device.name}</div>

    </div>
  );

}

export default DeviceItem
