import { Optional } from "sequelize";

export interface BookAttributes {
    book_id?: number;
    subject_id: number;
    name: string;
    version?: number;
    price?: number;
    description?: string;
    pdf_link?: string;
}
export type BookCreationAttributes = Optional<BookAttributes, "book_id">;
