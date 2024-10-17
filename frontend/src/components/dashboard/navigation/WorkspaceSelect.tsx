// components/WorkspaceSelect.tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkspaceData } from "@/types";

interface WorkspaceSelectProps {
  workspaces: WorkspaceData[];
  selectedWorkspace: string | undefined;
  onWorkspaceChange: (value: string) => void;
}

const WorkspaceSelect: React.FC<WorkspaceSelectProps> = ({
  workspaces,
  selectedWorkspace,
  onWorkspaceChange,
}) => {
  return (
    <Select value={selectedWorkspace} onValueChange={onWorkspaceChange}>
      <SelectTrigger className="w-[200px] bg-white shadow-md">
        <SelectValue placeholder="Select a Workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {workspaces.map((workspace) => (
            <SelectItem key={workspace._id} value={workspace.name}>
              {workspace.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WorkspaceSelect;
