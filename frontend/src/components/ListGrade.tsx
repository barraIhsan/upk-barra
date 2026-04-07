import { useState, useEffect, type SetStateAction } from "react";
import { getGrades, deleteGrade } from "../lib/api/grades.js";
import { z } from "zod";
import type { gradeApiSchema } from "../lib/schema/grades.js";
import { Trash, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import EditDialog from "./EditDialog.js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Grade = z.infer<typeof gradeApiSchema>;

const SortIcon = ({ sorted }: { sorted: false | "asc" | "desc" }) => {
  if (sorted === "asc") return <ArrowUp className="w-4 h-4 ml-1" />;
  if (sorted === "desc") return <ArrowDown className="w-4 h-4 ml-1" />;
  return <ArrowUpDown className="w-4 h-4 ml-1 opacity-40" />;
};

export default function ListGrade({
  refresh,
  setRefresh,
}: {
  refresh: number;
  setRefresh: React.Dispatch<SetStateAction<number>>;
}) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const data = await getGrades(search || undefined);
      setGrades(data || []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [refresh, search]);

  const handleDelete = async (id: string) => {
    await deleteGrade(id);
    setGrades((prev) => prev.filter((grade) => grade.id !== id));
  };

  const columns: ColumnDef<Grade>[] = [
    {
      accessorKey: "student_name",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting()}
        >
          Student Name <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
    },
    {
      accessorKey: "subject",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting()}
        >
          Subject <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
    },
    {
      accessorKey: "score",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting()}
        >
          Score <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <EditDialog
            grade={row.original}
            onEdit={() => setRefresh((r) => r + 1)}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete grade?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  grade.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.original.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: grades,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="mt-6 mx-6 space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search (name, subject, score)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No grades found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
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
