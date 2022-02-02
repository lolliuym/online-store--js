import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CreateDevice = observer(({ show, onClose }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])



  if (!show) {
    return null
  }

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }
  const selectFile = (e) => {
    setFile(e.target.files[0])
  }
  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('typeId', device.selectedType.id)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then((data) => {
      onClose()
    })

  }

  return (
    <div сlassName="absolute inset-0 h-full w-full ">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 w-full h-120vh" onClick={onClose}></div>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  ">
        <form>
          <div className="p-4 flex justify-between items-center border-b-2">
            <h2 className="text-xl font-bold ">Добавить устройство  </h2>
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="p-4 border-b-2 flex flex-col">
            <Menu as="div" className="relative inline-block text-left mt-2">
              <div>
                <Menu.Button className="btn-primary">
                  {device.selectedType.name || 'Выберите тип'}
                  <FontAwesomeIcon icon={faChevronDown} className='text-sm ml-1' />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {device.types.map(type =>
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                            <span onClick={() => device.setSelectedType(type)}
                              href=""
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )} key={type.id}
                            >{type.name}</span>
                          </div>

                        )}
                      </Menu.Item>
                    )}


                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative inline-block text-left mt-2">
              <div>
                <Menu.Button className="btn-primary">
                  {device.selectedBrand.name || ' Выберите брэнд'}
                  <FontAwesomeIcon icon={faChevronDown} className='text-sm ml-1' />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {device.brands.map(brand =>
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                            <span onClick={() => device.setSelectedBrand(brand)}
                              href="/"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )} key={brand.id}
                            >{brand.name}</span>
                          </div>

                        )}
                      </Menu.Item>
                    )}


                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <input type="text" className="mt-3 input-type" placeholder="Введите название устройства" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" className="mt-3 input-type" placeholder="Введите стоимость устройства" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <input id="file" type="file" className="mt-3 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-2
      file:rounded-xl file:border-0 file:text-sm file:font-semibold
      file:bg-slate-300 file:text-slate-700 hover:file:bg-slate-100 hover:file:ring-1 hover:file:ring-inset hover:file:ring-slate-500 " placeholder="Выберите файл устройства" onChange={selectFile} />
            <div className="">
              <button type="button" className="btn-secondary mt-2 inline-block" onClick={addInfo}>Добавить новое устройство</button>
            </div>

            {info.map(i =>
              <div className="flex flex-row  mt-2" key={i.number}>
                <input type="text" className="basis-2/6  input-type" placeholder="Введите название свойства" value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} />
                <input type="text" className="basis-2/6  input-type ml-2" placeholder="Введите описание свойства" value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} />
                <div className="basis-2/6 ml-2">
                  <button className="  btn-danger  inline  " onClick={() => removeInfo(i.number)}>Удалить</button>
                </div>

              </div>
            )}
          </div>
          <div className=" flex justify-end p-4">
            <button type="button" className="btn-danger mr-2" onClick={onClose}>Закрыть</button>
            <button type="button" className="btn-success" onClick={addDevice}>Добавить</button>

          </div>
        </form>


      </div >
    </div >



  );
});

export default CreateDevice;
