import React, { useEffect, useState } from "react";
export default function OpenCart() {
  return (
    <button onClick={() => window.dispatchEvent(new Event("open-cart"))}>
      🛒
    </button>
  );
}