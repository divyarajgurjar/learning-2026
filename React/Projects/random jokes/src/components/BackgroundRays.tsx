/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export function BackgroundRays() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[var(--color-bg)]">
      {/* Ray 1 (Left) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute -top-[50vh] left-[15%] w-[120px] h-[200vh] rotate-[15deg] blur-[100px]"
        style={{ backgroundColor: "var(--color-ray-1)" }}
      />
      {/* Ray 2 (Center-Right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
        className="absolute -top-[40vh] right-[25%] w-[180px] h-[180vh] rotate-[15deg] blur-[120px]"
        style={{ backgroundColor: "var(--color-ray-2)" }}
      />
      {/* Ray 3 (Far Right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
        className="absolute -top-[30vh] right-0 w-[100px] h-[160vh] rotate-[15deg] blur-[80px]"
        style={{ backgroundColor: "var(--color-ray-1)" }}
      />
      {/* Ray 4 (Lower Left) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 6, delay: 1.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[250px] h-[100vh] rotate-[-20deg] blur-[150px]"
        style={{ backgroundColor: "var(--color-ray-2)" }}
      />
    </div>
  );
}
