export type GoRequestStatus = "draft" | "sent";

export type GoRequest = {
  id: string;
  status: GoRequestStatus;
};
