'use client';

import { Link } from '@/components/ui/link';
import { Section } from '@/components/ui/section';
import { randomYearOfContributions } from '@/lib/random-contributions';
import { useThemeWipe } from '@/theme/wipe';
import { useQuery } from '@tanstack/react-query';
import { differenceInCalendarWeeks } from 'date-fns';
import { cloneElement, useMemo, useState, type ReactElement } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useInterval } from 'react-use';

export type ContributionResponse = {
  total: Record<string, number>;
  // contributions: Record<
  //   string /* year */,
  //   Record<string /* month */, { date: string; count: number; level: number }>[]
  // >;
  contributions: { date: string; count: number; level: number }[];
};

const fetchContributions = async () => {
  const url = new URL(
    'https://github-contributions-api.jogruber.de/v4/thomas-forbes',
  );

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub contributions');
  }
  return response.json() as Promise<ContributionResponse>;
};

export function Contributions() {
  const { data: queryData } = useQuery({
    queryKey: ['github-contributions'],
    queryFn: fetchContributions,
  });

  const [randomData, setRandomData] = useState<
    ContributionResponse['contributions']
  >(() => randomYearOfContributions());
  useInterval(
    () => setRandomData(randomYearOfContributions()),
    !queryData ? 300 : null,
  );

  const data = useMemo(() => {
    if (!queryData) return randomData;

    return queryData.contributions
      .filter((item) => differenceInCalendarWeeks(new Date(), item.date) <= 52)
      .toSorted(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }, [queryData, randomData]);

  const totalCount = useMemo(() => {
    return data.reduce((acc, item) => acc + item.count, 0);
  }, [data]);

  const { resolvedTheme } = useThemeWipe();
  if (data.length === 0) return null;

  return (
    <Section
      title={
        <>
          <Link href="https://github.com/thomas-forbes" target="_blank">
            What
          </Link>{' '}
          I've been up to
        </>
      }
      className="z-10"
    >
      <ActivityCalendar
        data={data}
        colorScheme={resolvedTheme}
        blockSize={10}
        blockMargin={4}
        renderBlock={(block) =>
          cloneElement(block, {
            style: { strokeWidth: 0 },
            className: 'transition-all duration-300',
          })
        }
        renderColorLegend={(block) =>
          cloneElement(block, {
            height: 11,
            children: cloneElement(
              block.props.children as ReactElement<SVGElement>,
              {
                // @ts-ignore
                y: 1,
                height: 10,
                width: 10,
                strokeWidth: 0,
                style: {
                  stroke: 'none',
                } as CSSStyleDeclaration,
              },
            ),
          })
        }
        labels={{
          totalCount: queryData
            ? `${totalCount} contributions past 12 months`
            : 'Loading contributions...',
        }}
        theme={{
          light: [
            'transparent',
            'var(--color-indigo-300)',
            'var(--color-indigo-600)',
            'var(--color-indigo-950)',
            'var(--color-rose-600)',
          ],
          dark: [
            'transparent',
            'color-mix(in srgb, var(--color-indigo-900) 100%, var(--background) 50%)',
            'var(--color-indigo-400)',
            'var(--color-indigo-200)',
            'var(--color-rose-600)',
          ],
        }}
      />
    </Section>
  );
}
