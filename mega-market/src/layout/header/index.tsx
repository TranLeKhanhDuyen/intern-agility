import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@services'
import { ValidationMessages } from '@constants'
import {
  Button,
  ButtonIcon,
  IconTextButton,
  Logo,
  SearchBar
} from '@components'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleSignInClick = () => {
    navigate('/auth/login')
  }

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm(ValidationMessages.LogoutQuestion)
    if (confirmLogout) {
      setUser(null)
      navigate('/')
      localStorage.removeItem('cart')
    }
  }

  const handlePurchaseHistory = () => {
    navigate('/purchase-history')
  }

  const handleUserClick = () => {
    if (user) {
      setDropdownVisible(!dropdownVisible)
    } else {
      handleSignInClick()
    }
  }

  const handleOptionClick = (option: string) => {
    if (option === 'logout') {
      handleLogoutClick()
    } else if (option === 'purchase-history') {
      handlePurchaseHistory()
    }
  }

  const handleNavigateCartPage = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    navigate('/cart')
  }

  return (
    <nav className='container header'>
      <article className='header-left'>
        <ButtonIcon icon='menu' size='sm' variants='square' />
        <Logo />
      </article>

      <SearchBar additionalClass='search-header' />

      <article className='header-right'>
        <div className='user-dropdown' onClick={handleUserClick}>
          <IconTextButton
            size='md'
            subTitle={user ? '' : 'Sign Up/Sign In'}
            title={user ? user.userName : ''}
            icon='user'
            additionalClass='header-user-icon'
          />
          {dropdownVisible && (
            <div className='dropdown-menu'>
              <Button
                onClick={() => handleOptionClick('purchase-history')}
                label='Purchase order'
              />
              <Button
                onClick={() => handleOptionClick('logout')}
                label='Logout'
              />
            </div>
          )}
        </div>
        <IconTextButton
          size='md'
          subTitle='Cart'
          icon='buy'
          additionalClass='header-buy-icon'
          onClick={handleNavigateCartPage}
        />
      </article>
    </nav>
  )
}

export default Header
