import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { useTableSearchParams } from "..";
import { encodedEmptyStringForCustomDefaultValue } from "../encoder-decoder/encodedEmptyStringForCustomDefaultValue";
import { defaultDefaultGlobalFilter } from "../useGlobalFilter";
import { useTestRouter } from "./testRouter";

describe("globalFilter", () => {
  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });
  describe.each<{
    name: string;
    options?: Parameters<typeof useTableSearchParams>[1];
  }>([
    {
      name: "no options",
    },
    {
      name: "with options: string param name",
      options: {
        globalFilter: {
          paramName: "GLOBAL_FILTER",
        },
      },
    },
    {
      name: "with options: function param name",
      options: {
        globalFilter: {
          paramName: (key) => `userTable-${key}`,
        },
      },
    },
    {
      name: "with options: default param name encoder/decoder",
      options: {
        globalFilter: {
          encoder: (globalFilter) => ({
            globalFilter: JSON.stringify(globalFilter),
          }),
          decoder: (query) =>
            query["globalFilter"]
              ? JSON.parse(query["globalFilter"] as string)
              : query["globalFilter"] ?? "",
        },
      },
    },
    {
      name: "with options: custom param name encoder/decoder",
      options: {
        globalFilter: {
          encoder: (globalFilter) => ({
            "userTable-globalFilter": JSON.stringify(globalFilter),
          }),
          decoder: (query) =>
            query["userTable-globalFilter"]
              ? JSON.parse(query["userTable-globalFilter"] as string)
              : query["userTable-globalFilter"] ?? "",
        },
      },
    },
    {
      name: "with options: custom default value",
      options: {
        globalFilter: {
          defaultValue: "default",
        },
      },
    },
  ])("%s", ({ options }) => {
    const paramName =
      typeof options?.globalFilter?.paramName === "function"
        ? options.globalFilter.paramName("globalFilter")
        : options?.globalFilter?.paramName || "globalFilter";

    test("basic", () => {
      const { result: routerResult, rerender: routerRerender } = renderHook(
        () => useTestRouter(),
      );
      const { result, rerender: resultRerender } = renderHook(() => {
        const stateAndOnChanges = useTableSearchParams(
          routerResult.current,
          options,
        );
        return useReactTable({
          columns: [],
          data: [],
          getCoreRowModel: getCoreRowModel(),
          ...stateAndOnChanges,
        });
      });
      const rerender = () => {
        routerRerender();
        resultRerender();
      };

      const defaultGlobalFilter =
        options?.globalFilter?.defaultValue ?? defaultDefaultGlobalFilter;

      // initial state
      expect(result.current.getState().globalFilter).toBe(defaultGlobalFilter);
      expect(routerResult.current.query).toEqual({});

      // set
      act(() => result.current.setGlobalFilter("John"));
      rerender();
      expect(result.current.getState().globalFilter).toBe("John");
      expect(routerResult.current.query).toEqual(
        options?.globalFilter?.encoder?.("John") ?? {
          [paramName]: "John",
        },
      );

      // reset
      act(() => result.current.setGlobalFilter(""));
      rerender();

      expect(result.current.getState().globalFilter).toBe("");
      expect(routerResult.current.query).toEqual(
        options?.globalFilter?.encoder?.("") ?? {
          [paramName]: defaultGlobalFilter
            ? encodedEmptyStringForCustomDefaultValue
            : undefined,
        },
      );
    });
  });
});
