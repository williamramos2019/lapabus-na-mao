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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bus_alerts: {
        Row: {
          alert_type: string
          created_at: string
          ends_at: string | null
          id: string
          is_active: boolean | null
          line_id: string | null
          message: string
          severity: string | null
          starts_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          line_id?: string | null
          message: string
          severity?: string | null
          starts_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          line_id?: string | null
          message?: string
          severity?: string | null
          starts_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bus_alerts_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "bus_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      bus_lines: {
        Row: {
          company: string | null
          created_at: string
          destination: string | null
          id: string
          line_name: string
          line_number: string
          origin: string | null
          route_type: string | null
          scraped_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          line_name: string
          line_number: string
          origin?: string | null
          route_type?: string | null
          scraped_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          line_name?: string
          line_number?: string
          origin?: string | null
          route_type?: string | null
          scraped_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      bus_positions: {
        Row: {
          created_at: string
          delay_minutes: number | null
          estimated_arrival_time: string | null
          heading: number | null
          id: string
          last_updated: string
          latitude: number
          line_id: string
          longitude: number
          next_stop_id: string | null
          occupancy_level: string | null
          speed_kmh: number | null
          status: string | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          delay_minutes?: number | null
          estimated_arrival_time?: string | null
          heading?: number | null
          id?: string
          last_updated?: string
          latitude: number
          line_id: string
          longitude: number
          next_stop_id?: string | null
          occupancy_level?: string | null
          speed_kmh?: number | null
          status?: string | null
          vehicle_id: string
        }
        Update: {
          created_at?: string
          delay_minutes?: number | null
          estimated_arrival_time?: string | null
          heading?: number | null
          id?: string
          last_updated?: string
          latitude?: number
          line_id?: string
          longitude?: number
          next_stop_id?: string | null
          occupancy_level?: string | null
          speed_kmh?: number | null
          status?: string | null
          vehicle_id?: string
        }
        Relationships: []
      }
      bus_schedules: {
        Row: {
          arrival_time: string | null
          created_at: string
          day_type: string
          departure_time: string
          direction: string
          id: string
          line_id: string
          stop_name: string | null
          stop_order: number | null
          updated_at: string
        }
        Insert: {
          arrival_time?: string | null
          created_at?: string
          day_type: string
          departure_time: string
          direction: string
          id?: string
          line_id: string
          stop_name?: string | null
          stop_order?: number | null
          updated_at?: string
        }
        Update: {
          arrival_time?: string | null
          created_at?: string
          day_type?: string
          departure_time?: string
          direction?: string
          id?: string
          line_id?: string
          stop_name?: string | null
          stop_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bus_schedules_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "bus_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          started_at: string
          status: string
          total_lines_found: number | null
          total_schedules_found: number | null
          url: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          started_at?: string
          status: string
          total_lines_found?: number | null
          total_schedules_found?: number | null
          url: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          started_at?: string
          status?: string
          total_lines_found?: number | null
          total_schedules_found?: number | null
          url?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          advance_minutes: number | null
          created_at: string
          id: string
          is_active: boolean | null
          line_id: string | null
          notification_type: string
          stop_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          advance_minutes?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          line_id?: string | null
          notification_type: string
          stop_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          advance_minutes?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          line_id?: string | null
          notification_type?: string
          stop_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "bus_lines"
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
