import mongoose from "mongoose";
import { BlobTypeEnum } from "./enums";

interface BlobAttrs {
    fileName: string;
    blobId: string;
    courseId: string;
    categoryId: string;
    type: BlobTypeEnum;
}

export interface IBlob extends BlobAttrs {
    id: string;
}

interface BlobDocument extends mongoose.Document, BlobAttrs { }

interface BlobModel extends mongoose.Model<BlobDocument> {
    build(attrs: BlobAttrs): BlobDocument;
}

const blobSchema = new mongoose.Schema(
    {
        fileName: String,
        blobId: String,
        courseId: String,
        categoryId: String,
        type: String
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

blobSchema.statics.build = (attrs: BlobAttrs) => {
    return new Blob(attrs);
};

export const Blob =
    mongoose.models.Blob ||
    mongoose.model<BlobDocument, BlobModel>("Blob", blobSchema);
