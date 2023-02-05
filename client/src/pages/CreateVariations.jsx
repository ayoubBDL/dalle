import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

export const CreateVariations = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  })

  const [image, setImage] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({...form, prompt:`This is Image Variations`})
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
    setImage(e.target.files[0])
  }


  const generateImage = async ()=>{
    //call the api
    const numberImages = 1
    const formData = new FormData()
    formData.append('numberImages', numberImages)
    formData.append('image', image)

    try{
      setGeneratingImg(true)
      const result = await axios({
          method: "post",
          url: `${import.meta.env.VITE_APP_API_URL}/dalle/variations`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(result.data.images)
      setForm({...form, photo:`${result.data.images[0].url}`})
    }catch(error){
      // alert('service error')
      console.log(error)
    }finally{
      setGeneratingImg(false)
    }   
  }
  console.log(form)
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Variations</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate variations of your image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          

            <input
                type="file"
                id="image"
                name="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                onChange={handleChange}
                required
            />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
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

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}
