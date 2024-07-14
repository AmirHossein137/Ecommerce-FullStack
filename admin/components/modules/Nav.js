import {
  PanelBottom,
  House,
  ShoppingBasket,
  Logs,
  Settings,
  Layers3
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const acticeLink = "flex items-center gap-1 p-2";
  const inActiveLink = acticeLink + " bg-white text-slate-900 rounded-l-lg font-medium";

  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className="p-5 pr-0 text-white">
      <Link href="/" className="flex items-center gap-1 mb-5 mr-7">
        <PanelBottom />
        <span>Admin Panel</span>
      </Link>
      <nav className="flex flex-col gap-3">
        <Link
          href="/dashboard"
          className={
            pathname.includes("/dashboard") ? inActiveLink : acticeLink
          }
        >
          <House />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/products"
          className={
            pathname.includes("/products") ? inActiveLink : acticeLink
          }
        >
          <ShoppingBasket />
          <span>Products</span>
        </Link>
        <Link
          href="/categories"
          className={
            pathname.includes("/categories") ? inActiveLink : acticeLink
          }
        >
          <Layers3 />
          <span>Categories</span>
        </Link>
        <Link
          href="/orders"
          className={
            pathname.includes("/orders") ? inActiveLink : acticeLink
          }
        >
          <Logs />
          <span>Orders</span>
        </Link>
        <Link
          href="/settings"
          className={
            pathname.includes("/settings") ? inActiveLink : acticeLink
          }
        >
          <Settings />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
