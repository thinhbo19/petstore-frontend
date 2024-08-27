import Navbar from "@/src/component/NavbarAdmin/Navbar";
import "./AdminScreen.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admincontainer">
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
}
