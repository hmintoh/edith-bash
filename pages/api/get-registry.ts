import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../utils/notion";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dataSourceId = process.env.NOTION_DATASOURCE_ID;

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
    });
    const data = response.results;

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
