export interface ObituaryEntry {
  _id: string;
  title: string;
  name: string;
  date: string;
  address: string;
  imageUrl: string;
  condolences: number;
  donations?: number;
  isDonationReceivable?: boolean;
  accountDetails?: {
    bankName: string;
    branchName: string;
    accountNumber: string | null;
    accountHolderName: string;
  } | null;
}

export interface NewsItem {
  id: string;
  backgroundImage: string;
  timestamp: string;
  title: string;
  description: string;
  date: string;
}
