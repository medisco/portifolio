export interface ContactInfo {
  name: string;
  email: string;
  github: string;
  githubHandle: string;
  ens: string;
  linkedin?: string;
  location: string;
  currentRole: string;
  currentCompany: string;
}

export const contactInfo: ContactInfo = {
  name: "Ismael Medeiros",
  email: "hello@ismaelm.dev",
  github: "https://github.com/medisco",
  githubHandle: "medisco",
  ens: "ismael.eth",
  linkedin: "https://linkedin.com/in/ismaelm",
  location: "Brasília, Brazil",
  currentRole: "Senior Full Stack Engineer",
  currentCompany: "Blockparty",
};

// Experience data for the home page
export interface Experience {
  company: string;
  title: string;
  period: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    company: "Blockparty",
    title: "Senior Full Stack Engineer",
    period: "2023–present",
    description: "Building high-throughput event indexing pipeline for blockchain data; 30k+ events/sec at 4B+ document scale.",
  },
  {
    company: "NFTNode",
    title: "Backend Engineer",
    period: "2022–2023",
    description: "NFT marketplace infrastructure and API design for multi-chain support.",
  },
  {
    company: "Smart Escritura",
    title: "Engineer",
    period: "2021–2022",
    description: "Document management platform with digital signature integration.",
  },
  {
    company: "Mach10",
    title: "Engineer",
    period: "2020–2021",
    description: "Distributed systems and API development for fintech applications.",
  },
];

// Education data
export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  thesis?: {
    title: string;
    url: string;
  };
}

export const education: Education[] = [
  {
    institution: "University of Brasília",
    degree: "MS",
    field: "Computer Science",
    period: "2021–2023",
    thesis: {
      title: "DogeFuzz: Coverage-Guided Greybox Fuzzing for Ethereum Smart Contracts",
      url: "https://example.com/thesis.pdf",
    },
  },
];
