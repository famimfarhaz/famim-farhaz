"use client"

import { useState } from "react"
import { ChevronRight, Folder, File, FolderOpen } from "lucide-react"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  icon?: string
}

interface AnimatedFileTreeProps {
  data: FileNode[]
}

function TreeNode({ node, level = 0 }: { node: FileNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-background/80 transition-all duration-200 cursor-pointer group ${level > 0 ? "ml-4" : ""
          }`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren && (
          <ChevronRight
            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-90" : ""
              }`}
          />
        )}
        {!hasChildren && <div className="w-3.5" />}

        {node.type === "folder" ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-yellow-500" />
          ) : (
            <Folder className="w-4 h-4 text-yellow-500" />
          )
        ) : (
          <File className="w-4 h-4 text-blue-400" />
        )}

        <span
          className={`text-sm font-mono ${node.type === "folder"
              ? "text-foreground font-medium"
              : "text-muted-foreground"
            } group-hover:text-primary transition-colors duration-200`}
        >
          {node.name}
          {node.icon && (
            <span className="ml-2 text-xs text-muted-foreground/60">
              {node.icon}
            </span>
          )}
        </span>
      </div>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {node.children?.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function AnimatedFileTree({ data }: AnimatedFileTreeProps) {
  return (
    <div className="font-mono text-sm bg-card/30 rounded-lg p-4 border border-border/50">
      {data.map((node, index) => (
        <TreeNode key={`${node.name}-${index}`} node={node} level={0} />
      ))}
    </div>
  )
}
