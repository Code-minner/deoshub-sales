import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isProductCategory } from "@/lib/categories";
import { createProduct, listProducts } from "@/lib/products";

export async function GET() {
  try {
    const items = await listProducts();
    return NextResponse.json({ products: items });
  } catch (error) {
    console.error("List products error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const subname = String(body.subname ?? "").trim();
    const description = String(body.description ?? "").trim();
    const price = String(body.price ?? "").trim();
    const compareAtRaw = String(body.compareAtPrice ?? "").trim();
    const imageUrl = String(body.imageUrl ?? "").trim();
    const imagePublicId = String(body.imagePublicId ?? "").trim();
    const categoryRaw = String(body.category ?? "EDP").trim();
    const category = isProductCategory(categoryRaw) ? categoryRaw : "EDP";
    const stock = Number(body.stock ?? 1);

    if (!name || !price || !imageUrl || !imagePublicId) {
      return NextResponse.json(
        { error: "Name, price, and image are required" },
        { status: 400 },
      );
    }

    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const compareAtPrice =
      compareAtRaw && !Number.isNaN(Number(compareAtRaw))
        ? compareAtRaw
        : null;

    if (
      compareAtPrice !== null &&
      Number(compareAtPrice) > 0 &&
      Number(compareAtPrice) <= Number(price)
    ) {
      return NextResponse.json(
        { error: "Slashed price must be higher than the selling price" },
        { status: 400 },
      );
    }

    const product = await createProduct({
      name,
      subname,
      description,
      price,
      compareAtPrice,
      imageUrl,
      imagePublicId,
      category,
      stock: Number.isFinite(stock) ? stock : 1,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
