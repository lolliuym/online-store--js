import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onClose }) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue('')
      onClose()
    })
  }
  if (!show) {
    return null
  }

  return (
    <div сlassName=" ">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 w-full h-full" onClick={onClose}></div>
      <div className="max-w-lg mx-auto relative bg-white rounded-md shadow-xl  ">
        <form>
          <div className="p-4 flex justify-between items-center border-b-2">
            <h2 className="text-xl font-bold ">Добавить тип</h2>
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>          </div>
          <div className="p-4 border-b-2">
            <input name="text" type="text" className="    relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " value={value} onChange={e => setValue(e.target.value)} placeholder="Введите брэнд устройства" />
          </div>
          <div className=" flex justify-end p-4">
            <button className="btn-danger mr-2" onClick={onClose}>Закрыть</button>
            <button className="btn-success" onClick={addBrand}>Добавить</button>

          </div>
        </form>


      </div>
    </div>
  );
};

export default CreateBrand;
