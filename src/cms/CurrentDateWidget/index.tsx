import React, { useState, useEffect, forwardRef } from "react";
import { CmsWidgetControlProps } from "netlify-cms-core";

const CurrentDateWidget = forwardRef<
  HTMLInputElement,
  CmsWidgetControlProps<Date>
>(({ onChange, forID, value }, ref) => {
  const [el, setEl] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (el) {
      el.parentElement?.setAttribute("style", "display: none");
    }
  }, [el]);

  useEffect(() => {
    if (!value) onChange(new Date());
  }, [value]);

  return (
    <span ref={setEl}>
      <input ref={ref} id={forID} value={value?.toLocaleString()} />
    </span>
  );
});

export default CurrentDateWidget;
