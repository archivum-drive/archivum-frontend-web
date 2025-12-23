import type { TagColor } from "archivum-typescript";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { repositoryStore } from "../lib/storage";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input, Label } from "./ui/input";

type Inputs = {
  name: string;
  color: TagColor;
};

export default function CreateTagButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const { name, color } = data;

    repositoryStore.mutate((repo) => {
      const id = repo.getNextTagId();
      const path = name.split("/").map((segment) => segment.trim());
      repo.upsertTag({ id, path: path, color, deleted: false });
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Create New Tag</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
          </DialogHeader>

          <form
            id="newNodeForm"
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-3">
              <Label htmlFor="name">Tag Name</Label>
              <Input
                {...register("name", { required: true })}
                type="text"
                id="name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="color">Tag Color</Label>
              <select
                {...register("color", { required: true })}
                id="color"
                className="block w-full rounded-md border border-neutral-300 bg-background-light p-2 shadow-sm"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="gray">Gray</option>
              </select>
            </div>
          </form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="newNodeForm">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
