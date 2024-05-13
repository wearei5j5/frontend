import localFont from 'next/font/local';

const myFont = localFont({ src: '../fonts/PretendardVariable.woff2' });

export default function Template(props) {
  return (
    <div className="relative flex flex-col justify-center overflow-hidde bg-gray-100 h-full">
      <div className="absolute inset-0"></div>
      <main
        className={`flex-1 h-full relative shadow-xl sm:mx-auto sm:w-layout bg-white ${myFont.className}`}
      >
        {props.children}
      </main>
    </div>
  );
}
