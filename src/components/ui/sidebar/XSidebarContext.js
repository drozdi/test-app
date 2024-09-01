
import { createContext, useContext } from "react";

export const XSidebarContext = createContext({
    isCollapsed: false
});

export function useXSidebarContext () {
  const context = useContext(XSidebarContext);

  if (!context) {
    throw new Error("useSidebarContext should be used within the SidebarContext provider!");
  }

  return context;
}