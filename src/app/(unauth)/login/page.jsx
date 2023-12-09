import { redirect } from 'next/navigation';

export default function Login() {
  // 로그인이 되어있으면 접근 못하도록 방지
  // const isAuth = true;

  // if (isAuth) {
  //   redirect('/chat');
  // }
  return <div>로그인 페이지</div>;
}
