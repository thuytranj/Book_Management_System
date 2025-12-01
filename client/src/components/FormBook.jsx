import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext } from "react";
import { BookContext } from "../context/BookProvider.jsx";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormBook = ({ onSuccess, updatedBook = null }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: updatedBook?.title || "",
      author: updatedBook?.author || "",
      category: updatedBook?.category || "",
      publishedYear: updatedBook?.publishedYear || "",
      isbn: updatedBook?.isbn || "",
      description: updatedBook?.description || "",
    },
  });

  const { categories } = useContext(BookContext);
  const onSubmit = async (data) => {
    try {
      const response = updatedBook
        ? await axios.put(
            `http://localhost:3000/api/books/${updatedBook.id}`,
            data
          )
        : await axios.post("http://localhost:3000/api/books", data);

      toast.success(
        `Book "${data.title}" ${
          updatedBook ? "updated" : "added"
        } successfully!`
      );
      onSuccess();
      reset();
    } catch (error) {
      console.log("Error adding book:", error);
      toast.error(
        `${error.response?.data?.error || error.message}. Please try again.`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <Input {...register("title", { required: true })} />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Author
        </label>
        <Input {...register("author", { required: true })} />
        {errors.author && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Category
        </label>

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories
                    .filter((c) => c !== "All")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  {categories.includes("Others") || (
                    <SelectItem value={"Others"}>Others</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Published Year
        </label>
        <Input {...register("publishedYear", { required: true })} />
        {errors.publishedYear && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          ISBN
        </label>
        <Input {...register("isbn", { required: true })} />
        {errors.isbn && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full items-start">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="border p-2 rounded w-full"
          rows={4}
        />

        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            This field is required
          </span>
        )}
      </div>

      <div className="w-full flex justify-end">
        <Button type="submit" variant="destructive">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormBook;
