import { documentType } from "@/store/interfaces/document";

export const dummyDocument: documentType = {
  Documentid: 0,
  name: "Dummy",
  delta: [
    { insert: "Hei Tittle" },
    { attributes: { header: 2 }, insert: "\n" },
    {
      insert:
        "\nsimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop "
    },
    {
      attributes: { italic: true, bold: true },
      insert: "replenish be over lesser fil"
    },
    {
      insert:
        "l. Bring beast abundantly so. Every unto creature make beast divided third beast lesser whose subdue waters his. Morning seas moving living blessed abundantly unto be saw. Creeping god which. Without kind lesser."
    },
    { attributes: { blockquote: true }, insert: "\n" },
    { insert: "\n\n" },
    {
      attributes: { italic: true, link: "https://youtube.com/" },
      insert: "Youtube Link"
    },
    {
      insert:
        "\n\nGrass. Subdue don't unto sixth seasons his herb, midst sea. First it above waters deep them brought open wherein dry under living day give, she'd darkness isn't one fly. Meat deep divide. Appear good spirit their i male is two so Them together lesser dominion. Said doesn't years for. Hath brought saw a void above earth behold evening fish sea greater light for evening green days yielding is above, greater. Night you're god cattle.\n"
    }
  ],
  tags: ["Test 1"],
  lastEdited: "5 Feb 2021",
  QuestionSetID: -1
};
