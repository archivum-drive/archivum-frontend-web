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
        className="bg-primary px-4 py-2 rounded-full w-full hover:bg-primary-dark"
      >
        Create New Node
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center shadow-2xl">
          <div className="bg-background-light p-6 rounded-lg w-96 ">
            <h2 className="text-xl font-bold mb-4">Create New Node</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-current/80">
                  Node Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-current/80">
                  Node Type
                </label>
                <select
                  {...register("type", { required: true })}
                  className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm p-2"
                >
                  <option value="file">File</option>
                  <option value="bookmark">Bookmark</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-neutral-800 rounded-md shadow-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded-md shadow-lg hover:bg-primary-dark"
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
