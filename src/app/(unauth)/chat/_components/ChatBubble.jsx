export default function ChatBubble(props) {
  return (
    <div className='flex flex-col justify-start border-2 my-2 w-fit'>
      <div
        className={`px-3 py-1.5 
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
