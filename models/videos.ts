import mongoose from "mongoose";

interface VideosAttrs {
  introductoryVideo: string;
  goalsVideo: string;
  staffOnDemand: string;
  communityAndCrowd: string;
  algorithms: string;
  leveragedAssets: string;
  Engagement: string;
  interface: string;
  dashboard: string;
  experimentation: string;
  socialPlatforms: string;
  ecoSystems: string;
  autonomy: string;
  infoIsPower: string;
  OTCR: string;
  valueDestruction: string;
  customerJourney: string;
  digitalPlatforms: string;
  buildingCapacity: string;
  products: string;
  marketPotential: string;
  redOcean: string;
  voiceOfCustomers: string;
  blueOcean: string;
  nonCustomers: string;
  stepUpStepDownModel: string;
  roadMap: string;
}
interface VideosDocument extends mongoose.Document, VideosAttrs { }

interface VideosModel extends mongoose.Model<VideosDocument> {
  build(attrs: VideosAttrs): VideosDocument;
}

export interface IVideos extends VideosAttrs {
  id: string;
}

const videosSchema = new mongoose.Schema(
  {
    introductoryVideo: {
      type: String,
      required: true,
    },
    goalsVideo: {
      type: String,
      required: true,
    },
    staffOnDemand: {
      type: String,
      required: true,
    },
    communityAndCrowd: {
      type: String,
      required: true,
    },
    algorithms: {
      type: String,
      required: true,
    },
    leveragedAssets: {
      type: String,
      required: true,
    },
    Engagement: {
      type: String,
      required: true,
    },
    interface: {
      type: String,
      required: true,
    },
    dashboard: {
      type: String,
      required: true,
    },
    experimentation: {
      type: String,
      required: true,
    },
    socialPlatforms: {
      type: String,
      required: true,
    },
    ecoSystems: {
      type: String,
      required: true,
    },
    autonomy: {
      type: String,
      required: true,
    },
    infoIsPower: {
      type: String,
      required: true,
    },
    OTCR: {
      type: String,
      required: true,
    },
    valueDestruction: {
      type: String,
      required: true,
    },
    customerJourney: {
      type: String,
      required: true,
    },
    digitalPlatforms: {
      type: String,
      required: true,
    },
    buildingCapacity: {
      type: String,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    marketPotential: {
      type: String,
      required: true,
    },
    redOcean: {
      type: String,
      required: true,
    },
    voiceOfCustomers: {
      type: String,
      required: true,
    },
    blueOcean: {
      type: String,
      required: true,
    },
    nonCustomers: {
      type: String,
      required: true,
    },
    stepUpStepDownModel: {
      type: String,
      required: true,
    },
    roadMap: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
      },
    },
  }
);

videosSchema.statics.build = (attrs: VideosAttrs) => {
  return new Videos(attrs);
};

export const Videos =
  mongoose.models.Videos ||
  mongoose.model<VideosDocument, VideosModel>("Videos", videosSchema, "videos");
