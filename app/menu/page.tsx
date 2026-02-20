import { createClient } from "@/lib/supabase/server";

export default async function MenuPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("categories")
        .select(`
            id, 
            name, 
            items (
                id, 
                name, 
                description, 
                image_url, 
                price, 
                available
            )
        `)
        .filter("items.available", "eq", true);

    if (error) {
        console.error("Error fetching menu:", error);
        return <div>Error loading menu.</div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-8">Menu</h1>
            {data?.map((category) => (
                <section key={category.id} className="mb-10">
                    <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                        {category.name}
                    </h2>
                    <div className="grid gap-4">
                        {category.items.map((item) => (
                            <div key={item.id} className="flex justify-between border p-4 rounded-lg">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                                <span className="font-bold">{item.price} PKR</span>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
}