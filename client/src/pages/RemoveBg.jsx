import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { download } from '../assets';
import { downloadImage } from '../utils'
import { preview } from '../assets'
import { FormField, Loader } from '../components'

export const RemoveBg = () => {
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const generateImage = async ()=>{
    const formData = new FormData()
    formData.append('image_file', image)
    
    try {
      setGeneratingImg(true)
      
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/removebg`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await response.data

      setForm({...form, photo:`data:image/png;base64,${data.image}`})
    } catch (error) {
      // alert(error)
      console.error(error)
    }
    finally{
      setGeneratingImg(false)
    }
    
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Remove Background</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Remove Background of your image</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">

          <input
            type="file"
            id="image"
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            onChange={handleChange}
            required
          />
          <div className='flex'>
            {image && form.photo && <img
              src={URL.createObjectURL(image)}
              className="w-64 h-64 object-contain"
            />}
          
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <>
                <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
                />
                

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

      </form>
    </section>
  )
}
