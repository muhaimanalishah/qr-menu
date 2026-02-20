"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addCategory(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;

    const { error } = await supabase
        .from("categories")
        .insert([{ name }]);

    if (!error) {
        revalidatePath("/admin");
    }
}

export async function deleteCategory(id: string) {
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (!error) {
        revalidatePath("/admin");
    }
}

export async function addMenuItem(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category_id = formData.get("category_id") as string;

    const { error } = await supabase
        .from("items")
        .insert([{ name, price, category_id }]);
    if (!error) {
        revalidatePath("/admin");
    }
}

export async function deleteMenuItem(id: string) {
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", id);

    if (!error) {
        revalidatePath("/admin");
    }
}

export async function toggleMenuItemAvailability(id: string, currentStatus: boolean) {
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("items")
        .update({ available: !currentStatus })
        .eq("id", id);

    if (!error) {
        revalidatePath("/admin");
    }
}