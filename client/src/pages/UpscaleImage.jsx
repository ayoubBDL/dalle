import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { download } from '../assets';
import { downloadImage } from '../utils'
import { preview } from '../assets'
import { FormField, Loader } from '../components'

export const UpscaleImage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  })

  const [image, setImage] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [beforeAfter, setBeforeAfter] = useState(false)


  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
    setImage(e.target.files[0])
  }

  const generateImage = async ()=>{
    const formData = new FormData()
    formData.append('image', image)
    
    try {
      setGeneratingImg(true)
      
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/upscale`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await response.data

      setForm({...form, photo:`${data.image}`})
    } catch (error) {
      // alert(error)
      console.error(error)
    }
    finally{
      setBeforeAfter(true)
      setGeneratingImg(false)
    }
    
  }

  const toggleBeforeAfter = ()=>{
    setBeforeAfter(!beforeAfter)
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Upscale Your Photo</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Upscale Your Photo, accepted format are: PNG and JPG</p>
      </div>

      <div className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">

          <input
            type="file"
            id="image"
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            onChange={handleChange}
            required
          />
          {form.photo && <button
            type="button"
            onClick={toggleBeforeAfter}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >{beforeAfter?"See Before":"See After"}</button>}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-70 p-3 h-70 flex justify-center items-center">
            { form.photo ? (
              <>
                {
                beforeAfter?
                <div className='flex flex-col'>
                {/* <p className="mt-2 text-[#666e75] text-[20px] max-w-[500px] my-4 text-center">After</p> */}
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                </div>
                  :
                <div className='flex flex-col'>
                {/* <p className="mt-2 text-[#666e75] text-[20px] max-w-[500px] my-4 text-center">Before</p> */}
                  <img
                    src={URL.createObjectURL(image)}
                    className="w-full h-full object-contain"
                  />
                </div>
              }
            </>

              
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
              
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <button type="button" onClick={() => downloadImage(1, form.photo)} className="border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>

      </div>
    </section>
  )
}
