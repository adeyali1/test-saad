import { takeawayTypeEnums } from "./enums";

export interface NavbarNode {
   title: string;
   step: string;
   url: string;
   iconPath: string;
   selectedIconPath: string;
}

export type ConfirmDialog = {
   isShown: boolean,
   title: string,
   message: string,
   actionBtnText: string,
   cancelBtnText: string,
   actionCallback: () => void,
   cancelCallback: () => void,
   isDangerAction: boolean,
   loadingMessage: string,
   isLoading: boolean,
}

export interface IModal {
   className: string;
   isShown: boolean;
   closeCallback: () => void
}

export interface IProduct {
   uuid: string;
   name: string;
   futures?: IFuture[];
   competitors?: ICompetitor[];
   factors?: IFactor[];
   ideaFactors?: IIdeaFactor[];
}

export interface IFuture {
   year: number;
   level: number;
   sales: number;
}

export interface IIdea {
   uuid: string;
   name: string;
   startMonth: string;
   durationInMonths: number;
   ownerName: string;
}

export interface ICompetitor {
   uuid: string;
   name: string;
   marketShare: number;
   isUntapped: boolean;
}

export interface IFactorCompetitor {
   uuid: string;
   value: string | number;
}

export interface IFactor {
   name: string;
   competitors: IFactorCompetitor[];
}

export interface IIdeaFactor {
   name: string;
   competitors: IFactorCompetitor[];
}

export interface ITakeaway {
   type: takeawayTypeEnums,
   notes: string[];
}