import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategoryById } from '@/lib/data/categories.dal'; // Assumes this function exists in your DAL
import { redirect } from 'next/navigation';
import { CategoryForm } from '@/components/admin/categories/category-form';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: category } = await getCategoryById(id);

  if (!category) {
    redirect('/admin/categories');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Category</h1>
        <p className="text-sm text-muted-foreground">
          Update the details for {category.name}.
        </p>
      </div>
      <CategoryForm restaurantId={restaurant!.id} initialData={category} />
    </div>
  );
}