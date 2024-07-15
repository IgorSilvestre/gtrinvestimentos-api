import { scrapeWebsiteForContacts } from "br-lib";

export interface IContacts {
    emails: string[];
    phoneNumbers: string[];
}

export async function scrapeContactsFromWebsite (domain: string): Promise<IContacts> {
    return await scrapeWebsiteForContacts(domain)
}

