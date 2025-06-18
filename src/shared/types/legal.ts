interface LegalSubsection {
  title: string;
  content: string;
}

export interface LegalSection {
  title: string;
  content: string;
  subsections?: LegalSubsection[];
}
