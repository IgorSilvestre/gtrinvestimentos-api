import { Types } from 'mongoose'

export interface IAssetDocument {
    name: string;
    tags: Types.ObjectId[];
    priceInReais?: number;
    isForSale?: boolean;
    anualRevenueInReais?: number;
    marginEBITDA?: number;
    cashOrEquivalentInReais?: number;
    privateDebtInReais?: number;
    laborDebtInReais?: number;
    publicDebtInReais?: number;
    partnershipPercentage?: number;
    downPaymentInReais?: number;
    isAtypicalContract?: boolean;
    description?: string;
    capRatePercentage?: number;
    tenant?: string;
    monthlyRentInReais?: number;
    kmFromSP?: number;
    landAreaM2?: number;
    constructedAreaM2?: number;
    vgvInReais?: number;
    valuationPriceInReais?: number;
    docLink?: string;
    energyOffTaker?: string;
    energyInstalledCapacityInMWp? : number;
    projectAproveDate?: string;
    constructionStartDate?: string;
    ppaInReaisToMWh?: number
    capexInReais?: number
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    addressNumber?: string;
    addressComplement?: string;
    partner?: Types.ObjectId;
    zoning?: Types.ObjectId[];
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
