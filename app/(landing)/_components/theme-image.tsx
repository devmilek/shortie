"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps, StaticImageData } from "next/image";
import React from "react";

interface ThemeImageProps {
  image: StaticImageData;
  darkImage: StaticImageData;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ThemeImage = ({
  image,
  darkImage,
  className,
  alt,
  width,
  height,
}: ThemeImageProps) => {
  const { theme } = useTheme();
  let imageUrl = theme === "dark" ? image : darkImage;

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      className={className}
      src={imageUrl}
    />
  );
};

export default ThemeImage;
