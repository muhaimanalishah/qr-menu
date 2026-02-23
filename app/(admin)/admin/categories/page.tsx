import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function CategoriesPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: categories } = await getCategories(restaurant!.id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Organize your menu items into different categories.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">Create New Category</Link>
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between p-5 border rounded-xl bg-card text-card-foreground shadow-sm"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-semibold text-lg">{category.name}</h2>
                  {category.image_url && (
                    <Badge variant="secondary" className="text-xs">
                      Has Image
                    </Badge>
                  )}
                </div>
                {category.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No description
                  </p>
                )}
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/admin/categories/${category.id}/edit`}>
                  Edit Category
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-xl bg-muted/20">
          <h3 className="text-lg font-medium">No categories found</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Get started by creating your first category.
          </p>
          <Button asChild>
            <Link href="/admin/categories/new">Create New Category</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
