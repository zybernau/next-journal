import { getJournals, insertJournal } from "./repository";

const sampleJournal = [
  {
    id: 1,
    title: "start letter",
    date: "2022-11-13",
    message: "sample message save on a date."
  },
  {
    id: 2,
    title: "start letter 2",
    date: "2022-11-12",
    message: "sample message save on a date. 12"
  },
]

export default async function handler(req, res) {
  if (req.method === "GET") {
    const journalsCollection = await getJournals();
    console.log("journals-", journalsCollection);
    return res.status(200).json(journalsCollection);
  } else if (req.method === "POST") {
    console.log("server", req.body);
    const journal = JSON.parse(req.body);
    console.log("got journal", journal.newJournal);
    const newJournal = {
      ...journal.newJournal, id: Date.now()
    };
    const result = await insertJournal(newJournal);
    return res.status(301).json(result);
  }
}