"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

/**
 * ✅ Added feature:
 * - Click a menu item -> opens modal with details
 * - Click outside modal OR click close icon -> closes modal
 * - Click item image -> fullscreen preview (click outside / close / ESC to close)
 */

const coverImage = "/menu-page-1.png";
const menuBgImage = "/menu-page-2.png";
const lastImage = "/menu-page-1.png";

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 90 : -90,
    opacity: 0,
    filter: "blur(2px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    x: direction > 0 ? -90 : 90,
    opacity: 0,
    filter: "blur(2px)",
  }),
};

const modalVariants: Variants = {
  overlayIn: { opacity: 1 },
  overlayOut: { opacity: 0 },
  modalIn: { opacity: 1, y: 0, scale: 1 },
  modalOut: { opacity: 0, y: 10, scale: 0.98 },
};

function safeText(v: unknown, fallback = "") {
  if (v === null || v === undefined) return fallback;
  return String(v);
}

/* ---------- API types ---------- */

type ApiCategory = {
  id: number;
  title: string;
  image?: string | null;
};

type ApiProduct = {
  id: number;
  title: string;
  description?: string | null;
  price?: string | number | null;
  category?: Array<{ id: number }>;
  images?: Array<{ image: string }>;
};

/* ---------- Normalizers ---------- */

function normalizeCategory(c: ApiCategory) {
  return {
    id: c.id,
    name: c.title ?? "Category",
    image: c.image ?? null,
  };
}

function normalizeProduct(p: ApiProduct) {
  const catId =
    Array.isArray(p.category) && p.category.length ? p.category[0]?.id : null;

  const img =
    Array.isArray(p.images) && p.images.length ? p.images[0]?.image : null;

  return {
    id: p.id,
    name: p.title ?? "Item",
    description: p.description ?? "",
    price: p.price ?? null,
    categoryId: catId,
    image: img,
  };
}

type Category = ReturnType<typeof normalizeCategory>;
type Product = ReturnType<typeof normalizeProduct>;

type Page =
  | { type: "cover" }
  | { type: "last" }
  | { type: "category"; category: Category; items: Product[] };

/* ---------- Pagination fetch ---------- */

async function fetchAllPages(url: string): Promise<ApiProduct[]> {
  let nextUrl: string | null = url;
  const all: ApiProduct[] = [];

  while (nextUrl) {
    const res: Response = await fetch(nextUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch: ${nextUrl}`);

    const json: { results?: ApiProduct[]; next?: string | null } =
      await res.json();

    const results: ApiProduct[] = Array.isArray(json.results) ? json.results : [];
    all.push(...results);

    nextUrl = json.next ?? null;
  }

  return all;
}

export default function MenuBookPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const catRes: Response = await fetch(
          "https://apis.dawatsrls.com/api/v1/menu/category/",
          { cache: "no-store" }
        );
        if (!catRes.ok) throw new Error("Failed to load categories");

        const catJson: { results?: ApiCategory[] } = await catRes.json();
        const catList: ApiCategory[] = Array.isArray(catJson.results)
          ? catJson.results
          : [];
        const normalizedCats: Category[] = catList
          .map(normalizeCategory)
          .filter((c) => c.id != null);

        const rawProducts: ApiProduct[] = await fetchAllPages(
          "https://apis.dawatsrls.com/api/v1/menu/products/"
        );
        const normalizedProds: Product[] = rawProducts
          .map(normalizeProduct)
          .filter((p) => p.id != null);

        if (!alive) return;

        normalizedCats.sort((a, b) =>
          safeText(a.name).localeCompare(safeText(b.name))
        );

        setCategories(normalizedCats);
        setProducts(normalizedProds);
      } catch (e: unknown) {
        if (!alive) return;
        const message = e instanceof Error ? e.message : "Something went wrong";
        setErr(message);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const productsByCategory = useMemo(() => {
    const map = new Map<number, Product[]>();

    for (const c of categories) map.set(c.id, []);

    for (const p of products) {
      if (p.categoryId == null) continue;
      const list = map.get(p.categoryId);
      if (!list) continue;
      list.push(p);
    }

    for (const [k, list] of map.entries()) {
      list.sort((a, b) => safeText(a.name).localeCompare(safeText(b.name)));
      map.set(k, list);
    }

    return map;
  }, [categories, products]);

  const pages = useMemo<Page[]>(() => {
    const built: Page[] = [];
    built.push({ type: "cover" });

    for (const c of categories) {
      built.push({
        type: "category",
        category: c,
        items: productsByCategory.get(c.id) ?? [],
      });
    }

    built.push({ type: "last" });
    return built;
  }, [categories, productsByCategory]);

  useEffect(() => {
    if (pageIndex > pages.length - 1) {
      setPageIndex(Math.max(0, pages.length - 1));
    }
  }, [pages.length, pageIndex]);

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;

  const current = pages[pageIndex];

  function goNext() {
    if (!canNext) return;
    setDirection(1);
    setPageIndex((p) => p + 1);
  }

  function goPrev() {
    if (!canPrev) return;
    setDirection(-1);
    setPageIndex((p) => p - 1);
  }

  // ✅ Close modal on ESC
  useEffect(() => {
    if (!selectedItem) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-white text-white">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-4 text-black">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
          Dawat Restaurant & Grill — Menu Book
        </h3>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          {/* Book */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#121217] shadow-2xl">
              <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-[#1a1a22] to-[#0d0d12] border-r border-white/10" />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-white/5 rounded-[28px]" />

              <div className="relative min-h-[68vh] md:min-h-[72vh]">
                <div
                  className="absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage: `url(${menuBgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

                <div className="relative p-6 md:p-10">
                  {loading ? (
                    <div className="flex min-h-[56vh] items-center justify-center">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white/80">
                        Loading menu…
                      </div>
                    </div>
                  ) : err ? (
                    <div className="flex min-h-[56vh] items-center justify-center">
                      <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5">
                        <div className="font-semibold text-red-200">
                          Couldn’t load menu
                        </div>
                        <div className="mt-2 text-sm text-red-100/80">{err}</div>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={`${pageIndex}-${current?.type}-${(current as any)?.category?.id ?? ""}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="min-h-[56vh]"
                      >
                        {current?.type === "cover" && <CoverPage />}
                        {current?.type === "category" && (
                          <CategoryPage
                            category={current.category}
                            items={current.items}
                            onItemClick={(item: Product) => setSelectedItem(item)}
                          />
                        )}
                        {current?.type === "last" && <LastPage />}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                {!loading && !err && pages.length > 0 && (
                  <div className="absolute bottom-4 left-0 right-0 px-6 md:px-10">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={goPrev}
                        disabled={!canPrev}
                        className={[
                          "rounded-xl px-4 py-2 text-sm border transition",
                          canPrev
                            ? "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-white/40 cursor-not-allowed",
                        ].join(" ")}
                      >
                        Prev page
                      </button>

                      <div className="text-xs text-white/60">
                        Page {pageIndex + 1} / {pages.length}
                      </div>

                      <button
                        onClick={goNext}
                        disabled={!canNext}
                        className={[
                          "rounded-xl px-4 py-2 text-sm border transition",
                          canNext
                            ? "border-yellow-400/30 bg-yellow-400/10 hover:bg-yellow-400/15 text-yellow-100"
                            : "border-white/10 bg-white/5 text-white/40 cursor-not-allowed",
                        ].join(" ")}
                      >
                        Next page →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-4 space-y-4 ">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-black">Quick Jump</div>
              <p className="mt-1 text-xs text-black/70">
                Products loaded: {products.length}
              </p>

              <div className="mt-4 py-5 space-y-3 max-h-[52vh] overflow-auto pr-1 bg-[#000000] rounded-2xl border border-white/10">
                <button
                  onClick={() => {
                    setDirection(0 > pageIndex ? 1 : -1);
                    setPageIndex(0);
                  }}
                  className={[
                    "w-full text-left rounded-xl px-3 py-2 border transition",
                    pageIndex === 0
                      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-100"
                      : "border-white/10 bg-black/20 hover:bg-white/5 text-white/80",
                  ].join(" ")}
                >
                  Cover
                </button>

                {categories.map((c, idx) => {
                  const page = idx + 1;
                  const active = pageIndex === page;
                  const count = (productsByCategory.get(c.id) ?? []).length;

                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setDirection(page > pageIndex ? 1 : -1);
                        setPageIndex(page);
                      }}
                      className={[
                        "w-full text-left rounded-xl px-3 py-2 border transition",
                        active
                          ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-100"
                          : "border-white/10 bg-black/20 hover:bg-white/5 text-white/80",
                      ].join(" ")}
                    >
                      {c.name}
                      <span className="ml-2 text-xs text-white/50">({count})</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    const last = pages.length - 1;
                    setDirection(last > pageIndex ? 1 : -1);
                    setPageIndex(last);
                  }}
                  className={[
                    "w-full text-left rounded-xl px-3 py-2 border transition",
                    pageIndex === pages.length - 1
                      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-100"
                      : "border-white/10 bg-black/20 hover:bg-white/5 text-white/80",
                  ].join(" ")}
                >
                  Last page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------- Pages ---------------------- */

function CoverPage() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
      <div
        className="h-[56vh] md:h-[60vh] w-full"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="inline-flex w-fit rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs text-yellow-100">
          Halal • Authentic Bengali Cuisine
        </div>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
          Dawat Menu Book
        </h2>
        <p className="mt-2 text-white/80 max-w-xl">
          Tap <span className="text-yellow-100">Next page</span> to flip through
          categories.
        </p>
        <p className="mt-3 text-sm text-white/70">
          Piazza dei Mirti 19, Rome, Italy, 00172
        </p>
      </div>
    </div>
  );
}

function CategoryPage({
  category,
  items,
  onItemClick,
}: {
  category: Category;
  items: Product[];
  onItemClick?: (item: Product) => void;
}) {
  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            Category
          </div>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight">
            {safeText(category?.name, "Category")}
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Freshly prepared • Balanced spice • Authentic taste
          </p>
        </div>

        {category?.image ? (
          <div className="hidden md:block">
            <img
              src={category.image}
              alt={safeText(category.name)}
              className="h-20 w-20 rounded-2xl object-cover border border-white/10 bg-black/20"
            />
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items?.length ? (
          items.map((p) => (
            <MenuCard key={p.id} item={p} onClick={() => onItemClick?.(p)} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            No items found for this category yet.
          </div>
        )}
      </div>
    </div>
  );
}

function MenuCard({
  item,
  onClick,
}: {
  item: Product;
  onClick: () => void;
}) {
  const price =
    item.price === null || item.price === undefined
      ? null
      : typeof item.price === "number"
      ? item.price.toFixed(2)
      : safeText(item.price);

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
    >
      <div className="p-4 flex gap-4">
        <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={safeText(item.name)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-[10px] text-white/40">
              No Image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-white truncate">
                {safeText(item.name)}
              </div>
              {item.description && item.description !== "." ? (
                <div className="mt-1 text-xs text-white/70 line-clamp-2">
                  {safeText(item.description)}
                </div>
              ) : (
                <div className="mt-1 text-xs text-white/50">..</div>
              )}
            </div>

            {price ? (
              <div className="text-sm font-semibold text-yellow-100 whitespace-nowrap">
                €{price}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

/* ---------------------- Modal ---------------------- */

function MenuItemModal({
  item,
  onClose,
}: {
  item: Product;
  onClose: () => void;
}) {
  const [isImageOpen, setIsImageOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isImageOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsImageOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isImageOpen]);

  const price =
    item?.price === null || item?.price === undefined
      ? null
      : typeof item.price === "number"
      ? item.price.toFixed(2)
      : safeText(item.price);

  const hasImage = Boolean(item?.image);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      variants={modalVariants}
      initial="overlayOut"
      animate="overlayIn"
      exit="overlayOut"
      transition={{ duration: 0.18 }}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <motion.div
        variants={modalVariants}
        initial="modalOut"
        animate="modalIn"
        exit="modalOut"
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f0f14] text-white shadow-2xl overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition p-2"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5 md:p-6">
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
              {hasImage ? (
                <button
                  type="button"
                  onClick={() => setIsImageOpen(true)}
                  className="h-full w-full focus:outline-none"
                  aria-label="Open image full screen"
                >
                  <img
                    src={item.image as string}
                    alt={safeText(item.name)}
                    className="h-full w-full object-cover hover:opacity-90 transition"
                  />
                </button>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-white/40">
                  No Image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-xl font-semibold">{safeText(item?.name)}</div>
              {price ? (
                <div className="mt-1 text-yellow-100 font-semibold">€{price}</div>
              ) : null}
              <div className="mt-2 text-sm text-white/70">
                {item?.description && item.description !== "."
                  ? safeText(item.description)
                  : ""}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isImageOpen && hasImage && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/90"
              onClick={() => setIsImageOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                onClick={() => setIsImageOpen(false)}
                aria-label="Close full screen image"
                className="absolute -top-3 -right-3 md:top-2 md:right-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition p-2 text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>

              <img
                src={item.image as string}
                alt={safeText(item.name)}
                className="w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LastPage() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
      <div
        className="h-[56vh] md:h-[60vh] w-full"
        style={{
          backgroundImage: `url(${lastImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="inline-flex w-fit rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs text-yellow-100">
          Thank you
        </div>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
          See you at Dawat!
        </h2>
        <p className="mt-2 text-white/80 max-w-xl">
          We hope you enjoyed browsing our menu. Ask our team for recommendations—especially if it’s your first time.
        </p>
        <div className="mt-4 text-sm text-white/70">
          <div>📍 Piazza dei Mirti 19, Rome, Italy, 00172</div>
          <div className="mt-1">🍛 Authentic Bengali Cuisine • Halal</div>
        </div>
      </div>
    </div>
  );
}
