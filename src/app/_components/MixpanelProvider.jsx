'use client';
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

const MixpanelProvider = ({ children }) => {
  useEffect(() => {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });
    mixpanel.track('Sign Up');
  }, []);

  return <>{children}</>;
};

export default MixpanelProvider;
