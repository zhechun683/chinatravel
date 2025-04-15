export type StepItem = {
  title: string;
  description: string | null;
  content: React.ReactNode;
};

export type Steps = {
  bookingAndPayment: StepItem;
  completed: StepItem;
};

export type KeyofStep = "bookingAndPayment" | "completed";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardName: string;
  cvc: string;
};
