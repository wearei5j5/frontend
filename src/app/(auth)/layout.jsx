import { redirect } from 'next/navigation';

export default function Layout(props) {
  const isAuth = false;

  // if (!isAuth) {
  //   redirect('/login');
  //   return null;
  // }
  return <>{props.children}</>;
}
