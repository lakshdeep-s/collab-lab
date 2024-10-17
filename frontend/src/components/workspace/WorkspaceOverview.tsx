import OverviewCard from "./OverviewCard"

const WorkspaceOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <OverviewCard
            statName="Total Tasks"
            statValue={13}
        />
        <OverviewCard
            statName="Tasks Due"
            statValue={8}
        />
        <OverviewCard
            statName="Tasks Completed"
            statValue={4}
        />
        <OverviewCard
            statName="Overdue tasks"
            statValue={1}
        />
    </div>
  )
}

export default WorkspaceOverview