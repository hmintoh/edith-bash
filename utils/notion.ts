import { Client } from "@notionhq/client";

export const notion: any = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});
