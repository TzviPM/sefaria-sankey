import sefaria from '@api/sefaria';

const TORAH = "Torah";
const NAVI = "Prophets";
const KETUVIM = "Writings";

const TANAKH = 'Tanakh';
const TANAKH_SECTIONS = [TORAH, NAVI, KETUVIM];

interface Section {
  category: string;
  heCategory: string;
  contents: Book[] | Section[];
}

interface Book {
  title: string;
  heTitle: string;
  order: number;
}

type Item = Book | Section;

function isBook(item: Item): item is Book {
  return 'title' in item;
}

function isSection(item: Item): item is Section {
  return 'contents' in item;
}

type SankeyMetrics = {
  total: number;
  text: string;
  title: string;
};

function toSankeyMatic(item: Section): SankeyMetrics {  
  const title = `${item.heCategory} (${item.category})`;

  if (isBook(item.contents[0])) {
    const total = item.contents.length;
    const text =  item.contents.map(book => `${title} [1] ${book.heTitle} (${book.title})`).join('\n');
    return { total, text, title };
  }

  // sections:
  let total = 0;
  let texts = [];
  for (const section of item.contents) {
    const { total: sectionTotal, text: sectionText, title: sectionTitle } = toSankeyMatic(section as Section);
    total += sectionTotal;
    texts.push(`${title} [${sectionTotal}] ${sectionTitle}\n${sectionText}`);
  }

  return { total, text: texts.join('\n'), title };
}

async function main() {
  const index = await sefaria.getApiIndex();
  const tanakh = index.data.find(item => item.category === TANAKH);
  const tanakhSection = {
    ...tanakh,
    contents: tanakh.contents.filter(item => TANAKH_SECTIONS.includes(item.category)).sort((a, b) => a.order - b.order)
  } as Section;

  const { text } = toSankeyMatic(tanakhSection);

  console.log(text);
}

main();