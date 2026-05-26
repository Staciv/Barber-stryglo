export type UserRole = "client" | "barber" | "admin";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type BookingType = "salon" | "go";
export type GoRequestStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "proposed_new_time"
  | "cancelled";
export type GoProposalStatus = "pending" | "accepted" | "declined";

export type User = {
  id: string;
  phone: string | null;
  name: string | null;
  role: UserRole;
  created_at: string;
};

export type Barber = {
  id: string;
  user_id: string | null;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
};

export type BarberService = {
  id: string;
  barber_id: string;
  service_id: string;
};

export type BarberAvailability = {
  id: string;
  barber_id: string;
  weekday: number;
  start_time: string;
  end_time: string;
  is_go_available: boolean;
};

export type Booking = {
  id: string;
  user_id: string;
  barber_id: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  type: BookingType;
  created_at: string;
};

export type CreateBookingInput = {
  user_id: string;
  barber_id: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  type: BookingType;
  status?: BookingStatus;
};

export type GoRequest = {
  id: string;
  user_id: string;
  barber_id: string | null;
  service_id: string;
  address: string;
  proposed_date: string;
  proposed_time: string;
  status: GoRequestStatus;
  barber_message: string | null;
  created_at: string;
};

export type GoProposal = {
  id: string;
  go_request_id: string;
  barber_id: string;
  proposed_date: string;
  proposed_time: string;
  status: GoProposalStatus;
  created_at: string;
};

export type HaircutRecommendation = {
  id: string;
  title: string;
  image_url: string | null;
  tags: string[];
  description: string | null;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at" | "role"> & {
          id?: string;
          role?: UserRole;
          created_at?: string;
        };
        Update: Partial<Omit<User, "id" | "created_at">>;
        Relationships: [];
      };
      barbers: {
        Row: Barber;
        Insert: Omit<Barber, "id" | "created_at" | "is_active"> & {
          id?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Omit<Barber, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "barbers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "is_active"> & {
          id?: string;
          is_active?: boolean;
        };
        Update: Partial<Omit<Service, "id">>;
        Relationships: [];
      };
      barber_services: {
        Row: BarberService;
        Insert: {
          id?: string;
          barber_id: string;
          service_id: string;
        };
        Update: Partial<{
          barber_id: string;
          service_id: string;
        }>;
        Relationships: [
          {
            foreignKeyName: "barber_services_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "barber_services_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      barber_availability: {
        Row: BarberAvailability;
        Insert: Omit<BarberAvailability, "id" | "is_go_available"> & {
          id?: string;
          is_go_available?: boolean;
        };
        Update: Partial<Omit<BarberAvailability, "id">>;
        Relationships: [
          {
            foreignKeyName: "barber_availability_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, "id" | "created_at" | "status"> & {
          id?: string;
          status?: BookingStatus;
          created_at?: string;
        };
        Update: Partial<Omit<Booking, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      go_requests: {
        Row: GoRequest;
        Insert: Omit<GoRequest, "id" | "created_at" | "status"> & {
          id?: string;
          status?: GoRequestStatus;
          created_at?: string;
        };
        Update: Partial<Omit<GoRequest, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "go_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "go_requests_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "go_requests_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      go_proposals: {
        Row: GoProposal;
        Insert: Omit<GoProposal, "id" | "created_at" | "status"> & {
          id?: string;
          status?: GoProposalStatus;
          created_at?: string;
        };
        Update: Partial<Omit<GoProposal, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "go_proposals_go_request_id_fkey";
            columns: ["go_request_id"];
            isOneToOne: false;
            referencedRelation: "go_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "go_proposals_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
        ];
      };
      haircut_recommendations: {
        Row: HaircutRecommendation;
        Insert: Omit<HaircutRecommendation, "id" | "tags"> & {
          id?: string;
          tags?: string[];
        };
        Update: Partial<Omit<HaircutRecommendation, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
