export type ItemStatus =
  | "UNVERIFIED"
  | "VERIFIED"
  | "AVAILABLE"
  | "CLAIMED"
  | "REJECTED";


export type AdminItem = {
  id: string;
  type: "FOUND" | "LOST";
  status: ItemStatus; // ✅ FIX
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
  Type: "FOUND" | "LOST";
  Status: ItemStatus;
  Category: string;
  CampusZone: string;
  FoundAt: {
    Time: string;
    Valid: boolean;
  };
  ReportedBy: string;
  CreatedAt: string;
};

