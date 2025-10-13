// components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  // Pages that should not show the sidebar
  const noSidebarPages = ['/', '/signin', '/signup', '/about', '/contact'];

  const shouldShowSidebar = !noSidebarPages.includes(router.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        {shouldShowSidebar && <Sidebar />}
        <main className={`flex-1 transition-all duration-300 ${
          shouldShowSidebar ? 'lg:ml-0' : ''
        }`}>
          <div className="flex-1 pb-20">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
