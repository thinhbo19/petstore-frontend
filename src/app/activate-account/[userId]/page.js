import ActiveAccountForm from "@/src/component/Form/ActiveAccountForm/ActiveAccountForm";

export default function ActiveAccountPage({ params }) {
  return <ActiveAccountForm userId={params.userId} />;
}
