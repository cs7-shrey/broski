require('dotenv').config();
const { Client } = require('@notionhq/client');
// 
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const i = 1;
// 
// (async () => {
//   const blockId = process.env.PAGE_ID;
//   const response = await notion.blocks.children.list({
//     block_id: blockId,
//     page_size: 50,
//   });
//   console.log(response.results[i].paragraph.rich_text[0].plain_text);
// })();

async function pageContentArray() {
    const blockId = process.env.PAGE_ID;
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
        });
    return response.results;
}
// pageContentArray();

module.exports = { pageContentArray };