import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { BookmarkNode, FileNode } from "../interfaces/node";
import { addNode } from "../mock/storage";

type Inputs = {
  name: string;
  type: "file" | "bookmark";
};

export default function CreateNodeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const { name, type } = data;
    let newNode;
    if (type === "file") {
      newNode = new FileNode(Date.now().toString(), name);
    } else {
      newNode = new BookmarkNode(Date.now().toString(), name);
    }
    addNode(newNode);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full rounded-full bg-primary px-4 py-2 text-text-dark hover:bg-primary-dark"
      >
        Create New Node
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 shadow-2xl backdrop-blur-xs">
          <div className="w-96 rounded-lg bg-background-light p-6">
            <h2 className="mb-4 font-bold text-xl">Create New Node</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block font-medium text-current/80 text-sm">
                  Node Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="mt-1 block w-full rounded-md border border-neutral-300 p-2 shadow-sm"
                />
              </div>
              <div>
                <label className="block font-medium text-current/80 text-sm">
                  Node Type
                </label>
                <select
                  {...register("type", { required: true })}
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-background-light p-2 shadow-sm"
                >
                  <option value="file">File</option>
                  <option value="bookmark">Bookmark</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="rounded-md bg-neutral-800 px-4 py-2 shadow-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-text-dark shadow-lg hover:bg-primary-dark"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
