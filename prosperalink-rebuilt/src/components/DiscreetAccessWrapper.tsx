'use client';

import React, { useState } from 'react';
import DiscreetAccess from './DiscreetAccess';

export default function DiscreetAccessWrapper() {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DiscreetAccess 
      isVisible={isVisible} 
      onToggle={handleToggle} 
    />
  );
} 