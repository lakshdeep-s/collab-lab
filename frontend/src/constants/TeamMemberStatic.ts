import { TeamMember } from "@/types";

export const memberList: TeamMember[] = [
    {
        userId: "1",
        username: "Lakshdeep Singh",
        email: "lakshdeep.code@gmail.com",
        lastLogin: new Date(Date.now()),
        role: "admin",
        totalTasks: 12,
        pendingTasks: 4,
        completedTasks: 5,
        overdueTasks: 3,
    }, 
    {
        userId: "2",
        username: "John Doe",
        email: "johndoe@gmail.com",
        lastLogin: new Date(Date.now()),
        role: "member",
        totalTasks: 12,
        pendingTasks: 4,
        completedTasks: 5,
        overdueTasks: 3,
    },
    {
        userId: "3",
        username: "Jane Doe",
        email: "jane@gmail.com",
        lastLogin: new Date(Date.now()),
        role: "member",
        totalTasks: 12,
        pendingTasks: 4,
        completedTasks: 5,
        overdueTasks: 3,
    },
    {
        userId: "4",
        username: "William Dafoe",
        email: "dafoe@gmail.com",
        lastLogin: new Date(Date.now()),
        role: "admin",
        totalTasks: 12,
        pendingTasks: 4,
        completedTasks: 5,
        overdueTasks: 3,
    }
]