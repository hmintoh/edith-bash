import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../utils/notion";

export const getRegistry = async () => {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({ database_id: databaseId });
    const data = response.results;
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
