'use client';

import { Button } from "@/components/atoms/button";

export function ReloadButton() {
  return (
    <Button
      variant="outline"
      onClick={() => window.location.reload()}
    >
      重新加载
    </Button>
  );
} 