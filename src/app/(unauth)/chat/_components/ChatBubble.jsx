export default function ChatBubble(props) {
  return (
    <div
      className={`flex flex-col my-2 w-fit ${
        props.sender === 'ai' ? 'items-start' : 'items-end'
      }`}
    >
      <div
        className={`px-3 py-1.5 break-keep text-sm
        ${
          props.sender === 'ai'
            ? 'border-main border-solid border-1 text-g300 rounded-r-xl rounded-bl-xl rounded-tl-sm'
            : 'bg-main text-white rounded-l-xl rounded-br-xl rounded-tr-sm min-w-full ml-12'
        }`}
      >
        {props.children ? (
          props.children
        ) : (
          <div className='break-all'>
            {props.message.split('\n').map((line, i) => (
              <span key={i} className='break-all'>
                {line}
                <br />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
