export type ItemStatus =
  | "UNVERIFIED"
  | "VERIFIED"
  | "AVAILABLE"
  | "CLAIMED"
  | "REJECTED";


export type AdminItem = {
  id: string;
  type: "FOUND" | "LOST";
  status: "UNVERIFIED" | "VERIFIED";
  category: string;
  campusZone: string;
  foundAt: {
    time: string;
    valid: boolean;
  };
  reportedBy: string;
  createdAt: string;
};



export type AdminItemDTO = {
  ID: string;
  Type: string;
  Status: string;
  Category: string;
  CampusZone: string;
  FoundAt: {
    Time: string;
    Valid: boolean;
  };
  ReportedBy: string;
  CreatedAt: string;
};
