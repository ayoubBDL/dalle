import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import {logo} from './assets'
import { Home, CreatePost, CreateVariations } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div>
          <Link to={"/create-post"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mx-4">
            Create
          </Link>
          <Link to={"/create-variations"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Create Variations
          </Link>
        </div>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/create-variations' element={<CreateVariations />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}