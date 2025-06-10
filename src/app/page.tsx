"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type RoofOptions = {
  color: string;
  style: string;
  material: string;
  windowCount: number;
  height: number;
  length: number;
};

const roofImages: Record<string, string> = {
  // Red tile variations
  "red-gable-tile-4": "/red.png",
  "red-hip-tile-4": "/hip red.png",

  // Blue tile variations
  "blue-gable-tile-1-1-1": "/gable1.png",
  "blue-gable-tile-1-1-2": "/long2.png",
  "blue-gable-tile-1-1-3": "/gable1_length3.png",
  "blue-gable-tile-1-2-1": "/height 2.png",
  "blue-gable-tile-1-2-2": "/gable1_height2_length2.png",
  "blue-gable-tile-1-2-3": "/gable1_height2_length3.png",
  "blue-gable-tile-1-3-1": "/gable1_height3.png",
  "blue-gable-tile-1-3-2": "/gable1_height3_length2.png",
  "blue-gable-tile-1-3-3": "/gable1_height3_length3.png",
  "blue-gable-tile-2": "/blue.png",
  "blue-gable-tile-3": "/gable3.png",
  "blue-hip-tile-1": "/2tile.png",
  "blue-hip-tile-2": "/tile2.png",
  "blue-hip-tile-3": "/8tile.png",

  // Gray tile variations
  "gray-gable-tile-4": "/gray.png",
  "gray-hip-tile-4": "/hip gray.png",
};

export default function RoofCustomizer() {
  const [options, setOptions] = useState<RoofOptions>({
    color: "blue",
    style: "gable",
    material: "tile",
    windowCount: 1,
    height: 1,
    length: 1,
  });

  const getCurrentImageKey = (): string => {
    if (
      options.color === "blue" &&
      options.style === "gable" &&
      options.material === "tile" &&
      options.windowCount === 1
    ) {
      return `blue-gable-tile-1-${options.height}-${options.length}`;
    }
    return `${options.color}-${options.style}-${options.material}-${options.windowCount}`;
  };

  const currentImage =
    roofImages[getCurrentImageKey()] || roofImages["red-gable-tile-medium-2"];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Roof Customizer</h1>
          <p className="mt-2 text-lg text-gray-600">
            Customize your roof design and see the changes in real-time
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Preview */}
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Roof Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt="Roof preview"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-all duration-300"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Current Configuration:</strong>
                  </p>
                  <p>
                    Color:{" "}
                    {options.color.charAt(0).toUpperCase() +
                      options.color.slice(1)}
                  </p>
                  <p>
                    Style:{" "}
                    {options.style.charAt(0).toUpperCase() +
                      options.style.slice(1)}
                  </p>
                  <p>
                    Material:{" "}
                    {options.material.charAt(0).toUpperCase() +
                      options.material.slice(1)}
                  </p>

                  <p>Windows: {options.windowCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Roof Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Roof Color */}
                <div className="space-y-2">
                  <Label htmlFor="color">Roof Color</Label>
                  <Select
                    value={options.color}
                    onValueChange={(value) =>
                      setOptions((prev) => ({ ...prev, color: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Roof Style */}
                <div className="space-y-2">
                  <Label htmlFor="style">Roof Style</Label>
                  <Select
                    value={options.style}
                    onValueChange={(value) =>
                      setOptions((prev) => ({ ...prev, style: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gable">Gable</SelectItem>
                      <SelectItem value="hip">Hip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Roof Material */}
                <div className="space-y-2">
                  <Label htmlFor="material">Roof Material</Label>
                  <Select
                    value={options.material}
                    onValueChange={(value) =>
                      setOptions((prev) => ({ ...prev, material: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tile">Tile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Window Count */}
                <div className="space-y-2">
                  <Label htmlFor="windows">Window: {options.windowCount}</Label>
                  <Slider
                    id="windowCount"
                    value={[options.windowCount]}
                    onValueChange={(value) =>
                      setOptions((prev) => ({ ...prev, windowCount: value[0] }))
                    }
                    max={3}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                  </div>
                </div>

                {/* Height */}
                {options.color === "blue" &&
                  options.style === "gable" &&
                  options.material === "tile" &&
                  options.windowCount === 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="height">Height: {options.height}</Label>
                      <Slider
                        id="height"
                        value={[options.height]}
                        onValueChange={(value) =>
                          setOptions((prev) => ({ ...prev, height: value[0] }))
                        }
                        max={3}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                      </div>
                    </div>
                  )}

                {/* Length */}
                {options.color === "blue" &&
                  options.style === "gable" &&
                  options.material === "tile" &&
                  options.windowCount === 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="length">Length: {options.length}</Label>
                      <Slider
                        id="length"
                        value={[options.length]}
                        onValueChange={(value) =>
                          setOptions((prev) => ({ ...prev, length: value[0] }))
                        }
                        max={3}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Roof Color:</span>
                    <span className="capitalize">{options.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Roof Style:</span>
                    <span className="capitalize">{options.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Material:</span>
                    <span className="capitalize">{options.material}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Windows:</span>
                    <span>{options.windowCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p className="mb-1">Prepared by: Ace Reeve Santos</p>
        <p>Demo</p>
      </div>
    </div>
  );
}
