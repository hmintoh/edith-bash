import { Client } from "@notionhq/client";

const notion: any = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

export const getRegistry = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const res = await notion.databases.query({ database_id: databaseId });
  return res.results;
};
