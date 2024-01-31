'use client';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM_CODE = `GTM-${process.env.NEXT_PUBLIC_GTM_CODE}`;

const tagManagerArgs = {
  gtmId: GTM_CODE,
};

const GTMProvider = ({ children }) => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
  }, []);

  return <>{children}</>;
};

export default GTMProvider;
