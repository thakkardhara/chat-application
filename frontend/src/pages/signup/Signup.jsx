import GenderSelect from "./GenderSelect";



const Signup = () => {
  return (
    <div className='flex flex-col items-center min-w-96 mx-auto' >
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-200'>
                Signup

                <span className='text-red-700'>  ChatApp</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type='text' placeholder='Enter Name' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10' />
                </div>

                <GenderSelect/>           
             

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm-password</span>
                    </label>
                    <input type='text' placeholder='Re-enter Password' className='w-full input input-bordered h-10' />
                </div>
                <a href='#' className='text-sm hover:underline hover:text-red-700 mt-2 inline-block'>
                    Already have an account?

                </a>
                <div>
                    <button className='btn btn-block btn-sm mt-2'>Signup</button>
                </div>

            </form>

        </div>


    </div>
  )
}

export default Signup;
