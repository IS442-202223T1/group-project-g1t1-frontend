import React from "react";

export default function PassTile({title, imgUrl, desc}){
  return (
    <div className='mb-5'>
      <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="nature" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900e">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
          <a href="/#" className="inline-flex items-center font-medium text-redPri hover:text-redSec">
            Learn more
            <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
          </a>
        </div>
      </a>
    </div>
  )
}
