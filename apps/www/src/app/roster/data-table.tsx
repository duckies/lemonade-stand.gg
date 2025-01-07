"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@lemonade-stand/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { GuildRoster } from "~/server/battle.net";

const columnHelper = createColumnHelper<GuildRoster["members"][number]>();

const columns = [
  columnHelper.accessor("character.name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rank", {
    header: "Rank",
    cell: (info) => info.getValue(),
  }),
];

export function RosterDataTable({ data }: { data: GuildRoster["members"] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
