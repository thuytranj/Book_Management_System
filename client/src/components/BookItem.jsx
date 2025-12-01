import React, { use } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import FormBook from './FormBook.jsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BookItem = ({ book, onSuccess }) => {
  const [id, setId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function handleDetailsClick() {
      if (!id) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBookDetails(res.data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    }

    handleDetailsClick();
   }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${book.id}`);
      setIsDeleting(true);
      toast.success(`Book "${book.title}" deleted successfully!`);
      onSuccess();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };


  return (
    <div className="flex w-full p-4 items-center rounded-md shadow-md bg-white gap-4">
      <div className="w-1/4 md:h-50 h-40 bg-gray-200 rounded-sm flex justify-center items-center text-gray-500">
        Image
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-xl">{book.title}</p>
            <p className="text-md">by {book.author}</p>
          </div>

          <div className="flex gap-2">
            <Tooltip>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <SquarePen className="cursor-pointer w-5" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Book</p>
                </TooltipContent>

                <DialogContent className="!w-[90vw] !max-w-[90vw] md:!w-[50vw] md:!max-w-[50vw] md:max-h-screen max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to edit the book details.
                    </DialogDescription>
                    <FormBook
                      updatedBook={book}
                      onSuccess={() => {
                        onSuccess();
                        setIsEditing(false);
                      }}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Tooltip>

            <Tooltip>
              <Dialog>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Trash2 className="cursor-pointer w-5" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Book</p>
                </TooltipContent>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this book? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Tooltip>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {book.description}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="rounded-2xl px-7"
              variant="secondary"
              onClick={() => setId(book.id)}
            >
              Details
            </Button>
          </DialogTrigger>

          <DialogContent className="!w-[90vw] !max-w-[90vw] md:!w-[60vw] md:!max-w-[60vw] md:max-h-screen max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Book Details
              </DialogTitle>
              <DialogDescription>
                Detailed information about the book.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full flex flex-col md:flex-row justify-evenly items-stretch gap-5">
              {bookDetails ? (
                <>
                  <div className="w-full md:w-1/3 flex justify-center items-center">
                    <div className="w-60 h-80 bg-gray-200 rounded-sm flex justify-center items-center text-gray-500">
                      Image
                    </div>
                  </div>

                  <div className="flex flex-col w-full md:w-1/2 gap-5">
                    <p className="text-3xl font-semibold text-center md:text-left">
                      {bookDetails.title}
                    </p>

                    <p className="leading-relaxed text-justify">
                      {bookDetails.description}
                    </p>

                    <div className="w-full grid md:grid-cols-[200px_1fr] grid-cols-[150px_1fr] gap-4">
                      <p className="font-semibold">AUTHOR</p>
                      <p>{bookDetails.author}</p>
                      <p className="font-semibold">CATEGORY</p>
                      <p>{bookDetails.category}</p>
                      <p className="font-semibold">PUBLISHED YEAR</p>
                      <p>{bookDetails.publishedYear}</p>
                      <p className="font-semibold">ISBN</p>
                      <p>{bookDetails.isbn}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default BookItem