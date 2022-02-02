import React, { useState } from 'react';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {

  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <div className="container mx-auto">
      <div className='flex flex-col mt-4'>
        <button className="btn-secondary mt-2" onClick={() => setTypeVisible(true)}>Добавить тип</button>
        <button className="btn-secondary mt-2" onClick={() => setBrandVisible(true)}>Добавить бренд</button>
        <button className="btn-secondary mt-2" onClick={() => setDeviceVisible(true)}>Добавить устройство</button>
        <CreateType show={typeVisible} onClose={() => setTypeVisible(false)} />
        <CreateBrand show={brandVisible} onClose={() => setBrandVisible(false)} />
        <CreateDevice show={deviceVisible} onClose={() => setDeviceVisible(false)} />
      </div></div>

  );
};

export default Admin;
