import Footer from "@/src/component/Footer/Footer";
import ScrollButton from "@/src/component/ScrollButton/ScrollButton";

export default function UserLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
      <ScrollButton />
    </>
  );
}
