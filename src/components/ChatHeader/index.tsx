import React from 'react'
import { images } from '../../assets/images'
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import UserDropDown from '../global/userDropdown/UserDropdown';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../context/themeContext';

const ChatHeader = () => {
  const [isLoggedIn] = useLoggedInStatus();
  const { isDarkMode } = useTheme();
  return (
    <div className='chatHead__head'>
      <strong className="block">
        <Link href={"/chat"} className="inline-block">
          <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={44} />
        </Link>
      </strong>
      <div className='flex gap-3 items-center'>
        {isLoggedIn ? (
          <UserDropDown imgUrl={images.profileImg || ''} />
        ) : null}
      </div>
    </div>
  )
}

export default ChatHeader