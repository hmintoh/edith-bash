import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../utils/notion";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageID = process.env.NOTION_PAGE_ID;

  try {
    const response = await notion.blocks.children.list({
      block_id: pageID,
    });
    const data = response;

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
