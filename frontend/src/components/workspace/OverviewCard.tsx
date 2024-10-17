import { FC } from "react";

interface IOverviewCardProps {
    statName: string;
    statValue: string | number
}

const OverviewCard: FC<IOverviewCardProps> = ({statName, statValue}) => {
  return (
    <div className="flex flex-col pl-4 pb-4 pt-8 pr-8 rounded-md shadow-md border border-muted bg-white">
        <span className="font-semibold tracking-tighter text-2xl">{statValue}</span>
        <span className="tracking-tight text-slate-500 font-medium">{statName}</span>
    </div>
  )
}

export default OverviewCard