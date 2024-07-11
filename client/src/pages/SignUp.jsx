import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
     setFormData({
      ...formData,
       [e.target.id] : e.target.value
     })
  } 

  async function handleSubmit(e) {
    e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup', {
          method:'POST',
          headers: {
              'Content-Type':'application/json',
          },
          body: JSON.stringify(formData)
     });
     const data = await res.json();
     if(data.success === false) {
       setLoading(false);
       setError(data.message);
       return;
     }
     console.log(data);
     setSuccess(data)
     setError(null);
     setTimeout(()=>{
      navigate('/sign-in');
      setLoading(false)
     },1000)
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
  }
  // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
             <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
             <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
             <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
             <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? <ClipLoader size={18} color="green"/> : "Sign up"}</button>
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to='/sign-in'>
                 <span className='text-blue-700'>Sign in</span>
            </Link>
        </div>
        {success && <p className='text-green-500 mt-5'>{success}</p>}
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
