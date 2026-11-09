import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";
import { FileText, Plus, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const AdminNews = () => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedLog = useMemo(
    () =>
      debounce((value: string) => {
        console.log("Search input:", value);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedLog(searchValue);

    return () => {
      debouncedLog.cancel();
    };
  }, [debouncedLog, searchValue]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg sm:text-base">News List</CardTitle>
          <CardAction className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <div className="relative flex w-full items-center sm:max-w-xs">
              <SearchIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg pl-10!"
              />
            </div>

            <Link
              to={"/admin/news/create"}
              className={buttonVariants({
                variant: "default",
              })}
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Create</span>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center text-muted-foreground">
            <FileText className="mb-3 size-10 opacity-70" />
            <p className="text-base font-medium text-foreground">
              No submission yet
            </p>
            <p className="mt-1 text-sm">
              Submit the form to preview the article payload here.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminNews;
