import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Pages = observer(() => {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      {/* <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div> */}
      <div className="  mx-auto mt-4 ">

        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            {pages.map(page =>
              <div ><a
                key={page}
                active={device.page === page}
                onClick={() => device.setPage(page)}
                className={` cursor-pointer w-8 relative inline-flex 	justify-center	 px-2 py-2  border border-gray-300 bg-white text-sm font-medium    ${device.page === page ? "bg-sky-800 text-white  " : "text-gray-500 hover:bg-gray-50"}`}
              >
                {page}
              </a></div>

            )}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} />

            </a>
          </nav>
        </div>
      </div>
    </div >
  )
})

export default Pages
