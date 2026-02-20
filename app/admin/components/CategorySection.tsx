"use client"

import { Category } from "@/lib/types/categories.types";
import { addCategory, deleteCategory } from "../actions";

export default function CategorySection({ categories }: { categories: Category[] }) {
    return (
        <section className="p-6 border rounded-xl bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>

            {/* CREATE: The form automatically sends data to the server action */}
            <form action={addCategory} className="flex gap-2 mb-6">
                <input 
                    name="name" 
                    placeholder="New category name..." 
                    className="border p-2 rounded flex-1"
                    required
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    Add
                </button>
            </form>

            {/* READ & DELETE */}
            <div className="space-y-2">
                {categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>{cat.name}</span>
                        <form action={() => deleteCategory(cat.id)}>
                            <button 
                                type="submit"
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </section>
    )
};
