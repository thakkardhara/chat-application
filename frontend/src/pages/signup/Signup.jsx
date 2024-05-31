import { Link } from "react-router-dom";
import GenderSelect from "./GenderSelect";
import { useState } from "react";
import UseSignup from "../../hooks/UseSignup";



const Signup = () => {

    const [inputs,setInputs] = useState({
        fullname:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:'',
    })

    const { loading, signup } = UseSignup();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(inputs)
        await signup(inputs)

    }

    const handleCheckboxChange=(gender)=>{
        setInputs({...inputs,gender})
    }



  return (
    <div className='flex flex-col items-center min-w-96 mx-auto' >
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-200'>
                Signup

                <span className='text-red-700'>  ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type='text' placeholder='Enter Name' className='w-full input input-bordered h-10'
                    value={inputs.fullname} onChange={(e)=> setInputs({...inputs,fullname: e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10'
                    value={inputs.username} onChange={(e)=> setInputs({...inputs,username:e.target.value})} />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
                    value={inputs.password} onChange={(e)=> setInputs({...inputs,password:e.target.value})} />
                </div> 

             

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm-password</span>
                    </label>
                    <input type='password' placeholder='Re-enter Password' className='w-full input input-bordered h-10'
                    value={inputs.confirmPassword} onChange={(e)=> setInputs({...inputs,confirmPassword:e.target.value})} />
                </div>

                <GenderSelect onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />


                <Link to='/login' className='text-sm hover:underline hover:text-red-700 mt-2 inline-block'>
                    Already have an account?

                </Link>
                <div>
                <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
                </div>

            </form>

        </div>


    </div>
  )
}

export default Signup;

