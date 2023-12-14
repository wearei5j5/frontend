export default function Modal(props) {
  return (
    <>
      <div
        className={`${props.bg} modal fixed w-full top-0 sm:max-w-[600px] flex-1  h-full top-0 left-1/2 flex items-center justify-center z-20 -translate-x-1/2`}
      >
        <div
          className={`modal-overlay absolute w-full h-full ${props.bg}`}
        ></div>

        <div className='modal-container flex flex-col justify-between w-full h-full z-50'>
          <div className='h-full modal-content grow-1 container mx-auto h-auto text-left'>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
