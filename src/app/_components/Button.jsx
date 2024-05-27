import Link from 'next/link';

export default function Button(props) {
  const {
    icon,
    bgColor,
    textColor,
    text,
    onClick,
    isLink,
    href,
    styleClass,
    disabled = false,
  } = props;

  return isLink ? (
    <Link
      href={href}
      className={`${bgColor} ${textColor} ${styleClass} cursor-pointer w-full rounded-lg py-3.5 text-center text-sm`}
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${styleClass} cursor-pointer w-full rounded-lg py-3.5 text-center text-sm relative disabled:bg-b50 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300`}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
}
