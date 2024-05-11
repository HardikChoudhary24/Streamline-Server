import { prisma } from "../../clients/db";
import { CreateProjectPayload, GraphqlContext } from "../interfaces";

const queries = {
  getAllProjects:async (parent:any,{roomId}:{roomId:string},context:GraphqlContext)=>{
    if (!context.user?.id) throw new Error("User not authenticated");
    const allProjects = await prisma.project.findMany({where:{roomId}});
    return allProjects;
  },
  getVideoSignedUrl:async (parent:any,{videoType}:{videoType:string},context:GraphqlContext)=>{
    return "hardi";
  }
};

const mutations = {
  createProject:async (parent:any,{payload}:{payload:CreateProjectPayload},context:GraphqlContext)=>{
    if (!context.user?.id) throw new Error("User not authenticated");
    const project = await prisma.project.create({data:{...payload}});
    return project;
  }
};

export const resolvers = {queries,mutations}