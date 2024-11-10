import { FC } from "react";
import { WorkspaceData } from "@/types";

interface IViewWorkspaceDetailsProps {
  workspace: WorkspaceData | undefined;
}

const ViewWorkspaceDetails: FC<IViewWorkspaceDetailsProps> = ({ workspace }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Workspace Name</label>
        <div className="mt-1 px-4 py-2 bg-gray-100 rounded-md text-muted-foreground">
          {workspace?.name || "No workspace name available"}
        </div>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <div className="mt-1 px-4 py-2 bg-gray-100 rounded-md text-muted-foreground">
          {workspace?.description || "No description available"}
        </div>
      </div>
    </div>
  );
};

export default ViewWorkspaceDetails;
