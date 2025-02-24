import { type Table, flexRender } from "@tanstack/react-table";
import { SearchInput } from "./SearchInput";
import type { User } from "./userData";

type Props = {
  table: Table<User>;
};

export const UserTable = ({ table }: Props) => (
  <div className="flex">
    <div>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label>
        Global Filter
        <SearchInput
          className="ml-2"
          onSearch={(value) => table.setGlobalFilter(value)}
          defaultValue={table.getState().globalFilter ?? ""}
        />
      </label>
      <table>
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => (
              <th key={header.id}>
                <button
                  type="button"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {(() => {
                    switch (header.column.getIsSorted()) {
                      case "asc":
                        return " ⬆️";
                      case "desc":
                        return " ⬇️";
                      default:
                        return " ↕️";
                    }
                  })()}
                </button>
                <div>
                  {header.column.id === "age" ? (
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={
                          (
                            header.column.getFilterValue() as [number, number]
                          )?.[0] ?? ""
                        }
                        onChange={(e) =>
                          header.column.setFilterValue(
                            (old: [number, number]) => [
                              e.target.value,
                              old?.[1],
                            ],
                          )
                        }
                        placeholder="Min"
                        className="border w-24"
                      />
                      <input
                        type="number"
                        value={
                          (
                            header.column.getFilterValue() as [number, number]
                          )?.[1] ?? ""
                        }
                        onChange={(e) =>
                          header.column.setFilterValue(
                            (old: [number, number]) => [
                              old?.[0],
                              e.target.value,
                            ],
                          )
                        }
                        placeholder="Max"
                        className="border w-24"
                      />
                    </div>
                  ) : (
                    <SearchInput
                      className="ml-2"
                      onSearch={(value) => header.column.setFilterValue(value)}
                      defaultValue={
                        (header.column.getFilterValue() ?? "") as string
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div>
    </div>
    <pre>
      {JSON.stringify(
        {
          globalFilter: table.getState().globalFilter,
          sorting: table.getState().sorting,
          pagination: table.getState().pagination,
          columnFilters: table.getState().columnFilters,
        },
        null,
        2,
      )}
    </pre>
  </div>
);
