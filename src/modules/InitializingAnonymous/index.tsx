import React from 'react';
import LoadingScreen from '../../components/LoadingScreen';

const InitializingAnonymous: React.FC = () => {
  return (
    <LoadingScreen 
      headingText="Initializing anonymous account setup..."
      paragraphText="Almost ready! Setting things up for you."
    />
  );
};

export default InitializingAnonymous;