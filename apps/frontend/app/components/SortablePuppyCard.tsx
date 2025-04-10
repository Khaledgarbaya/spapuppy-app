import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Puppy } from '@repo/types';
import PuppyCard from './PuppyCard';
import { ArrowUpDown, Dog } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import './SortablePuppyCard.css';

interface Props {
  puppy: Puppy;
  index: number;
}

export function SortablePuppyCard({ puppy, index }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: puppy.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative",
        isDragging && "opacity-90"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-puppy-purple text-white p-1 rounded cursor-grab active:cursor-grabbing"
      >
        <ArrowUpDown className="h-4 w-4" />
      </div>
      <PuppyCard puppy={puppy} />
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 backdrop-blur-[2px] rounded-lg flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <Dog className="w-12 h-12 text-puppy-purple" />
            <div className="text-lg font-semibold text-puppy-purple bg-white/80 px-4 py-1 rounded-full shadow-sm">
              {puppy.name}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
    </div>
  );
} 
