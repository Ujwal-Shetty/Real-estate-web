import { useSelector } from 'react-redux';
import {
 
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MenuPage() {
  
  const { currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

 



  return (
    <div className='p-3 max-w-lg mx-auto absolute hidden'>

<ul className='flex flex-col justify-end text-center items-center gap-7 text-2xl'>
    <li>
    <img
          src={currentUser.avatar}
          alt='profile'
          className='rounded-full h-24  w-24 object-cover cursor-pointer self-center mt-2'
        />
    </li>
    <li className='block sm:hidden'>
    <Link to='/'>
          Home
         </Link>
    </li>
    <li >
    <Link to='/profile'>
          View profile
         </Link>
    </li>

    <li>
    <Link to='/yourlistings'>
        <button >
        Your listings
        </button>
          
         </Link>
    </li>
    
    <li>
    <Link to='/create-listing' >
          Create new listing
        </Link>
    </li>
    <li className='block sm:hidden'>
    <Link to='/about'>
          About
         </Link>
    </li>
    
    <li>
    <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
    </li>
</ul>    
       
</div>

    
  );
}
