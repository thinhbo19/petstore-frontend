import ChatBox from "@/src/component/ChatBox/ChatBox";
import Footer from "@/src/component/Footer/Footer";
import Navbar from "@/src/component/Navbar/Navbar";
import ScrollButton from "@/src/component/ScrollButton/ScrollButton";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {/* <ChatBox /> */}
      <ScrollButton />
    </>
  );
}
