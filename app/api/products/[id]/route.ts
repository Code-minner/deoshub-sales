import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isProductCategory } from "@/lib/categories";
import { deleteImage } from "@/lib/cloudinary";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/lib/products";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const product = await getProduct(id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const data: Parameters<typeof updateProduct>[1] = {};

    if (body.name !== undefined) data.name = String(body.name).trim();
    if (body.subname !== undefined) data.subname = String(body.subname).trim();
    if (body.description !== undefined) {
      data.description = String(body.description).trim();
    }
    if (body.price !== undefined) data.price = String(body.price).trim();
    if (body.compareAtPrice !== undefined) {
      const raw = String(body.compareAtPrice).trim();
      data.compareAtPrice = raw || null;
    }
    if (body.category !== undefined) {
      const categoryRaw = String(body.category).trim();
      data.category = isProductCategory(categoryRaw) ? categoryRaw : "Perfume";
    }
    if (body.stock !== undefined) data.stock = Number(body.stock);
    if (body.imageUrl !== undefined) data.imageUrl = String(body.imageUrl);
    if (body.imagePublicId !== undefined) {
      data.imagePublicId = String(body.imagePublicId);
    }

    const product = await updateProduct(id, data);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await getProduct(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteImage(existing.imagePublicId);
    await deleteProduct(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
