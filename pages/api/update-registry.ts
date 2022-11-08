import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../utils/notion";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, isChoped } = req.body;

  const data = await notion.pages.update({
    page_id: id,
    properties: {
      choped: {
        checkbox: isChoped,
      },
    },
  });

  res.send(data);
};

export default handler;
