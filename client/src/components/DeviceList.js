import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context)


  return (
    <div>
      <div>
        <p className="text-sm text-gray-700 mt-4">
          Показаны <span className="font-medium">1</span> - <span className="font-medium">{device.limit} </span> из
          <span className="font-medium"> {device.totalCount}</span> результатов
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-item-center mt-4">
        {device.devices.map(device =>
          <DeviceItem key={device.id} device={device} />)}
      </div>
    </div>);

})

export default DeviceList
