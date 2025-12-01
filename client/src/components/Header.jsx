import React from 'react'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from './ui/button';
import FormBook from './FormBook';
import { useState, useContext } from 'react';
import { BookContext } from '../context/BookProvider.jsx';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = ({ onSuccess }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setSearchQuery } = useContext(BookContext);

  return (
    <div className="flex justify-between p-2">
      <p className="text-2xl font-semibold">Books</p>

      <div className="flex items-center gap-2">
        <div className="relative md:w-64 flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
          <Input
            type="text"
            placeholder="Search ..."
            className="pl-10 w-full"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>

        <Tooltip>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <TooltipContent>
              <p>Add a new book</p>
            </TooltipContent>

            <DialogContent className="!w-[90vw] !max-w-[90vw] md:!w-[50vw] md:!max-w-[50vw] md:max-h-screen  max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add a New Book</DialogTitle>
                <DialogDescription>
                  Fill out the form below to add a new book to the library.
                </DialogDescription>
              </DialogHeader>

              <FormBook
                onSuccess={() => {
                  onSuccess();
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </Tooltip>
      </div>
    </div>
  );
}

export default Header