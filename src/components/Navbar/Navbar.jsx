import  { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isUser,setIsUser] =useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();




  //user or admin naviagte
  useEffect(() => {
    const user = localStorage.getItem('isUser')==='true';
    if(user){
      setIsUser(true);
    }
    else{
      setIsUser(false);
    }
    const localStatus = localStorage.getItem('isLoggedIn') === 'true';

    if (localStatus) {
      axios
        .get('http://localhost:5000/auth/api/info', {
          withCredentials: true,
        })
        .then((res) => {
          setUserName(res.data.name);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('User not authenticated:', err);
          localStorage.removeItem('isLoggedIn');
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // recheck on route change

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('company');
    localStorage.removeItem('isUser');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate('/login');
  };

  return (
   
<nav className="bg-slate-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center shadow-md border-b border-slate-700 relative">
  {/* Logo + Title */}
  <div className="flex items-center gap-2 sm:gap-2">
    <img
      src="https://img.freepik.com/premium-vector/job-finder-with-recruitment-business-employment-hiring-interview-employee-logo-design_742608-93.jpg"
      width={40}
      height={40}
      alt="logo"
      className="rounded-full"
    />
    <h1 className="text-base sm:text-xl font-bold text-yellow-400">Job Finder</h1>
  </div>


{/* User-specific links */}
{isLoggedIn && (
  <div className="flex items-center gap-4 mt-3 sm:mt-0 text-xs sm:text-base">
    {isUser ? (
      <>
        <Link to="/employee/all-jobs" className="text-yellow-400 hover:text-yellow-300 transition">
          All Jobs
        </Link>
        <Link to="/employee/applied-jobs" className="text-yellow-400 hover:text-yellow-300 transition">
          Applied Jobs
        </Link>
      </>
    ) : (
      <>
        <Link to="/company/post-job" className="text-yellow-400 hover:text-yellow-300 transition">
          Post Job
        </Link>
        <Link to="/company/job-list" className="text-yellow-400 hover:text-yellow-300 transition">
           Job Lists
        </Link>
        <Link to="/company/applicants" className="text-yellow-400 hover:text-yellow-300 transition">
          Applicants
        </Link>
      </>
    )}
  </div>
)}


  {/* User Menu */}
  <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-0 text-xs sm:text-base" ref={dropdownRef}>
    {isLoggedIn ? (
      <div className="relative cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
        <span className="text-yellow-400 hover:text-yellow-300 transition">{userName}</span>
        {showMenu && (
          <div className="absolute right-0 mt-2 bg-slate-700 border border-slate-500 rounded-md shadow-md z-50 min-w-[120px] sm:min-w-[150px]">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-slate-600 hover:text-yellow-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/login"
        className="text-yellow-400 hover:text-yellow-300 transition"
      >
        Login
      </Link>
    )}
  </div>
</nav>

  );
};

export default Navbar;
