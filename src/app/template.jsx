export default function Template(props) {
  return (
    <div className='relative flex h-screen flex-col justify-center overflow-hidde bg-gray-100'>
      <div className='absolute inset-0'></div>
      <main className='flex-1 h-full relative bg-white shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:min-w-[600px] overflow-hidden  px-6 pb-8 pt-10 sm:px-10'>
        {props.children}
      </main>
    </div>
  );
}
