"use client";

import { useState, useRef } from "react";
import {
  UploadSimpleIcon,
  StarIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { ImageItem } from "@/lib/types";
import AnimatedButton from "@/components/ui/animated-button";

type Props = {
  images: ImageItem[];
  onImagesChangeAction: (items: ImageItem[]) => void;
  onNextAction: () => void;
  onBackAction: () => void;
  onDeletedImagesChangeAction: (urls: string[]) => void;
};

export default function Images({
  images,
  onImagesChangeAction,
  onNextAction,
  onBackAction,
  onDeletedImagesChangeAction,
}: Props) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [markedForDeletion, setMarkedForDeletion] = useState<Set<number>>(
    new Set(),
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const dragIndex = useRef<number | null>(null);
  const dropIndex = useRef<number | null>(null);
  const touchDragIndex = useRef<number | null>(null);

  function syncImages(items: ImageItem[]) {
    onImagesChangeAction(items);
    if (items.length === 0) {
      setImageError("At least 4 images are required.");
    } else if (items.length < 4) {
      setImageError(`${items.length} of 4 required images added.`);
    } else {
      setImageError(null);
    }
  }

  function handleNext() {
    if (images.length < 4) {
      setImageError(
        images.length === 0
          ? "At least 4 images are required."
          : `${images.length} of 4 required images added.`,
      );
      return;
    }
    onNextAction();
  }

  function addFiles(files: File[]) {
    if (!files.length) return;

    const validTypes = ["image/webp", "image/avif"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      setImageError("Only WEBP and AVIF images are supported.");
      return;
    }

    const newImages: ImageItem[] = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      order: images.length + index,
    }));

    syncImages([...images, ...newImages]);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  }

  function toggleDeletion(index: number) {
    const img = images[index];
    const isCurrentlyMarked = markedForDeletion.has(index);

    // update deleted images first
    if (img.existingUrl) {
      const newDeleted = isCurrentlyMarked
        ? deletedImages.filter((url) => url !== img.existingUrl)
        : [...deletedImages, img.existingUrl];

      setDeletedImages(newDeleted);
      onDeletedImagesChangeAction(newDeleted);
    }

    // then update marked set separately
    setMarkedForDeletion((prev) => {
      const next = new Set(prev);
      if (isCurrentlyMarked) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function removeImage(index: number) {
    const img = images[index];

    if (img.existingUrl) {
      toggleDeletion(index);
      return;
    }

    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    syncImages(updated);
  }

  function handleDropZoneDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingOver(true);
  }

  function handleDropZoneDragLeave() {
    setIsDraggingOver(false);
  }

  function handleDropZoneDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    addFiles(files);
  }

  function handleItemDragStart(index: number) {
    dragIndex.current = index;
    setDraggingIndex(index);
  }

  function handleItemDragEnter(index: number) {
    dropIndex.current = index;
  }

  function handleItemDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleItemDrop() {
    const from = dragIndex.current;
    const to = dropIndex.current;
    if (from === null || to === null || from === to) return;
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    syncImages(reordered.map((img, i) => ({ ...img, order: i })));
    dragIndex.current = null;
    dropIndex.current = null;
  }

  function handleItemDragEnd() {
    dragIndex.current = null;
    dropIndex.current = null;
    setDraggingIndex(null);
  }

  // mobile drag functions
  function handleItemTouchStart(e: React.TouchEvent, index: number) {
    touchDragIndex.current = index;
    setDraggingIndex(index);
  }

  function handleItemTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const card = elements.find((el) => el.hasAttribute("data-index"));
    if (card) {
      dropIndex.current = Number(card.getAttribute("data-index"));
    }
  }

  function handleItemTouchEnd() {
    const from = touchDragIndex.current;
    const to = dropIndex.current;

    if (from !== null && to !== null && from !== to) {
      const reordered = [...images];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);
      syncImages(reordered.map((img, i) => ({ ...img, order: i })));
    }

    touchDragIndex.current = null;
    dropIndex.current = null;
    setDraggingIndex(null);
  }

  function handleItemTouchCancel() {
    touchDragIndex.current = null;
    dropIndex.current = null;
    setDraggingIndex(null);
  }

  return (
    <div className="space-y-6">
      <div className="border-border bg-sub-background space-y-6 rounded-xl border p-5 md:p-10">
        <div className="mx-auto max-w-5xl space-y-2">
          <h3 className="text-lg lg:text-xl xl:text-2xl">
            Upload Property Images
          </h3>
          <p className="text-sub-foreground text-body mb-8">
            Add property photos such as the living room, kitchen, bedrooms, and
            exterior.
          </p>

          {/* Drop Zone */}
          <div
            onDragOver={handleDropZoneDragOver}
            onDragLeave={handleDropZoneDragLeave}
            onDrop={handleDropZoneDrop}
            className={`border-border relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
              isDraggingOver ? "border-purple-60 bg-purple-60/5" : ""
            } ${imageError ? "border-red-400" : ""}`}
          >
            <UploadSimpleIcon
              aria-hidden
              size={28}
              className="text-sub-foreground"
            />
            <div className="text-body">
              <p className="text-foreground">Drag and drop images here</p>
              <p className="text-sub-foreground mt-1">
                or{" "}
                <label className="text-purple-60 cursor-pointer underline underline-offset-2">
                  browse files
                  <input
                    type="file"
                    multiple
                    accept="image/webp,image/avif"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </p>
            </div>
            <p className="text-sub-foreground">WEBP and AVIF supported</p>
          </div>

          {imageError && <p className="text-body text-red-400">{imageError}</p>}

          {/* Image Grid */}
          {images.length > 0 && (
            <div className="mt-10 grid gap-y-2">
              <p className="text-sub-foreground mb-3 text-xs md:text-sm">
                <span className="text-foreground font-semibold">Note:</span> The
                first image would be the main display. You can reorder them by
                dragging the image.
              </p>

              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {images.map((img, index) => {
                  const isMarked = markedForDeletion.has(index);
                  return (
                    <div
                      key={img.preview}
                      data-index={index}
                      draggable={!isMarked}
                      onDragStart={() => handleItemDragStart(index)}
                      onDragEnter={() => handleItemDragEnter(index)}
                      onDragOver={handleItemDragOver}
                      onDrop={handleItemDrop}
                      onDragEnd={handleItemDragEnd}
                      onTouchStart={(e) => handleItemTouchStart(e, index)}
                      onTouchMove={handleItemTouchMove}
                      onTouchEnd={handleItemTouchEnd}
                      onTouchCancel={handleItemTouchCancel}
                      className={`group bg-background relative flex aspect-video touch-none overflow-hidden rounded-lg transition-all duration-150 select-none ${
                        isMarked
                          ? "cursor-default opacity-60 ring-2 ring-red-500"
                          : draggingIndex === index
                            ? "scale-95 cursor-grabbing opacity-50"
                            : draggingIndex !== null
                              ? "cursor-grab border-dashed"
                              : "cursor-grab active:cursor-grabbing"
                      }`}
                    >
                      <Image
                        src={img.preview}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                        className="size-full object-cover"
                      />

                      {/* Red overlay when marked for deletion */}
                      {isMarked && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-red-500/20">
                          <span className="rounded bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
                            Marked for deletion
                          </span>
                        </div>
                      )}

                      {/* Main badge */}
                      {index === 0 && !isMarked && (
                        <span className="bg-purple-60 absolute top-1.5 left-1.5 z-20 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          <StarIcon
                            size={9}
                            weight="fill"
                            className="size-2.5"
                          />{" "}
                          Main{" "}
                          <span className="sr-only">
                            property image preview
                          </span>
                        </span>
                      )}

                      {/* Trash / Undo button */}
                      <AnimatedButton
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label={isMarked ? "Undo deletion" : "Remove image"}
                        className={`absolute top-1.5 right-1.5 z-20 rounded p-1 text-white transition-colors ${
                          isMarked
                            ? "bg-red-500 hover:bg-red-400"
                            : "bg-black/60 hover:bg-red-500/80"
                        }`}
                      >
                        {isMarked ? (
                          <CheckIcon aria-hidden className="size-4" />
                        ) : (
                          <TrashIcon aria-hidden className="size-5 lg:size-4" />
                        )}
                      </AnimatedButton>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-border mt-4 flex items-center justify-end gap-x-5 md:mt-6">
        <AnimatedButton
          type="button"
          onClick={onBackAction}
          className="border-border text-sub-foreground hover:text-foreground text-body flex items-center gap-x-2 rounded-lg border px-5 py-3"
        >
          <ArrowLeftIcon
            aria-hidden
            weight="bold"
            className="size-4 md:size-5"
          />
          Back
        </AnimatedButton>
        <AnimatedButton
          type="button"
          onClick={handleNext}
          className="bg-purple-60 text-white-99 text-body flex items-center gap-x-2 rounded-lg px-5 py-3"
        >
          Next
          <ArrowRightIcon
            aria-hidden
            weight="bold"
            className="size-4 md:size-5"
          />
        </AnimatedButton>
      </div>
    </div>
  );
}
