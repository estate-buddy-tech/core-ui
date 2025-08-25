// Types;
export * from "./types/user";
import "../src/styles/layout.css";

// Client
export { createIdentiesClient, type IdentiesClientConfig } from "./api/client";

// Hooks
export {
  useIdenties,
  type UseIdentiesConfig,
  type UseIdentiesReturn,
} from "./hooks/useIdenties";

// Provider
export {
  IdentiesProvider,
  useIdentiesContext,
  type IdentiesProviderProps,
} from "./provider/IdentiesProvider";

// Component UI
export { ProfileMenu } from "./components/misc/ProfileMenu/ProfileMenu";
