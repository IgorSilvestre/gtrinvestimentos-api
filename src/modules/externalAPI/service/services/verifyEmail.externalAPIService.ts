import axios from "axios";
import { externalAPIEndpoints } from "../../../../shared/externalAPIEndpoints";

export interface IVerifyEmailResponse {
    score: number;
}

export async function verifyEmail(email: string): Promise<IVerifyEmailResponse | Error> {
    const options = externalAPIEndpoints.verifyEmail
    options.url += email
    try {
        const response = await axios.request(options);
        return await response.data;
    } catch(error) {
        console.error('Error verifying email:', error);
        throw new Error(`${error}`)
    }
}

