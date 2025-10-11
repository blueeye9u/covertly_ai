import React from 'react';
import LoadingScreen from '../../components/LoadingScreen';

const AccountEncryptingModule: React.FC = () => {
  return (
    <LoadingScreen 
      headingText="Encrypting & securing your dashboard..."
      paragraphText="Good things take a moment – almost there!"
    />
  );
};

export default AccountEncryptingModule;