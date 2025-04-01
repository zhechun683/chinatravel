export interface VacationItemTypes {
  id: string;
  country: string;
  unit: string;
  title: string;
  price: number;
  city: string;
  rating: number;
  description: string | null;
  image: string;
  sum_booking?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface BookingDataTypes {
  id: string;
  invoice?: number;
  amount: number;
  total?: number;
  item_id: string;
  member_id?: string;
  payment_id?: string;
}

export interface MemberTypes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
}

export interface PaymentTypes {
  id: string;
  created_at: string;
  card_number: number;
  card_holder_name: string;
  cvc: number;
}
