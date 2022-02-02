import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import { Context } from '../index';

const Shop = observer(() => {
  const { device } = useContext(Context)


  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 3).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])
  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])

  return (
    <div className="container mx-auto">
      <div className="flex mb-8">
        <div className="flex-none w-44">
          <TypeBar />
        </div>
        <div className="grow">
          <BrandBar />
          <DeviceList />

        </div>

      </div>
      <Pages />
    </div>
  )
})

export default Shop
