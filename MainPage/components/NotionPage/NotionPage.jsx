import { useState, useEffect } from "react";
import { Client } from "@notionhq/client";
import { configDotenv } from "dotenv";
// configDotenv();

const auth = import.meta.env.VITE_NOTION_API_KEY ;
const blockId = import.meta.env.VITE_PAGE_ID;

const notion = new Client({ auth: auth });

export default function NotionPage() {
    const [notionContent, setNotionContent] = useState([]);
    useEffect(() => {
        const fetchNotionContent = async () => {
            const results = await window.versions.readNotion();
            const contentArray = results.map((result) => {
                switch (result.type) {
                    case 'paragraph':
                        if (result.paragraph.rich_text.length === 0) {
                                return (<br/>)
                        }
                        return (
                            <p>{result?.paragraph?.rich_text[0]?.plain_text}</p>
                        )
                        break;
                    case 'heading_1':
                        return (
                            <h1>{result?.heading_1?.rich_text[0]?.plain_text}</h1>
                        )
                        break;
                    case 'heading_2':
                        return (
                            <h2>{result?.heading_2?.rich_text[0]?.plain_text}</h2>
                        )
                        break;
                    case 'heading_3':
                        return (
                            <h3>{result?.heading_3?.rich_text[0]?.plain_text}</h3>
                        )
                        break;
                    case 'bulleted_list_item':
                        return (
                            <li>{result?.bulleted_list_item?.rich_text[0]?.plain_text}</li>
                        )
                        break;
                    case 'numbered_list_item':
                        return (
                            <li>{result?.numbered_list_item?.rich_text[0]?.plain_text}</li>
                        )
                        break;
                    default:
                        break;
                }


            })
            setNotionContent(contentArray);
        }
        fetchNotionContent();
    }, [])

    return (
        <div className="pt-5 text-lg text-white">
            {
                notionContent.map((item, index) => {
                    return (<div key={index}>{item}</div>)
                })
            }
        </div>
    )
}