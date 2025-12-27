import { Quotes } from '@/app/(page)/Quotes';
import { PhotoPreview } from '@/components/photo-preview';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { Section } from '@/components/ui/section';
import { getPhotos } from '@/lib/getPhotos';
import { fetchAllFavorites } from '@/lib/quotes';
import { MAILTO_URL } from '@/lib/types';
import type { ReactNode } from 'react';

export default function Home() {
  return (
    <>
      <Header />
      <hr />
      <Photos />
      <hr />
      <div className="grid gap-8 md:grid-cols-2">
        <QuotesWrapper />
        <Contact />
      </div>
      <hr />
      <Previously />
    </>
  );
}

function Header() {
  return (
    <Section as="h1" title="Thomas Forbes">
      <Card>
        <CardContent className="space-y-3">
          <p>
            Taking a gap semester from Georgetown to deal with health issues and
            work on personal projects.
          </p>
          <p>
            Previously, I dropped out of my final year of high school to work at{' '}
            <Link href="https://www.bestever.ai" target="_blank">
              bestever.ai
            </Link>{' '}
            in sf.
          </p>
          <p>
            My favorite feeling is finishing a long day of work and having
            something I can point to and say{' '}
            <span className="italic">&quot;I made that&quot;</span>.
          </p>
          <p>My second favorite feeling is to jump out of plane 🪂</p>
        </CardContent>
      </Card>
    </Section>
  );
}

const PREVIOUSLY_ITEMS: {
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode | ReactNode[];
}[] = [
  {
    title: 'Email app',
    description: 'releasing soon...',
    content:
      "Current email apps aren't excellent. I didn't like that so I am building my own for fun.",
  },
  {
    title: <>Student at Georgetown University</>,
    description: '2024/08 -> 2025/05 in DC',
  },
  {
    title: (
      <>
        Software Engineer at{' '}
        <Link href="https://bestever.ai" target="_blank">
          Bestever
        </Link>
      </>
    ),
    description: '2023/06 -> 2024/08 in SF',
    content:
      'Full-stack engineer. Finished my high school coursework in my freetime.',
  },
  {
    title: (
      <Link href="https://www.joinpatch.org/" target="_blank">
        Patch
      </Link>
    ),
    description: 'Summer 2022 in Dublin',
    content: [
      "Ireland's leading young builder accelerator.",
      <>
        Built an{' '}
        <Link href="https://apps.ankiweb.net/" target="_blank">
          Anki
        </Link>{' '}
        like study tool with automated flashcard generation using gpt-3 (yes I'm
        an unc)
      </>,
    ],
  },
  {
    title: (
      <Link href="https://aipo.ucc.ie/" target="_blank">
        All Ireland Programming Olympiad
      </Link>
    ),
    content: 'Bronze medalist in 2023, 2022 and top 15 in 2021 and 2020',
  },
  {
    title: (
      <Link href="https://www.youngeconomist.ie/" target="_blank">
        Irish Young Economist
      </Link>
    ),
    content: [
      <>
        IGEES award winner and Gold medalist 2023{' '}
        <Link
          href="https://drive.google.com/file/d/1KlU16SRe7rNavkPd86SrDLHjNzC_nRws/view?usp=sharing"
          target="_blank"
        >
          (paper)
        </Link>
        . Gold medalist 2022{' '}
        <Link
          href="https://docs.google.com/document/d/1G4CvFAEWkRpvlLC2j5LqWKWumxlYAkcjQufj0XjgUWI/edit?usp=sharing"
          target="_blank"
        >
          (paper)
        </Link>
      </>,
      <>
        Invited to meet with Minister for Finance{' '}
        <Link
          href="https://en.wikipedia.org/wiki/Paschal_Donohoe"
          target="_blank"
        >
          Paschal Donohoe
        </Link>
      </>,
    ],
  },
];

function Previously() {
  return (
    <Section title="Previously">
      <div className="flex flex-col gap-4">
        {PREVIOUSLY_ITEMS.map(({ title, description, content }, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && (
                <CardDescription className="font-mono">
                  {description}
                </CardDescription>
              )}
            </CardHeader>
            {content && (
              <CardContent>
                {Array.isArray(content) ? (
                  <ul className="list-inside list-disc">
                    {content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  content
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}

async function Photos() {
  const photos = await getPhotos();
  return (
    <Section
      title="Photos"
      action={
        <Link href="/photos" className="font-mono text-sm">
          see all
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {photos.slice(0, 3).map((file) => (
            <PhotoPreview key={file} file={file} />
          ))}
        </div>
      </div>
    </Section>
  );
}

async function QuotesWrapper() {
  const quotes = await fetchAllFavorites();
  return <Quotes quotes={quotes} />;
}

function Contact() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🚨 Warning</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p>
            Clicking this might lead to actual human conversation. Proceed at
            your own risk.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href={MAILTO_URL} className="hover:no-underline">
            Your move
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
