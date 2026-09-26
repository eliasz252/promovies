"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MediaPreviewModal from "@/components/media/MediaPreviewModal";
import { MediaItem, MediaType } from "@/types/tmdb";
import { getMediaDetails } from "@/lib/tmdb/client";

export default function InterceptedTitleModal({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const router = useRouter();
  const { type, id } = use(params);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMediaDetails(type as MediaType, id).then((data) => {
      if (isMounted && data) {
        setMedia(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [type, id]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <MediaPreviewModal
      media={media}
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
}
