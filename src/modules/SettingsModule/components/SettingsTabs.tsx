import React from 'react'
import {DeleteIcon, PasswordIcon, ProfileIcon } from '../../../svgs/svg';
import useLoggedInUser from '../../../hooks/useLoggedInUser';

const tabs = [
    { name: "Profile Settings", icon: <ProfileIcon />, current: true, key: 0 },
    { name: "Password", icon: <PasswordIcon />, current: false, key: 1 },
    { name: "Purging Settings", icon: <DeleteIcon />, current: false, key: 2 },
  ];
const SettingsTabs = ({setSelectedTabIdx,selectedTabIdx}:any) => {
  const [,,, isAnonymous] = useLoggedInUser();
  return (
    <ul className="settings__tabs" aria-label="Tabs">
    {tabs.filter((item) => !isAnonymous || item.name !== "Password").map((tab) => (
      <li key={tab.name}>
        <button
          onClick={() => setSelectedTabIdx(tab.key)}
          className={`${tab.key === selectedTabIdx ? "btn-active" : ""} w-full rounded-md flex items-center gap-3 px-4 py-2.5 text-black dark:text-white`}
        >
          <span className={`${tab.key === selectedTabIdx ? "" : "opacity-40"}`}>{tab.icon}</span>
          <span className='text-sm'>{tab.name}</span>
        </button>
      </li>
    ))}
  </ul>
  )
}

export default SettingsTabs