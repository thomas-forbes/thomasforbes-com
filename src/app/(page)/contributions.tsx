'use client';

import { useThemeWipe } from '@/theme/wipe';
import { useQuery } from '@tanstack/react-query';
import { differenceInCalendarWeeks } from 'date-fns';
import { cloneElement, useMemo, type ReactElement } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

type ContributionResponse = {
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

export function GitHubContributions() {
  const {
    data: queryData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['github-contributions'],
    queryFn: fetchContributions,
  });

  const data = useMemo(() => {
    if (!queryData) return [];

    return queryData.contributions
      .filter((item) => differenceInCalendarWeeks(new Date(), item.date) <= 52)
      .toSorted(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }, [queryData]);

  const totalCount = useMemo(() => {
    return data.reduce((acc, item) => acc + item.count, 0);
  }, [data]);

  const { resolvedTheme } = useThemeWipe();
  if (data.length === 0) return null;

  return (
    <div className="z-10 flex flex-col items-center">
      <ActivityCalendar
        // tooltips={{
        //   activity: {
        //     text: (item) =>
        //       `${item.count} contributions on ${format(new Date(item.date), 'MMMM d, yyyy')}`,
        //   },
        // }}
        data={data}
        colorScheme={resolvedTheme}
        blockSize={10}
        blockMargin={4}
        renderBlock={(block) =>
          cloneElement(block, { style: { strokeWidth: 0 } })
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
        labels={{ totalCount: `${totalCount} contributions past 12 months` }}
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
    </div>
  );
}
