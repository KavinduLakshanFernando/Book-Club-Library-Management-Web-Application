export interface Lending {
  [x: string]: ReactNode;
  bookName: ReactNode;
  _id?: string;
  bookId: string;
  readerId: string;
  lendDate?: string;
  dueDate: string;
  returnDate?: string | null;
  status: "borrowed" | "returned" | "late";
}


