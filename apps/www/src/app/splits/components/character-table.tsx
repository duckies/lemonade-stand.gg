import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@lemonade-stand/ui";
import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { ClassColor } from "~/components/class-color";
import { realms } from "~/constants";

export interface Character {
  id: number;
  name: string;
  realm: string;
  data: any;
}

interface ResponseCharacterData {
  id: number;
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  gender: string;
  race: {
    id: number;
    name: string;
  };
  class: {
    id: number;
    name: string;
  };
  gear: {
    equipped: number;
    average: number;
  };
  level: number;
  last_login: Date;
  achievement_points: number;
  guild: {
    name: string;
    realm: {
      name: string;
      slug: string;
    };
  };
}

interface ResponseCharacters {
  id: number;
  main: {
    name: string;
    realm: string;
    data?: ResponseCharacterData;
  };
  alts: {
    name: string;
    realm: string;
    data?: ResponseCharacterData;
  }[];
  authorId: string;
}

export const classColors = {
  10: "text-class-monk",
};

const columnHelper = createColumnHelper<ResponseCharacters>();

const generateAltColumns = (data: ResponseCharacters[]): ColumnDef<ResponseCharacters>[] => {
  const maxAlts = data.reduce((count, chars) => {
    count = Math.max(chars.alts.length, count);
    return count;
  }, 0);

  const groups: ColumnDef<ResponseCharacters>[] = [...Array(maxAlts)].map((_, i) => {
    return columnHelper.group({
      header: `Split Character ${i + 1}`,
      columns: [
        columnHelper.accessor((row) => row.alts.at(i)?.name, {
          id: `alt-${i}-name`,
          header: "Name",
          cell: ({ row, column }) => (
            <ClassColor classId={row.original.alts.at(i)?.data?.class.id}>
              {row.getValue(column.id)}
            </ClassColor>
          ),
        }),
        columnHelper.accessor(
          (row) =>
            row.alts.at(i)?.data?.realm.name ??
            realms.find((r) => r.slug === row.alts.at(i)?.realm)?.name ??
            row.alts.at(i)?.realm,
          {
            id: `alt-${i}-realm`,
            header: "Realm",
          },
        ),
      ],
    });
  });

  return groups;
};

const generateColumns = (data: ResponseCharacters[]): ColumnDef<ResponseCharacters>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "authorId",
      header: "Author",
    },
    columnHelper.group({
      id: "main",
      header: "Main Character",
      columns: [
        columnHelper.accessor("main.name", {
          header: "Name",
          footer: (props) => props.column.id,
          cell: ({ row, column }) => {
            return (
              <ClassColor classId={row.original.main.data!.class.id}>
                {row.getValue(column.id)}
              </ClassColor>
            );
          },
        }),
        columnHelper.accessor("main.data.realm.name", {
          id: "mainRealm",
          header: "Realm",
          footer: (props) => props.column.id,
        }),
      ],
    }),
    ...generateAltColumns(data),
  ];
};

export function CharacterTable() {
  const { data: characters, status } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const resp = await fetch("http://localhost:4000/characters");

      const data: ResponseCharacters[] = await resp.json();

      return data;
    },
  });

  const data = useMemo(() => characters ?? [], [characters]);
  const columns = useMemo(() => generateColumns(data), [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="bg-card rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
