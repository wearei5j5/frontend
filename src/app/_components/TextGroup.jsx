import React from 'react';

const TextGroup = (props) => {
  const { mainText, subText } = props;

  return (
    <>
      <div className="text-2xl font-bold text-g400 sm:mb-4 mb-3 break-keep">{mainText}</div>
      <div className="text-sm text-g100 mb-14">{subText}</div>
    </>
  );
};

export default TextGroup;
