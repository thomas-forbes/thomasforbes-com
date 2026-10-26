"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export function PhotoPreview({
	photo,
	className,
}: {
	photo: Photo;
	className?: string;
}) {
	const [showDescription, setShowDescription] = useState(false);
	const descriptionId = useId();
	const hasDescription = photo.description.trim().length > 0;
	const alt = photo.alt ?? `Photo ${photo.file}`;

	return (
		<button
			type="button"
			className="group relative block w-full overflow-hidden rounded-lg text-left shadow-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 enabled:cursor-pointer"
			disabled={!hasDescription}
			aria-label={
				hasDescription
					? `${showDescription ? "Hide" : "Show"} description: ${alt}`
					: alt
			}
			aria-expanded={hasDescription ? showDescription : undefined}
			aria-controls={hasDescription ? descriptionId : undefined}
			onClick={() => setShowDescription((shown) => !shown)}
			onKeyDown={(event) => {
				if (event.key === "Escape") setShowDescription(false);
			}}
		>
			<Image
				className={cn(
					"aspect-square w-full object-cover transition-[filter] duration-200 motion-reduce:transition-none",
					className,
					showDescription && "blur-md",
				)}
				src={`/photos/${photo.file}`}
				alt={alt}
				width={800}
				height={800}
			/>
			{hasDescription && (
				<>
					<span
						id={descriptionId}
						aria-hidden={!showDescription}
						className={cn(
							"absolute inset-0 overflow-y-auto bg-black/60 p-3 text-center text-sm text-white transition-opacity duration-200 motion-reduce:transition-none sm:p-6",
							showDescription ? "opacity-100" : "pointer-events-none opacity-0",
						)}
					>
						<span className="flex min-h-full items-center justify-center whitespace-pre-line break-words">
							{photo.description}
						</span>
					</span>
					{!showDescription && (
						<span
							className="absolute right-2.5 bottom-2.5 size-1.5 rounded-full bg-white/80 shadow-black/40 shadow-sm transition-colors duration-200 group-hover:bg-white group-focus-visible:bg-white motion-reduce:transition-none"
							aria-hidden="true"
						/>
					)}
				</>
			)}
		</button>
	);
}
