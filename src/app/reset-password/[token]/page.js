import LoginSignup from "./LoginSignup";

export default function ResetPage({ params }) {
  return <LoginSignup token={params.token} />;
}
