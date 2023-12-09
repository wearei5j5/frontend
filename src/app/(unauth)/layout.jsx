import { redirect } from 'next/navigation';

export default function Layout(props) {
  return (
    <div>
      <div>UnAuth</div>
      <div>{props.children}</div>
    </div>
  );
}
