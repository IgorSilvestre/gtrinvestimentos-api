import { Types } from 'mongoose'
import { number } from 'zod';

export interface IAssetDocument {
  name: string;
  tags: Types.ObjectId[];
  priceInReais?: number; 
  partnershipPercentage?: number;
  downPaymentInReais?: number;
  description?: string;
  capRatePercentage?: number;
  kmFromSP?: number;
  totalAreaM2?: number;
  constructedAreaM2?: number;
  vgvInReais?: number;
  docLink?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  partner?: Types.ObjectId;
  zoning?: Types.ObjectId;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IAssetPagination {
    data: IAssetDocument[];
    numberOfDocuments: number | null;
    nextPage: number | null;
    previousPage: number | null;
    totalPages: number | null;
  }
