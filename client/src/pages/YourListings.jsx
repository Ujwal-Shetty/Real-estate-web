import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function YourListings() {
  
  const { currentUser } = useSelector((state) => state.user);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  useEffect(() => {
    handleShowListings();
  }, []);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto' >
        <div className='flex flex-col gap-4' >
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          <p className='text-red-700 mt-5'>
           {showListingsError ? 'Error showing listings' : ''}
          </p>
          {userListings.map((listing) => (
            <div 
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}

          <br></br>
        <br></br>
        
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 w-full'
          to={'/create-listing'}
        >
          Create new listing
        </Link>
        
        </div>    
      
    </div>
  );
}
