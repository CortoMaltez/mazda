'use client';

import React, { useState } from 'react';
import DiscreetIndicator from './DiscreetIndicator';

export default function DiscreetIndicatorWrapper() {
  const [isVisible, setIsVisible] = useState(true);
  const [userType, setUserType] = useState<'admin' | 'consultant' | 'none'>('none');

  return (
    <DiscreetIndicator 
      isVisible={isVisible} 
      userType={userType} 
    />
  );
} 