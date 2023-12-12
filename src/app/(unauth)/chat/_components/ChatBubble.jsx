export default function ChatBubble(props) {
  return (
    <div className='flex flex-col justify-start my-2 w-fit'>
      <div
        className={`px-3 py-1.5 break-keep text-sm
        ${
          props.sender === 'ai'
            ? 'border-main border-solid border-1 text-g300 rounded-r-xl rounded-bl-xl rounded-tl-sm'
            : 'bg-main text-white rounded-l-xl rounded-br-xl rounded-tr-sm '
        }`}
      >
        <div>{props.message}</div>
      </div>
    </div>
  );
}
