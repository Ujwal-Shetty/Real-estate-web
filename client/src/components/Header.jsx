import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState ,useRef} from 'react';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

 

export default function Header() {
  const[toggleDropDown,setToggleDropDown]=useState(false)
  const dispatch = useDispatch();
  const menuRef=useRef()
  const imgRef=useRef()
  

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  window.addEventListener('click',(e)=>{
    if(e.target !==menuRef.current && e.target !==imgRef.current){
      setToggleDropDown(false)
    }
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-slate-200 shadow-md  w-full'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Broker</span>
            <span className='text-slate-700'>Bro</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>

         <div className=' flex relative'>
            {currentUser ? (
              <div className='flex'>
                <img
                ref={imgRef}
                onClick={()=>setToggleDropDown((prev)=>!prev)}
                className='rounded-full h-7 w-7 object-cover cursor-pointer hover:opacity-90'
                src={currentUser.avatar}
                alt='profile'
              />
              {toggleDropDown && (
                <div ref={menuRef} className='absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-5 justify-center items-center'>
                    <img
              
                className='rounded-full h-14 w-14 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
                  <Link
                  to='/profile'
                  className='text-lg text-gray-700 hover:text-gray-500 font-medium'
                  onClick={()=>setToggleDropDown(false)}
                  >View Profile
                  </Link>

                  <Link
                  to='/create-listing'
                  className='text-lg  text-gray-700 hover:text-gray-500 font-medium'
                  onClick={()=>setToggleDropDown(false)}
                  >Create new Listing
                  </Link>

                  <Link
                  to='/yourlistings'
                  className='text-lg  text-gray-700 hover:text-gray-500 font-medium'
                  onClick={()=>setToggleDropDown(false)}
                  >Your listings
                  </Link>

                  <Link
                  to='/about'
                  className='text-lg  text-gray-700 hover:text-gray-500 font-medium block sm:hidden'
                  onClick={()=>setToggleDropDown(false)}
                  >About us
                  </Link>

                  <span onClick={handleSignOut} className='text-red-700 text-lg cursor-pointer'>
                   Sign out
                    </span>

                </div>
              )}
              </div>
              
            ) : (
              <Link to='/sign-in'>
              <li className=' text-slate-700 hover:underline'> Sign in</li>
              </Link>
            )}
            </div>
        </ul>
      </div>
      
    </header>
  );
}
