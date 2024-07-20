import {
  functionalUpdate,
  type RowData,
  type TableOptions,
  type TableState,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import type { Router } from "./types";
import {
  decodeGlobalFilter,
  encodeGlobalFilter,
} from "./encoder-decoder/globalFilter";
import { decodeSorting, encodeSorting } from "./encoder-decoder/sorting";
import {
  decodePagination,
  encodePagination,
} from "./encoder-decoder/pagination";

export type State = Pick<TableState, "globalFilter" | "sorting" | "pagination">;

const PARAM_NAMES = {
  GLOBAL_FILTER: "globalFilter",
  SORTING: "sorting",
  PAGE_INDEX: "pageIndex",
  PAGE_SIZE: "pageSize",
} as const;

type Returns<T_DATA extends RowData> = {
  state: State;
  onGlobalFilterChange: Exclude<
    TableOptions<T_DATA>["onGlobalFilterChange"],
    undefined
  >;
  onSortingChange: Exclude<TableOptions<T_DATA>["onSortingChange"], undefined>;
  onPaginationChange: Exclude<
    TableOptions<T_DATA>["onPaginationChange"],
    undefined
  >;
};

export const useTableSearchParams = <T_DATA extends RowData>(
  router: Router,
): Returns<T_DATA> => {
  const globalFilterQueryValue = router.query[PARAM_NAMES.GLOBAL_FILTER];
  const globalFilter = useMemo(
    () => decodeGlobalFilter(globalFilterQueryValue),
    [globalFilterQueryValue],
  );

  const sortingQueryValue = router.query[PARAM_NAMES.SORTING];
  const sorting = useMemo(
    () => decodeSorting(sortingQueryValue),
    [sortingQueryValue],
  );

  const pageIndexQueryValue = router.query[PARAM_NAMES.PAGE_INDEX];
  const pageSizeQueryValue = router.query[PARAM_NAMES.PAGE_SIZE];
  const pagination = useMemo(
    () =>
      decodePagination({
        pageIndex: pageIndexQueryValue,
        pageSize: pageSizeQueryValue,
      }),
    [pageIndexQueryValue, pageSizeQueryValue],
  );

  const state = useMemo(
    () => ({ sorting, pagination, globalFilter }),
    [sorting, pagination, globalFilter],
  );

  return {
    state,
    onGlobalFilterChange: useCallback(
      async (updater) => {
        const newGlobalFilter = functionalUpdate(updater, globalFilter);
        if (newGlobalFilter === globalFilter) {
          return;
        }

        const newQueryValue = encodeGlobalFilter(newGlobalFilter);

        const { [PARAM_NAMES.GLOBAL_FILTER]: _, ...excludedQuery } =
          router.query;

        await router.push({
          pathname: router.pathname,
          query:
            newQueryValue === undefined
              ? excludedQuery
              : {
                  ...excludedQuery,
                  [PARAM_NAMES.GLOBAL_FILTER]: newQueryValue,
                },
        });
      },
      [router, globalFilter],
    ),
    onSortingChange: useCallback(
      async (updater) => {
        const newState = functionalUpdate(updater, sorting);
        const newQueryValue = encodeSorting(newState);

        const { [PARAM_NAMES.SORTING]: _, ...excludedQuery } = router.query;
        await router.push({
          pathname: router.pathname,
          query:
            newQueryValue === undefined
              ? excludedQuery
              : { ...excludedQuery, [PARAM_NAMES.SORTING]: newQueryValue },
        });
      },
      [router, sorting],
    ),
    onPaginationChange: useCallback(
      async (updater) => {
        const newPagination = functionalUpdate(updater, pagination);
        if (
          newPagination.pageIndex === pagination.pageIndex &&
          newPagination.pageSize === pagination.pageSize
        ) {
          return;
        }

        const newQueryValues = encodePagination(newPagination);

        const {
          [PARAM_NAMES.PAGE_INDEX]: _,
          [PARAM_NAMES.PAGE_SIZE]: __,
          ...query
        } = router.query;

        if (newQueryValues.pageIndex) {
          query[PARAM_NAMES.PAGE_INDEX] = newQueryValues.pageIndex;
        }
        if (newQueryValues.pageSize) {
          query[PARAM_NAMES.PAGE_SIZE] = newQueryValues.pageSize;
        }

        await router.push({ pathname: router.pathname, query: query });
      },
      [router, pagination],
    ),
  };
};
