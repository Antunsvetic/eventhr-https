import { queryClient } from '@/query-client';
import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page } from '@/api/common/types';
import type { Event } from './v1';

export const invalidateEventsCache = (): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.events.all });

export type EventSavedContext = {
  previousLists: Array<[readonly unknown[], Page<Event> | undefined]>;
  previousDetail: Event | undefined;
};

type IsSavedValue = boolean | 'toggle';

function applyIsSaved(event: Event, value: IsSavedValue): Event {
  return { ...event, isSaved: value === 'toggle' ? !event.isSaved : value };
}

export function createOptimisticIsSavedUpdater<TVariables extends { eventId: string }>(
  queryClient: ReturnType<typeof import('@tanstack/react-query').useQueryClient>,
  value: IsSavedValue,
  userOnMutate?: MutationOptions<void, TVariables>['onMutate'],
) {
  return async (variables: TVariables, mutationContext: unknown): Promise<EventSavedContext> => {
    const { eventId } = variables;
    const listKey = [...EVENTHR_QUERY_KEYS.events.all, 'list'];

    await queryClient.cancelQueries({ queryKey: EVENTHR_QUERY_KEYS.events.all });

    const previousLists = queryClient.getQueriesData<Page<Event>>({ queryKey: listKey });

    queryClient.setQueriesData<Page<Event>>({ queryKey: listKey }, (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        content: oldData.content.map((event) =>
          event.id === eventId ? applyIsSaved(event, value) : event,
        ),
      };
    });

    const detailKey = EVENTHR_QUERY_KEYS.events.detail(eventId);
    const previousDetail = queryClient.getQueryData<Event>(detailKey);
    if (previousDetail) {
      queryClient.setQueryData<Event>(detailKey, applyIsSaved(previousDetail, value));
    }

    await userOnMutate?.(variables, mutationContext as never);

    return { previousLists, previousDetail };
  };
}

export function createIsSavedRollback<TVariables extends { eventId: string }>(
  queryClient: ReturnType<typeof import('@tanstack/react-query').useQueryClient>,
  userOnError?: MutationOptions<void, TVariables>['onError'],
) {
  return (error: Error, variables: TVariables, onMutateResult: EventSavedContext | undefined, mutationContext: unknown) => {
    onMutateResult?.previousLists.forEach(([queryKey, data]) => {
      queryClient.setQueryData(queryKey, data);
    });
    if (onMutateResult?.previousDetail) {
      queryClient.setQueryData(
        EVENTHR_QUERY_KEYS.events.detail(variables.eventId),
        onMutateResult.previousDetail,
      );
    }
    userOnError?.(error, variables, onMutateResult, mutationContext as never);
  };
}
