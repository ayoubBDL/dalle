import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import {Loader, Card, FormField} from '../components'

const RenderCards = ({data, title})=>{
  if(data?.length > 0) {
    return data.map((post)=> <Card key={post._id} {...post} />)
  }
  return(
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
      {title}
    </h2>
  )
}


export const Home = () => {
  const [loading, setLoading] = useState(false)
  // const [allPosts, setAllPosts] = useState(null)
  // const [searchText, setSearchText] = useState('')
  // const [searchedResults, setSearchedResults] = useState(null)
  // const [searchTimeout, setSearchTimeout] = useState(null)

  // useEffect(()=>{
  //   const fetchPosts = async ()=>{
  //     setLoading(true)
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/post`,{
  //         method:'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })

  //       if(response.ok){
  //         const result = await response.json()

  //         setAllPosts(result.data.reverse())
  //       }
  //     } catch (error) {
  //       alert(error)
  //     }finally{
  //       setLoading(false)
  //     }
  //   }

  //   fetchPosts()
  // },[])
  
  // const handleSearchChange = (e) =>{
  //   clearTimeout(searchTimeout)
  //   setSearchText(e.target.value)

  //   setSearchTimeout(
  //     setTimeout(() => {
  //       const searchResults = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || 
  //       item.prompt.toLowerCase().includes(searchText.toLowerCase()))
  
  //       setSearchedResults(searchResults)
  //     }, 500)

  //   )
  // }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Our Services
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
          Choose from our range of AI-powered image creation and manipulation services.
        </p>
      </div>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Link to={"/create-image"} className='link rounded-lg shadow-md bg-white overflow-hidden'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>Create Images from Text</div>
            <p className='text-gray-700 text-base'>
              Generate unique and imaginative images from any text input using DALL-E AI.
            </p>
          </div>
        </Link>

        <Link to={"/create-variations"} className='link rounded-lg shadow-md bg-white overflow-hidden'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>Create Image Variations from Your Own Image</div>
            <p className='text-gray-700 text-base'>
              Transform your own images with DALL-E AI to create visually stunning variations.
            </p>
          </div>
        </Link>

        <Link to={"/removebg"} className='link rounded-lg shadow-md bg-white overflow-hidden'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>Remove Background from Images</div>
            <p className='text-gray-700 text-base'>
              Easily remove backgrounds from your images with the power of AI.
            </p>
          </div>
        </Link>

        <Link to={"/upscale"} className='link rounded-lg shadow-md bg-white overflow-hidden'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>Upscale Images</div>
            <p className='text-gray-700 text-base'>
              Enhance the quality of your images with the power of AI.
            </p>
          </div>
        </Link>
      </div>

    </section>
  )
}
