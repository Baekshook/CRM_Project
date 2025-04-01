import { Request } from "../../requests/entities/request.entity";
import { Match } from "../../matches/entities/match.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { Contract } from "../../contracts/entities/contract.entity";
import { Review } from "../../reviews/entities/review.entity";
export declare class Singer {
    id: string;
    name: string;
    agency: string;
    genre: string;
    email: string;
    phone: string;
    profileImage: string;
    profileImageId: string;
    statusMessage: string;
    address: string;
    grade: number;
    rating: number;
    status: "active" | "inactive";
    contractCount: number;
    lastRequestDate: string;
    reviewCount: number;
    registrationDate: string;
    role: string;
    genres: string[];
    experience: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    requests: Request[];
    matches: Match[];
    schedules: Schedule[];
    contracts: Contract[];
    reviews: Review[];
}
