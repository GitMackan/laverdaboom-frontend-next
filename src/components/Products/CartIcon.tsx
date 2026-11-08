
"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);

  const count = hydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <Link
      href="/shop/cart"
      aria-label={`Varukorg, ${count} produkter`}
      className="relative inline-flex items-center justify-center p-2 text-[#222] hover:opacity-70 transition-opacity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>

      {hydrated && count > 0 && (
        <span className="absolute -top-1 -right-1 flex min-w-[19px] h-[19px] items-center justify-center rounded-full bg-[#222] px-1 text-[11px] font-primary text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
