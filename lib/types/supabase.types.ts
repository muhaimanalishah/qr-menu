export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          restaurant_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          available: boolean | null
          base_price: number
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          position: number
          sold_out: boolean | null
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          position?: number
          sold_out?: boolean | null
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          position?: number
          sold_out?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          category_id: string | null
          id: string
          menu_id: string | null
          position: number
        }
        Insert: {
          category_id?: string | null
          id?: string
          menu_id?: string | null
          position?: number
        }
        Update: {
          category_id?: string | null
          id?: string
          menu_id?: string | null
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_categories_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string | null
          design_settings: Json | null
          id: string
          is_active: boolean | null
          name: string
          restaurant_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          design_settings?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          restaurant_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          design_settings?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          restaurant_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      modifier_groups: {
        Row: {
          created_at: string | null
          id: string
          item_id: string | null
          max_selections: number
          min_selections: number
          name: string
          position: number
          selection_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          max_selections?: number
          min_selections?: number
          name: string
          position?: number
          selection_type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          max_selections?: number
          min_selections?: number
          name?: string
          position?: number
          selection_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modifier_groups_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      modifier_options: {
        Row: {
          created_at: string | null
          id: string
          modifier_group_id: string | null
          name: string
          position: number
          price_modifier: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          modifier_group_id?: string | null
          name: string
          position?: number
          price_modifier?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          modifier_group_id?: string | null
          name?: string
          position?: number
          price_modifier?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modifier_options_modifier_group_id_fkey"
            columns: ["modifier_group_id"]
            isOneToOne: false
            referencedRelation: "modifier_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_codes: {
        Row: {
          created_at: string | null
          id: string
          menu_id: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_id?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_id?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: true
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          created_at: string | null
          cuisine_type: string | null
          currency: string
          description: string | null
          design_settings: Json | null
          id: string
          language_direction: string
          logo_url: string | null
          name: string
          owner_id: string | null
          phone: string | null
          primary_color: string | null
          slug: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          currency?: string
          description?: string | null
          design_settings?: Json | null
          id?: string
          language_direction?: string
          logo_url?: string | null
          name: string
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          slug: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          currency?: string
          description?: string | null
          design_settings?: Json | null
          id?: string
          language_direction?: string
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          slug?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          restaurant_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
