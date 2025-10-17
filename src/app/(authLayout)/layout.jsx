import AuthNavbar from "../(dashboard)/AuthNavBar";

export default function AuthLayout({ children }) {
  return <section className="">
    <AuthNavbar/>
    {children}
    </section>;
}