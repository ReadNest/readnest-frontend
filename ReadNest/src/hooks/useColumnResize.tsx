import { useEffect, useRef } from "react";

export const useColumnResize = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = tableRef.current;
    const cols = table.querySelectorAll("th");
    let isDragging = false;
    let startX: number;
    let startWidth: number;
    let column: HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const width = startWidth + (e.pageX - startX);
      column.style.width = `${width}px`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = function (this: HTMLDivElement, e: MouseEvent) {
      isDragging = true;
      column = this.parentElement as HTMLElement;
      startX = e.pageX;
      startWidth = column.offsetWidth;
      document.body.style.cursor = "col-resize";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    cols.forEach((col) => {
      const resizer = document.createElement("div");
      resizer.style.width = "5px";
      resizer.style.height = "100%";
      resizer.style.position = "absolute";
      resizer.style.right = "0";
      resizer.style.top = "0";
      resizer.style.cursor = "col-resize";
      resizer.style.userSelect = "none";
      resizer.addEventListener("mousedown", handleMouseDown);

      col.style.position = "relative";
      col.appendChild(resizer);
    });

    return () => {
      cols.forEach((col) => {
        const resizer = col.querySelector("div");
        if (resizer) {
          resizer.removeEventListener("mousedown", handleMouseDown);
        }
      });
    };
  }, []);

  return tableRef;
};
