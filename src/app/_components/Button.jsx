import Link from 'next/link';

export default function Button(props) {
  const { icon, bgColor, textColor, text, onClick, isLink, href, styleClass } = props;

  return isLink ? (
    <Link
      href={href}
      className={`${bgColor} ${textColor} ${styleClass} cursor-pointer text-sm w-full rounded-lg py-3.5 text-center font-medium`}
    >
      {text}
    </Link>
  ) : (
    <div
      onClick={onClick}
      className={`${bgColor} ${textColor} ${styleClass} cursor-pointer text-sm w-full rounded-lg py-3.5 text-center font-medium relative`}
    >
      {text}
      {icon}
    </div>
  );
}
