export type AspectRatio = '3:2' | '4:6';

export type PaperStock = 'linen-350' | 'cotton-320' | 'deckle-400';

export type InkColor = 'navy' | 'bistre' | 'spruce' | 'violet';

export type HandwritingFont = 'caveat' | 'caveat-bold' | 'roboto-flex' | 'space-mono';

export interface PostageStamp {
  id: string;
  name: string;
  denomination: string;
  country: string;
  year: string;
  theme: string;
  primaryColor: string;
  accentColor: string;
  svgIcon: 'airmail' | 'flora' | 'mountain' | 'monument' | 'maritime' | 'celestial';
}

export interface RecipientAddress {
  fullName: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

export interface PostcardData {
  id: string;
  title: string;
  location: string;
  coordinates: string;
  dateCaptured: string;
  photoUrl: string;
  aspectRatio: AspectRatio;
  senderName: string;
  message: string;
  handwritingFont: HandwritingFont;
  inkColor: InkColor;
  stamp: PostageStamp;
  cancellationCity: string;
  cancellationDate: string;
  recipient: RecipientAddress;
  paperStock: PaperStock;
}

export interface DispatchedPostcard extends PostcardData {
  trackingNumber: string;
  dispatchedAt: string;
  estimatedDelivery: string;
  status: 'printing' | 'franked' | 'in_transit' | 'delivered';
}

export interface CuratedCardItem {
  id: string;
  title: string;
  collection: 'Alpine & Nordic' | 'Mediterranean' | 'East Asia' | 'Urban Heritage';
  location: string;
  coordinates: string;
  photoUrl: string;
  sampleMessage: string;
  sampleRecipient: RecipientAddress;
  stampTheme: string;
  dispatchesCount: number;
}
