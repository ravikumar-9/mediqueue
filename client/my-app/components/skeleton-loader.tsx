import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export const TableSkeletonRows = ({ rows = 10,length=10 }: { rows?: number ,length?:number}) => {
    return Array.from({ length: rows }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({length}).map((__, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton className="h-6 w-full bg-muted rounded mx-auto" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  