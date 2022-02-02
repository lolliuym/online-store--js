import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../index'

const TypeBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <div className="p-4">
      <ul className=" ">
        {device.types.map(type =>
          <li className="   overflow-hidden   group  "
            key={type.id}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}>
            <button className={`group-first:rounded-t-xl group-last:rounded-b-xl  btn-primary--rect ${type.id === device.selectedType.id ? "bg-sky-700 text-white" : ""}`}>   {type.name}</button>
          </li>
        )}

      </ul>

    </div >
  )
})

export default TypeBar
