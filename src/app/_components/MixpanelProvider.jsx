'use client';
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

const PROXIED_DOMAIN = process.env.NEXT_PUBLIC_PROXIED_DOMAIN;
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

const MixpanelProvider = ({ children }) => {
  useEffect(() => {
    mixpanel.init(MIXPANEL_TOKEN, {
      api_host: PROXIED_DOMAIN,
      debug: true,
    });
  }, []);

  return <>{children}</>;
};

export default MixpanelProvider;
