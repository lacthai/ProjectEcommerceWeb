import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./header.css";
import Cart from "./icon/cart.svg"
import Close from "./icon/close.svg"
import Menu from "./icon/menu.svg"
import  axios  from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../api/LoginApi';
import Modal from '../Modal/Modal';
import SearchForm from '../SearchForm/SearchForm';
import FilterForm from '../Filter/FilterForm';

const Header = () => {
      const dispatch = useDispatch()
      const { isAuth } = useSelector(state => state.login);
      const { user } = useSelector(state => state.user);
      const {cart} = useSelector(state=>state.cart)
      const [cart1,setCart1] = useState([])
      const [admin,setAdmin] =useState(false)
      const [openSearch, setOpenSearch] = useState(false)
      const [openFilter, setOpenFilter] = useState(false)
     const logoutUser = async () =>{
        logOutUser(dispatch)
        window.location.href = "/";
    }; 
    useEffect(()=>{
        if(cart&&isAuth){
            setCart1(cart)
        }
        if(user.role===1){
          setAdmin(true)
        }
    },[user,isAuth,cart])
    const loggedRouter = () =>{
      return(
          <>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
              <li onClick={() => setOpenSearch(true)}>Search</li>
              <li onClick={() => setOpenFilter(true)}>Filter </li>
              {
        openSearch &&
        <Modal titleTxt="Search" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      }
             {
        openFilter &&
        <Modal titleTxt="Filter" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      }
          </>
      )
  }
  const adminRouter = () =>{
      return(
          <>
              <li><Link to="/create_product">Create Product</Link></li>
              <li><Link to="/category">Categories</Link></li>
          </>
      )
  }
    return (
        <header>
           <div className="menu" >
                <img src={Menu} alt=""  width="30px"/>
            </div>
            <div>
                <h1>
                <Link to="/">{admin ? 'Admin' : 'DevAT Shop'}</Link>
                </h1>

            </div>
            <ul>
            <li><Link to="/products">{admin ? 'Products' : 'Shop'}</Link></li>

        {admin && adminRouter()}
        {
            isAuth ? loggedRouter() : <li><Link to="/login">Login ✥ </Link> <Link to="/register"> Register</Link>  
                       
            </li>
                                      
        }
                <li>
                    <img src={Close} alt=""  width="30px" className="menu"/>
                </li>
            </ul>
            {
                admin ? '' 
                :<div className="cart-icon">
                   {cart ?<span>{cart.length}</span>  : <span>0</span>} 
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
         
        </header>
    );
}
 

 
export default Header;