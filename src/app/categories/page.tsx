// src/app/categories/page.tsx
import CategoryList from "@/components/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">All Categories</h1>
      <CategoryList displayType="grid" />
    </div>
  );
}