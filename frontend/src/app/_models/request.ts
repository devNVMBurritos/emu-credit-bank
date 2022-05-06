import { User } from "./user";

export class ContactRequest {
  constructor(
    public requested: User,
    public requester: User,
    public confirmed: boolean
  ) {}
}