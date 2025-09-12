import SignupForm from "./component/signupForm";
import style from "./style.module.scss";

export default function SignUpPage() {
  return (
    <div className={style.container}>
      <SignupForm />
    </div>
  );
}
