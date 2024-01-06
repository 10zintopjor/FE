import './Desktop.css'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getCart, getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant';

const DesktopNavigation = () => {

  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate()
  let authToken = localStorage.getItem('Authorization');
  let setProceed = authToken !== null ? true : false
  useEffect(() => {
    getCart(setProceed, setCart, authToken)
    getWishList(setProceed, setWishlistData, authToken)
  }, [])


  return (
    <>
      <nav className='nav'>
        <div className="logo">
          <Link to='/'>
            <span > Etibet - Service,Solution,Support</span>
          </Link>
        </div>
        <div className="nav-items">
          <ul className="nav-items">
          <li className="nav-links">
                <NavLink to="/">
                  <span className='nav-icon-span'>E-Store</span>
                </NavLink>
            </li>

            <li className="nav-links">
                <NavLink to="/cart">
                  <span className='nav-icon-span'>Services</span>
                </NavLink>
            </li>
            <li className="nav-links">
                <NavLink to="/wishlist">
                  <span className='nav-icon-span'>Wallet</span>
                </NavLink>
            </li>
            <li className="nav-links">
                <NavLink to="/deals">
                  <span className='nav-icon-span'>Deals</span>
                </NavLink>
            </li>
            <li className="nav-links">
                <NavLink to="/ads">
                  <span className='nav-icon-span'>Ads</span>
                </NavLink>
            </li>
            <li className="nav-links cs">
                <NavLink to="/custonmersupport">
                  <span className='nav-icon-span'>Customer Support</span>
                </NavLink>
            </li>

            
          </ul>
        </div>
      </nav >



      
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>  Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}>Logout</Button></Link>
          <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default DesktopNavigation