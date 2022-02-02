import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../index'

const BrandBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <div className="flex mt-4">
      {device.brands.map(brand =>
        <div key={brand.id} >
          <button className={`btn-primary mr-2
           ${brand.id === device.selectedBrand.id ? "bg-sky-700 text-white" : ""} `}
            onClick={() => device.setSelectedBrand(brand)}>
            {brand.name}
          </button>
        </div>
      )}
    </div>
  )
})

export default BrandBar
